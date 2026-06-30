FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install --only=production

# Copy server code
COPY server.js ./

# Create public and data directories
RUN mkdir -p public data

# Copy static frontend assets
COPY assets ./public/assets
COPY blog ./public/blog
COPY lang ./public/lang
COPY legal ./public/legal
COPY index.html ./public/index.html
COPY 404.html ./public/404.html
COPY manifest.json ./public/manifest.json
COPY robots.txt ./public/robots.txt
COPY sitemap.xml ./public/sitemap.xml
COPY sw.js ./public/sw.js

# Expose port
EXPOSE 8081

# Mountable volume for database persistence
VOLUME ["/app/data"]

# Run server
CMD ["node", "server.js"]
