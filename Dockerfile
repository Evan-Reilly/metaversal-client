FROM node:14.4.0

WORKDIR /frontend

COPY ./package.json /frontend/package.json

RUN yarn

COPY . /frontend/

EXPOSE 8080

CMD ["npm", "start"]