import fs from 'fs';
import path from 'path';
import * as OpenCC from 'opencc-js';

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });
const exts = new Set(['.ts', '.tsx', '.json', '.css', '.html', '.md']);
const roots = ['src', 'docs', 'index.html'];

function walk(target, files) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const name of fs.readdirSync(target)) {
      walk(path.join(target, name), files);
    }
    return;
  }
  if (exts.has(path.extname(target))) {
    files.push(target);
  }
}

function applySearchAliases(filePath, content) {
  const base = path.basename(filePath);

  if (base.includes('in-game_entries')) {
    return content
      .replaceAll('"entry_name":"提升血量上限"', '"entry_name":"提升HP上限"')
      .replaceAll('"entry_name":"提升專注值上限"', '"entry_name":"提升FP上限"')
      .replaceAll('"entry_name":"減少專注值消耗"', '"entry_name":"減少FP消耗"');
  }

  if (base === 'deep_night_entries.json' || base === 'in-game_deep_night_entries.json') {
    return content
      .replaceAll('每次打倒大教堂的強敵，能提升血量上限', '每次打倒大教堂的強敵，能提升HP上限')
      .replaceAll(
        '【復仇者】發動能力時，能提升專注值上限',
        '【復仇者】發動能力時，能提升FP上限'
      )
      .replaceAll(
        '每次發動能力【死靈術】，提升專注值上限，局內無限成長; 最多可成長60次，最多 +51% 專注值上限;',
        '每次發動能力【死靈術】，提升FP上限，局內無限成長; 最多可成長60次，最多 +51% FP上限;'
      )
      .replaceAll('"entry_name": "提升血量上限"', '"entry_name": "提升HP上限"')
      .replaceAll('"entry_name": "提升專注值上限"', '"entry_name": "提升FP上限"')
      .replaceAll('"entry_name": "減少專注值消耗"', '"entry_name": "減少FP值消耗"')
      .replaceAll('"explanation": "專注值上限+15%"', '"explanation": "FP上限+15%"')
      .replaceAll('"explanation": "專注值消耗-8%"', '"explanation": "FP消耗-8%"');
  }

  return content;
}

const files = [];
for (const root of roots) {
  if (fs.existsSync(root)) walk(root, files);
}

let changed = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let converted = converter(content);
  if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.html')) {
    converted = converted.replaceAll('zh-CN', 'zh-TW');
  }
  converted = applySearchAliases(file, converted);
  if (converted !== content) {
    fs.writeFileSync(file, converted, 'utf8');
    changed += 1;
  }
}

function renameZhCn(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) renameZhCn(full);
  }
  const refreshed = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of refreshed) {
    if (!entry.name.includes('zh-CN')) continue;
    const from = path.join(dir, entry.name);
    const to = path.join(dir, entry.name.replaceAll('zh-CN', 'zh-TW'));
    fs.renameSync(from, to);
    console.log(`renamed ${from} -> ${to}`);
  }
}

renameZhCn('src');
console.log(`converted ${changed} files`);
