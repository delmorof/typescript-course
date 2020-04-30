FROM node:12.16.1-alpine

## SSH et al
RUN apk --no-cache add git zsh

ENV PATH="${PATH}:/home/node/frontend/node_modules/.bin"

USER node
WORKDIR /home/node/app

## ZSH / OhMyZsh
COPY --chown=node:node zsh/install-zsh.sh /home/node/install-zsh.sh
RUN chmod +x /home/node/install-zsh.sh \
    && /home/node/install-zsh.sh
COPY --chown=node:node zsh/zsh-config.sh /home/node/.zshrc

USER root
RUN npm install -g typescript typings-checker ts-node
USER node