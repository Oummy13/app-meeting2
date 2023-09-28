# Utilisez l'image de Node.js
FROM node:18

# Créez un répertoire de travail dans l'image
WORKDIR /app

# Copiez le package.json et le package-lock.json dans l'image
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste de votre application dans l'image
COPY . .

#exposer au port 3003
EXPOSE 3003

# Démarrez votre application Node.js
CMD ["node", "app.js"]


