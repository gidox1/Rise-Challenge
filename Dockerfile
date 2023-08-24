# Use an official Node.js runtime as the base image
FROM node:14

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install --production
RUN npm install -g nodemon ts-node

# Copy only necessary files
COPY dist ./dist

# Drop privileges for running the container
USER node

EXPOSE 8000

ENV NODE_ENV=production

CMD ["nodemon", "--exec", "npx", "ts-node", "appServer.ts"]