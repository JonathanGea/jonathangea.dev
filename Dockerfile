# ---------- Stage 1: Angular build ----------
FROM node:22.12.0 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration=production

# ---------- Stage 2: Node runtime server ----------
FROM node:22.12.0-alpine
WORKDIR /app

# Minimal server deps
RUN echo '{"name":"angular-server","version":"1.0.0","dependencies":{"express":"^4.18.2","compression":"^1.7.4"}}' > package.json

# No lockfile here → use npm install (not ci)
RUN npm install --omit=dev

# Angular 17+ output path
COPY --from=build /app/dist/fe-public/browser /app/public

COPY server.js /app/server.js
EXPOSE 8080
CMD ["node", "server.js"]
