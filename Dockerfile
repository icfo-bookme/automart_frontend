# Use Node.js 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy environment variables
COPY .env.local .env.local

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all project files
COPY . .

# Expose port
EXPOSE 3000

# Start Next.js in development mode (with live reload)
CMD ["npm", "run", "dev"]
