FROM node:20

WORKDIR /usr/src/app

# Copy only package files first
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY --chown=node:node . .

USER node

CMD ["npm", "run", "dev"]