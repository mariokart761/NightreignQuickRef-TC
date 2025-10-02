import fs from 'fs';
import path from 'path';
import * as OpenCC from 'opencc-js';

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

// 需要轉換的檔案列表（剩餘的核心檔案）
const filesToConvert = [
  'src/App.tsx',
  'src/config/navigationConfig.ts',
  'src/utils/dataManager.ts',
  'src/types/index.ts'
];

console.log('開始轉換項目中剩餘的核心檔案...');
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

console.log('所有剩餘檔案轉換完成！');
console.log('\n轉換摘要:');
console.log(`- 總共轉換了 ${filesToConvert.length} 個檔案`);
console.log('- 檔案位置: src/App.tsx, src/config/navigationConfig.ts, src/utils/dataManager.ts, src/types/index.ts');
