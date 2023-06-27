# build stage
FROM node:16-alpine AS build
ARG env
ENV envportal $env

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json


# RUN npm run preinstall
RUN npm install --silent
#RUN npm install react-scripts --save
RUN npm install assert browserify-zlib buffer process stream-browserify util
#RUN npm install node-sass@7.0.1
#RUN chmod a+x node_modules/.bin/react-scripts

COPY . /app
COPY custom/webpack.config.js /app/node_modules/react-scripts/config/webpack.config.js
RUN npm run build$envportal

# final stage
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
