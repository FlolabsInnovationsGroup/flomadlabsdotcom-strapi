FROM node:20-bookworm-slim

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with platform-specific sharp
RUN npm ci && \
    npm install --os=linux --cpu=x64 sharp

# Copy application code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Manually compile TypeScript and verify
RUN npx tsc && \
    mkdir -p dist && \
    cp -r src dist/ && \
    echo "=== Build verification ===" && \
    ls -la dist/ && \
    echo "=== Checking dist/config ===" && \
    ls -la dist/config/ || echo "No config directory" && \
    echo "=== Build complete ==="

# Expose port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]
