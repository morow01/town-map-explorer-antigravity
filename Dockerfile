# Robust Production Dockerfile
FROM --platform=linux/amd64 node:18-bullseye

# Install build tools
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Final server file setup
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev --no-audit --no-fund

# Copy source
COPY server/ ./server/
COPY dist/ ./dist/

# Persistence
VOLUME ["/app/server/data"]

EXPOSE 3001

CMD ["node", "server/index.js"]
