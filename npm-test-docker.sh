#!/bin/sh

docker                                                \
  build                                               \
  --build-arg NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN}        \
  --build-arg NPM_AUTH_USERNAME=${NPM_AUTH_USERNAME}  \
  --tag rtp-formatted-id                              \
  .                                                   \
&&                                                    \
docker                                                \
  run                                                 \
  --rm                                                \
  --tty                                               \
  rtp-formatted-id
