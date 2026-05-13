# Node.js Auth backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 5000

# Production environment
ENV NODE_ENV=production

CMD ["node", "server.js"]
