# Usa una imagen base de Node.js
FROM node:18.12

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia todos los archivos de la aplicación al contenedor
COPY . .

# Expón el puerto en el que se ejecutará la aplicación (ajusta según sea necesario)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
