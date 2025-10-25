# ---------- Stage 1: Angular build ----------
# Use a version that satisfies Angular CLI (20.19+ or 22.12+)
FROM node:22.12.0 AS build

WORKDIR /app

# Ensure deterministic, fast installs
COPY package*.json ./
RUN npm ci

# Copy the rest and build with your project script
COPY . .
# (Your script already passes --configuration production)
RUN node -v && npm -v && npx -y @angular/cli@latest ng version || true
RUN npm run build -- --configuration=production

# ---------- Stage 2: Lightweight Node server ----------
FROM node:22.12.0-alpine

WORKDIR /app

# Minimal server deps
RUN echo '{"name":"angular-server","version":"1.0.0","dependencies":{"express":"^4.18.2","compression":"^1.7.4"}}' > package.json
RUN npm ci --omit=dev

# Angular 17+ default output path
COPY --from=build /app/dist/fe-public/browser /app/public

# Your server
COPY server.js /app/server.js

EXPOSE 8080
CMD ["node", "server.js"]
