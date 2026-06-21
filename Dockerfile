FROM node:20

WORKDIR /app

COPY backend/package*.json ./

RUN npm install --break-system-packages

COPY backend/ ./

EXPOSE 3000

CMD ["node", "function.js"]