# Dockerfile optimized for NestJS with pnpm
# Using Node 22 (LTS) Alpine for smaller footprint
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only essential files for installing dependencies properly
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev) for building
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the project
RUN pnpm run build

# Prune dev dependencies to keep the image small
RUN pnpm prune --prod

# Final image
FROM node:22-alpine AS runner
WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Set non-root user for security
USER node

# Copy necessary artifacts from builder
COPY --chown=node:node --from=builder /usr/src/app/package.json ./
COPY --chown=node:node --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

# Application port
EXPOSE 3000

CMD ["node", "dist/main.js"]
