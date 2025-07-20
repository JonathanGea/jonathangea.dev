# Stage 1: Build aplikasi Angular
FROM node:20.19.0 AS build

WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode sumber
COPY . .

# Build aplikasi Angular untuk production
RUN npm run build -- --configuration production

# Stage 2: Serve aplikasi dengan Node.js
FROM node:20.19.0-alpine

WORKDIR /app

# Buat package.json untuk server
RUN echo '{"name":"angular-server","version":"1.0.0","dependencies":{"express":"^4.18.2","compression":"^1.7.4"}}' > package.json

# Install dependencies untuk server
RUN npm install

# Copy build output dari stage sebelumnya dengan path yang benar untuk Angular 17+
COPY --from=build /app/dist/fe-public/browser /app/public

# Copy server.js
COPY server.js /app/server.js

# Expose port yang akan digunakan
EXPOSE 8080

# Command untuk menjalankan server
CMD ["node", "server.js"]