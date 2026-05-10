FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node src ./src

EXPOSE 3000

USER node

CMD ["npm", "start"]
