# Dockerfile para projeto NestJS com pnpm
FROM node:24.3.0-slim AS builder

WORKDIR /usr/src/app

# Instala pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia apenas arquivos essenciais para instalar dependências
COPY package.json pnpm-lock.yaml ./

# Instala as dependências de produção e desenvolvimento
RUN pnpm install --frozen-lockfile

# Copia o restante do código-fonte (exceto o que está no .dockerignore)
COPY . .

# Compila o projeto
RUN pnpm run build

# Imagem final
FROM node:24.3.0-slim AS runner
WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia apenas os artefatos necessários da build
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
