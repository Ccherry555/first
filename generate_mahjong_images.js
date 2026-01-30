const fs = require('fs');
const https = require('https');
const path = require('path');

// 生成麻将牌图片的函数
function generateMahjongImage(num, chineseNum) {
  const prompt = `realistic mahjong tile with ${chineseNum} wan character, white background, black border, professional design, clean and clear`;
  const encodedPrompt = encodeURIComponent(prompt);
  const imageSize = 'square_hd';
  const url = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=${imageSize}`;
  
  console.log(`Generating image for ${chineseNum}万...`);
  
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      const imagePath = path.join(__dirname, 'images', `${num}wan.png`);
      const file = fs.createWriteStream(imagePath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Image saved to ${imagePath}`);
      });
    } else {
      console.error(`Failed to generate image for ${chineseNum}万: ${response.statusCode}`);
    }
  }).on('error', (error) => {
    console.error(`Error generating image for ${chineseNum}万: ${error.message}`);
  });
}

// 生成1-9万的麻将牌图片
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const chineseNums = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

for (let i = 0; i < nums.length; i++) {
  generateMahjongImage(nums[i], chineseNums[i]);
}
