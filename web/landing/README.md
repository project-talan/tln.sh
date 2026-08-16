# tln-landing

Marketing landing page for **Project Talan** — an overview page plus one detail page each for
[tln-cli](https://github.com/project-talan/tln-cli), [tln-clouds](https://github.com/project-talan/tln-clouds),
and [tln-pm](https://github.com/project-talan/tln-pm).

Stack: Vite + React + TypeScript + Tailwind CSS + react-router-dom, built with pnpm, served by nginx.

This app is fully self-contained and independent of this repository's `tln` CLI orchestration — there is
intentionally no `.tln.conf` here.

## Local development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

## Docker

```bash
docker build -t tln-landing:local .
docker run --rm -p 8080:80 tln-landing:local
```

Then open http://localhost:8080.
