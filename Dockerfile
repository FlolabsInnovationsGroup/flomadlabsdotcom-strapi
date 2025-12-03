# syntax = docker/dockerfile:1

FROM node:20.19.5-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with platform-specific packages
RUN npm install && \
    npm install --os=linux --cpu=x64 sharp && \
    npm install --force @swc/core-linux-x64-gnu @swc/core-linux-x64-musl && \
    npm install --force @rollup/rollup-linux-x64-gnu @rollup/rollup-linux-x64-musl

# Copy source code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Force clean build - remove any cached dist
RUN rm -rf dist && \
    npx tsc && \
    echo "=== TypeScript compilation complete ==="

# Build the admin panel
RUN npm run build

# Create uploads directory and set permissions
RUN mkdir -p /app/public/uploads && chmod 755 /app/public/uploads

# Expose port
EXPOSE 1337

# Start command
CMD ["npm", "run", "start"]
