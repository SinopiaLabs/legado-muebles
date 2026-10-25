# El sitio es estático: se compila con Node y se sirve con nginx.
# La etapa de compilación corre en la arquitectura del runner (sin emulación);
# solo la imagen final de nginx es multi-arquitectura.
FROM --platform=$BUILDPLATFORM node:24-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.29-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://127.0.0.1/ || exit 1
