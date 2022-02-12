FROM node:14.16-alpine3.12
COPY ./client1 /client1
WORKDIR /client1
RUN npm install
EXPOSE 3000
ENV CI true
CMD npm start
