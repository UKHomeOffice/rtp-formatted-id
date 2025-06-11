FROM node:22-alpine

ARG NPM_AUTH_TOKEN
ARG NPM_AUTH_USERNAME

ENV NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN}
ENV NPM_AUTH_USERNAME=${NPM_AUTH_USERNAME}

WORKDIR /workdir

COPY src/.npmrc ./
COPY src/package.json ./
COPY src/package-lock.json ./

RUN npm ci --no-optional --loglevel error

COPY ./src .

CMD ["npm", "test"]
