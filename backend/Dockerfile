FROM node:14.16-alpine3.12
ENV NODE_ENV=development
COPY ./server1 /server1
WORKDIR /server1
RUN npm install
EXPOSE 3001
ENV CI true
CMD ["node","index.js"]
