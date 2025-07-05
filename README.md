## My Portfólio Back-end: :technologist:

# Stack used

<img src="https://skillicons.dev/icons?i=typescript,nestjs,nodejs,pnpm,jest,git,docker&theme=dark" alt="typescript,nestjs,nodejs,pnpm,jest,git, docker" />

### Other tools:

- [Prettier](https://eslint.org/)
- [Eslint](https://prettier.io/)
- [axios](https://axios-http.com/ptbr/docs/intro)
- [wakatime](https://wakatime.com/)
- [swagger](https://swagger.io/)
- [joi](https://joi.dev/)
- [asdf](https://asdf-vm.com/)
- [render](https://render.com/)
- [docker compose](https://docs.docker.com/compose/)

### Details

Please, check the .tool-versions file before using this project to see which versions I used.

I use pnpm to build this project. NestJS is flexible, so feel free to use another package manager if you prefer.

## Clone this repo

###### Note: Check the .env.example file before cloning this repo

```
git clone git@github.com:fandredev/portfolio-backend.git
```

## Go to directory

```
cd portfolio-backend
```

## Install dependencies (local dev)

```
pnpm i
```

## Run server (local dev)

```
pnpm run dev
```

## Run tests (local dev)

```
pnpm run test
```

## Run with Docker (recommended for production or quick testing)

1. Make sure you have a `.env` file in the project root (you can copy from `.env.example`).
2. To build and start the project with Docker Compose:

```
docker compose up --build
```

3. To start again (without rebuilding):

```
docker compose up
```

The service will be available at http://localhost:3000

## Run linters

```
pnpm run format && pnpm run lint
```

## Open Swagger API

```
open http://localhost:3000/api/v1
```

## :mailbox_with_no_mail: Contacts

E-mail: profissionalf.andre@gmail.com<br>
Linkedin: https://www.linkedin.com/in/devfandre/<br>
Portfolio: https://developer-felipe-andre.vercel.app/<br>
