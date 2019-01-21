FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install application dependencies 
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle source
COPY ./src ./src/
COPY ./tests ./tests
COPY ./index.js ./index.js 

EXPOSE 8080
CMD ["node"]
