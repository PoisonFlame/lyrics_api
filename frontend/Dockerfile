FROM node:12

RUN apt-get update || : && apt-get install python3 -y

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY app /app

RUN npm install
RUN npm install -g @vue/cli
# If you are building your code for production
# RUN npm cio --only=production

# Bundle app source
#COPY . .

EXPOSE 8080
#CMD [ "node", "server.js" ]
CMD ["npm", "run", "serve"]
