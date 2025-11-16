# syntax = docker/dockerfile:1

FROM node:20.19.5-slim

WORKDIR /app

# Install platform-specific sharp for Railway Linux
RUN npm install --os=linux --cpu=x64 sharp

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Force clean build - remove any cached dist
RUN rm -rf dist && \
    npx tsc && \
    echo "=== TypeScript compilation complete ===" && \
    ls -la dist/src/api/focus-area/routes/ && \
    echo "=== Route file content ===" && \
    cat dist/src/api/focus-area/routes/focus-area.js && \
    echo "==="

# Expose port
EXPOSE 1337

# Start command
CMD ["node", "start.js"]
