FROM node:20.9

WORKDIR /usr/src/app

COPY v2/portfolio-site/package*.json ./
COPY v2/portfolio-site/ .

RUN npm install  --production

RUN npm run build
CMD ["npm", "start"]



