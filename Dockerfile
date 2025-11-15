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

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Set environment
ENV NODE_ENV=development

# Expose port
EXPOSE 1337

# Build and start - this way native bindings load correctly at runtime
CMD ["sh", "-c", "npm run build && npm start"]
