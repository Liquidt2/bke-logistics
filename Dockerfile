# ============================================================
# BKE Logistics — Multi-Stage Docker Build
# Stage 1: Build the Astro site
# Stage 2: Serve with nginx:alpine
# ============================================================

# ------------------------------------
# Stage 1: Build
# ------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the Astro site
RUN npm run build

# ------------------------------------
# Stage 2: Serve with nginx
# ------------------------------------
FROM nginx:alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
