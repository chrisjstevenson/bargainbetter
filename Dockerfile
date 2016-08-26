FROM node:argon

#temporary workaround for prod deploys
ENV NODE_ENV=production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 9002

CMD [ "npm", "start" ]