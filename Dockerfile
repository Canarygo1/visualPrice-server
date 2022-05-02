FROM node:12

COPY . /src

WORKDIR /src


RUN npm install

RUN npm install -g typescript

EXPOSE 3300

RUN npm run build

CMD npm start
