# --- Étape 1: Construire l'application ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Étape 2: Servir l'application avec NGINX ---
FROM nginx:alpine AS final
# Supprimer le contenu par défaut de NGINX
RUN rm -rf /usr/share/nginx/html/*
# Copier les fichiers de construction (ce chemin est standard pour le RealWorld)
COPY --from=build /app/dist/angular-realworld-example-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
