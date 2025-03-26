# Étape 1: Build de l'application
FROM node:16-alpine as build
WORKDIR /app

# Optimisation des couches de cache
COPY package.json ./
RUN npm i --force

# Copie du reste des fichiers
COPY . .
RUN npm run build

# Étape 2: Servir l'application avec NGINX
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html

# Configuration pour les Single Page Applications
RUN echo 'server { listen 80; server_name localhost; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

# Sécurité : Exécution en tant qu'utilisateur non-root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
