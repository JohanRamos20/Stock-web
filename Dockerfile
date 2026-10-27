# syntax=docker/dockerfile:1

# ---------- Estágio 1: build do Vite ----------
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# O Vite embute VITE_* no bundle durante o build (não existe em runtime).
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---------- Estágio 2: nginx servindo os arquivos estáticos ----------
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
