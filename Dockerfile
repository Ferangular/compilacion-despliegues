# Multi-stage build for Angular application
# Stage 1: Build the Angular application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular app
COPY --from=builder /app/dist/compilacion-despliegues/browser /usr/share/nginx/html

# Create a simple API endpoint for mock data
RUN echo 'location /api { add_header Content-Type application/json; return 200 "{\"users\":[{\"id\":1,\"name\":\"Ana\",\"email\":\"ana@ejemplo.com\"},{\"id\":2,\"name\":\"Carlos\",\"email\":\"carlos@ejemplo.com\"}]}"; }' >> /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
