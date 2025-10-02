import fs from 'fs';
import path from 'path';
import * as OpenCC from 'opencc-js';

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

// 需要補充轉換的檔案列表
const filesToConvert = [
  'src/utils/themeUtils.ts'
];

console.log('開始補充轉換剩餘檔案...');
console.log('需要轉換的檔案：', filesToConvert);

filesToConvert.forEach(fileName => {
  const filePath = path.join(fileName);
  console.log(`處理檔案: ${filePath}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const convertedContent = converter(content);
    fs.writeFileSync(filePath, convertedContent, 'utf8');
    console.log(`✓ 已轉換: ${fileName}`);
  } catch (error) {
    console.error(`✗ 轉換失敗 ${fileName}:`, error.message);
  }
});

console.log('補充轉換完成！');

// 最終驗證
console.log('\n最終驗證 - 檢查是否還有簡體中文文字...');
const checkFiles = [
  'src/App.tsx',
  'src/config/navigationConfig.ts',
  'src/utils/dataManager.ts',
  'src/types/index.ts',
  'src/utils/themeUtils.ts'
];

let hasSimplified = false;
// 只檢查真正的簡體字（這些字在繁體中不同）
const trulySimplifiedChars = ['数据', '计算', '属性', '追踪者', '守护者', '游戏', '机制', '详情', '词条', '详细'];

checkFiles.forEach(fileName => {
  try {
    const content = fs.readFileSync(fileName, 'utf8');
    trulySimplifiedChars.forEach(char => {
      if (content.includes(char)) {
        console.log(`⚠️  ${fileName} 仍包含簡體字: "${char}"`);
        hasSimplified = true;
      }
    });
  } catch (error) {
    console.error(`檢查失敗 ${fileName}:`, error.message);
  }
});

if (!hasSimplified) {
  console.log('✅ 所有檔案已成功轉換為繁體中文！');
} else {
  console.log('❌ 還有檔案包含簡體中文文字');
}
