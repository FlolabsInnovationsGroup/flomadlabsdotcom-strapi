FROM node:20-alpine

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ bash

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Build the application
ENV NODE_ENV=development
RUN npm run build

# Expose port
EXPOSE 1337

# Start command
CMD ["npm", "start"]
