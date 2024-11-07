FROM node:20.12.0-slim

# Install OpenSSL and other dependencies
RUN apt-get update && \
    apt-get install -y openssl libssl3 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY ./prisma/ ./prisma
RUN npx prisma generate

# Copy application code
COPY ./routes ./routes/
COPY ./app.js ./

# Set user permissions
USER node

# Expose the server port
EXPOSE 3001

# Start the server
CMD ["node", "app.js"]
