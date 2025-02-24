import express from 'express';
import cors from 'cors';
import { run } from '@mermaid-js/mermaid-cli';
import { temporaryWrite, temporaryFile } from 'tempy';
import fs from 'fs/promises';

const app = express();
const port = 3000;

// 配置中间件
app.use(cors());
app.use(express.text({ limit: '5mb' }));

// 渲染路由
app.post('/render', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: '请求体不能为空' });
  }

  let inputPath, outputPath;
  try {
    // 创建临时文件
    inputPath = await temporaryWrite(req.body, { extension: 'mmd' });
    outputPath = temporaryFile({ extension: 'svg' });

    // 执行mermaid转换
    await run(inputPath, outputPath, {
      outputFormat: 'svg',
      puppeteerConfig: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      },
    });

    // 读取并返回结果
    const svgContent = await fs.readFile(outputPath, 'utf-8');
    res.type('svg').send(svgContent);
  } catch (error) {
    console.error('渲染错误:', error);
    res.status(500).json({ error: error.message });
  } finally {
    // 清理临时文件
    await Promise.allSettled([
      fs.unlink(inputPath).catch(() => {}),
      fs.unlink(outputPath).catch(() => {})
    ]);
  }
});

// 启动服务
app.listen(port, () => {
  console.log(`服务运行在 http://localhost:${port}`);
});
