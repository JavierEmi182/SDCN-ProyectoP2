FROM node as build

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install 

COPY . /app

RUN npm run build --prod

#Second phase

FROM nginx

COPY --from=build /app/dist/puppers-client /usr/share/nginx/html

