# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is the **deployment/infrastructure repo for tln.sh**, the marketing site for the `tln` project-talan build/deploy tool. It is not an application repo in the usual sense — it has no root `package.json`, build script, or test runner. Instead it is a set of `.tln.conf` component definitions (consumed by the `tln` CLI, project-talan's own orchestration tool) that describe how to deploy a Helm chart to Kubernetes, plus a git subtree containing the actual React frontend.

Everything here is driven by the `tln` CLI (external tool, not part of this repo). Each `.tln.conf` file is a Node module exporting `{ options, env, dotenvs, inherits, depends, steps, components }` that `tln` loads to build a step graph (`tln <step>`, e.g. `tln deploy`, `tln status`).

## Repo layout

- `.tln.conf` — root component. Sets `TLN_UID=sh.tln`, `TLN_VERSION` (read from `version` file), registry (`registry.digitalocean.com/projects-cr`), namespace (`tln-sh`), and a `create-secrets` step that assembles `secrets/values.yaml` from local `secrets/tln.sh.crt`, `secrets/tln.sh.key`, and `secrets/config.json` (all gitignored — see `.gitignore` → `secrets`).
- `version` — single-line app version (e.g. `22.10.0`), read by the root `.tln.conf` into `TLN_VERSION` and used as the Helm `tlnShVersion` value / image tag.
- `infra/` — deployment component. `infra/.tln.conf` depends on `kubectl-1.24.4` and `helm-3.10.1`, and defines steps: `deploy` (helm install of `infra/helm/tln-sh` with `--set namespace/registry/domain/reverseDomain/tlnShVersion --values <secrets/values.yaml>`), `cluster-status`, `status` (= `ingress-status` + `cluster-status`), `undeploy` (`helm uninstall tln-sh`).
  - `infra/helm/tln-sh/` — the Helm chart itself.
    - `values.yaml` — declares `deployments` (map of prefix → instances → replica count) and `routes` (ingress path → backend service mapping). This is the source of truth for what gets deployed; templates iterate over these maps generically rather than hardcoding service names.
    - `templates/deployment.yaml` — iterates `.Values.deployments[group].instances[inst]`, creating one Deployment per instance. Image is `<registry>/<reverseDomain>.<group>.<inst>:<tlnShVersion>` (e.g. `registry.digitalocean.com/projects-cr/sh.tln.static.html:22.10.0`).
    - `templates/ingress.yaml` — iterates `.Values.routes`, one Ingress per route, all pointing at host `tln.sh` with TLS via `ingress-tls` secret.
    - `templates/service.yaml`, `templates/secret.yaml`, `templates/crsecret.yaml`, `templates/namespace.yaml` — supporting resources (`crsecret.yaml` is the docker registry pull secret built from `secrets/config.json`).
  - `infra/terraform/` — currently just a stub `.tln.conf` with no steps/resources defined yet.
- `static/` — `static/.tln.conf` sets `TLN_UID` to include `TLN_COMPONENT_SRC_ID` (this is a parent component for whatever lives under `static/`).
  - `static/html/` — **git subtree** pulled from `https://github.com/project-talan/tln-react.git` (tracked in `.gitsubtrees`; branch `master`, prefix `static/html`). This is the actual frontend application:
    - React 16 app scaffolded with `react-scripts` (CRA), using `react-router-dom`, `@material-ui/core`, `react-bootstrap`.
    - `src/App.js` — top-level router: `/` → `Home` page, everything else redirects to `/`.
    - `src/components/` — `Navbar`, `Footer`, `AuthComponent`.
    - `src/pages/` — `Home`, `Login`.
    - `src/services/` — `AuthService`, `ConfigService`, `ConnectionService` (each with a corresponding `.test.js`).
    - `Dockerfile` — multi-stage: `node:16.13.1` builds the CRA bundle and renders `default.conf.template` via `envsubst`, then copies both into `nginx:1.21.5-alpine`.
    - `Jenkinsfile` — CI pipeline using `tln-jenkins-shared-libraries`; stages run `tln install --depends`, `tln prereq:init:build`, `tln test`, SonarQube analysis, then `tln docker-build` on non-PR builds.
    - Since this directory is a git subtree, **changes here should generally be made upstream in `tln-react` and pulled back in**, rather than edited in isolation — check with the user before committing directly under `static/html/` unless they've indicated otherwise.

## Commands

There is no root build/test command — this repo's own `.tln.conf` files define `tln` steps (deploy, status, undeploy, create-secrets), which require the `tln` CLI and valid cluster/registry credentials to run meaningfully.

Frontend commands run from `static/html/`:
- `npm start` — dev server on port 9080 (`cross-env PORT=9080 react-scripts start`)
- `npm run build` — production build via `react-scripts build`
- `npm test` — `cross-env CI=true react-scripts test --coverage --watchAll=false` (CRA/Jest under the hood; pass a path or `-t <name>` to scope to one test file/case)

## Notes

- `secrets/` (gitignored) must exist locally with `tln.sh.crt`, `tln.sh.key`, `config.json` before `create-secrets` / `deploy` steps can run — these are not present in the repo and are expected to be provisioned out-of-band.
- Bumping the deployed version means updating `version` (root) — this flows into both `TLN_VERSION`/`tlnShVersion` (Helm image tag) and should stay consistent with `static/html/package.json`'s `version` and the `Footer` component's hardcoded version string in `src/App.js`.
