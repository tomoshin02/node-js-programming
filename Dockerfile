FROM node:12
WORKDIR /node-js-programming
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "node", "main" ]
