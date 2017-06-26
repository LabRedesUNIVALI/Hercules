# Base image (Node v6.9 LTS Alpine Linux)
FROM node:6.9-alpine

# Arguments declaration
ARG PORT=3000

# Install GIT
RUN apk update && \
    apk upgrade && \
    apk add git

# Create and enter the application directory
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

# Expose the port where app will run
EXPOSE $PORT

# Start app with NPM
CMD ["npm", "start"]
