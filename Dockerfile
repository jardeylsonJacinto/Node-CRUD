FROM node:18

# create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

#Bundle app source
COPY . .

EXPOSE 3333

CMD [ "node", "index.js" ]

