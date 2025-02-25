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

## 5. dify 集成

mermaid-http 接入 dify 网络

```
sudo docker run -d --name mermaid-http --restart always --network docker_ssrf_proxy_network mermaid-http:1.0.0
```

进入 dify 容器内（可选）

```
sudo docker exec -it docker-worker-1 bash
```

测试 mermaid-http 是否可用（可选）

```
curl -i http://mermaid-http:3000
```
