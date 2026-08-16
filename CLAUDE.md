# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is the repository for the **tln.sh** website — the marketing site for the `tln` project-talan build/deploy tool. It has two independent parts:

- A `tln`-driven deployment config at the repo root (`.tln.conf`), consumed by the `tln` CLI (external tool, not part of this repo).
- A standalone Vite + React + TypeScript landing page under `web/landing/`, buildable and dockerizable entirely on its own (no dependency on the `tln` CLI or the root config).

Each `.tln.conf` file is a Node module exporting `{ options, env, dotenvs, inherits, depends, steps, components }` that `tln` loads to build a step graph (`tln <step>`).

## Repo layout

- `.tln.conf` — root component. Sets `TLN_UID=sh.tln`, `TLN_VERSION` (read from `version` file), registry (`registry.digitalocean.com/projects-cr`), namespace (`tln-sh`), and a `create-secrets` step that assembles `secrets/values.yaml` from local `secrets/tln.sh.crt`, `secrets/tln.sh.key`, and `secrets/config.json` (all gitignored — see `.gitignore` → `secrets`). There is currently no `deploy`/Helm step defined anywhere in this repo — only secret assembly.
- `version` — single-line app version (e.g. `26.8.0`), read by the root `.tln.conf` into `TLN_VERSION`.
- `web/landing/` — the marketing landing page for Project Talan (overview + one detail page each for `tln-cli`, `tln-clouds`, `tln-pm`). Fully self-contained: its own `package.json`/`pnpm-lock.yaml`, `Dockerfile` (multi-stage `node:20-alpine` + pnpm build → `nginx:alpine` runtime), and `nginx.conf`. No `.tln.conf` here by design.
  - `src/App.tsx` — router: `/` → `Home`, `/cli` `/cloud-skeleton` `/project-management` → `SolutionDetail`, catch-all redirects to `/`.
  - `src/data/solutions.ts` — single typed content source (name, tagline, description, features, links, install/getting-started terminal blocks) for all three tools; `Home` and `SolutionDetail` both read from it.
  - `src/components/TerminalWindow.tsx` — reusable terminal-mockup component (traffic-light chrome + typed `TerminalBlock[]` content) used for both the hero demo and the install/getting-started snippets.
  - `src/components/layout/` — `Navbar`, `Footer`, `PageContainer`.
  - `public/` — `logo.png`, `author.jpg`, and per-tool hero illustrations (`hero-cli.png`, `hero-cloud-skeleton.png`, `hero-project-management.png`).
  - Styling: Tailwind CSS, dark theme (`zinc` neutrals + a custom `brand` blue accent defined in `tailwind.config.ts`).
  - Linting: Biome (`biome.json`), not ESLint — `@typescript-eslint` is incompatible with this project's TypeScript 7 (native/Go-rewritten compiler) as of writing.

## Commands

There is no root build/test command — the root `.tln.conf` only defines a `create-secrets` step, which requires the `tln` CLI and local `secrets/` files to run.

Frontend commands run from `web/landing/`:
- `pnpm install`
- `pnpm dev` — Vite dev server
- `pnpm build` — production build to `dist/`
- `pnpm preview` — serve the production build locally
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — `biome lint .`

Docker (from `web/landing/`):
- `docker build -t tln-landing:local .`
- `docker run --rm -p 8080:80 tln-landing:local`

## Notes

- `secrets/` (gitignored) must exist locally with `tln.sh.crt`, `tln.sh.key`, `config.json` before the root `create-secrets` step can run — these are not present in the repo and are expected to be provisioned out-of-band.
- `web/landing/` is intentionally decoupled from the `tln` CLI orchestration and the root `version` file — it has its own independent `version` in `package.json`.
