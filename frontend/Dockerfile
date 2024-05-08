FROM node:20.11.0
WORKDIR /usr/src
COPY ./frontend ./
RUN npm install -g
RUN npm i -g @ionic/cli@6.20.9
EXPOSE 8100
CMD [ "ionic", "serve", "--address", "0.0.0.0" ]
