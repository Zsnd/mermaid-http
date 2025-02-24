# Mermaid HTTP 服务

## 1. 项目概述

基于 Node.js 的 HTTP 服务，提供 Mermaid 图表渲染功能

## 2. 快速启动

```bash
npm install
npm start
```

## 3. API

POST /render

请求

```
curl --location 'http://localhost:3000/render' \
--header 'Content-Type: text/plain' \
--data 'graph TD
    A-->B
'
```

响应：SVG 图像

## 4. Docker 部署

```
docker build -t mermaid-http .
docker run -p 3000:3000 mermaid-http
```
