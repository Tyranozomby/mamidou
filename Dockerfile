FROM node:17-alpine

WORKDIR /app
ENV API_PORT=3000
ENV NODE_ENV="production"
ENV STATIC_PATH="public"

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production

RUN mkdir ./data

COPY dist ./$STATIC_PATH
COPY api ./api

EXPOSE $API_PORT

ENTRYPOINT ["yarn", "run-back"]