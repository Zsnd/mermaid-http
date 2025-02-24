# 构建阶段
FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com \
  && npm ci --omit=dev
COPY . .

# 运行时阶段  
FROM node:20-bullseye-slim
WORKDIR /app
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  chromium \
  fonts-ipafont-gothic \
  fonts-wqy-zenhei \
  libx11-6 \
  libxcomposite1 \
  libgbm1 \
  libasound2 \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js .
EXPOSE 3000
CMD ["npm", "start"]
