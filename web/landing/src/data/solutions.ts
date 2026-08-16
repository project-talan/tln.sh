import type { TerminalBlock } from '../types/terminal';

export type SolutionSlug = 'cli' | 'cloud-skeleton' | 'project-management';

export type Solution = {
  slug: SolutionSlug;
  name: string;
  packageName?: string;
  tagline: string;
  summary: string;
  description: string;
  features: string[];
  githubUrl: string;
  npmUrl?: string;
  install?: TerminalBlock[];
  gettingStarted?: TerminalBlock[];
  cardPreview: TerminalBlock[];
  license: string;
  extraNote?: string;
  relatedSlugs?: SolutionSlug[];
};

export const solutions: Solution[] = [
  {
    slug: 'cli',
    name: 'Talan CLI',
    packageName: 'tln-cli',
    tagline: 'Architecture as code.',
    summary:
      'An open-source framework for managing third-party components across diverse programming ecosystems, enabling isolated development environments and unified mono/multi-repo management.',
    description:
      'Talan CLI treats project architecture as code. It gives teams a single, consistent way to describe, build, and run components written in different languages and frameworks, without forcing everyone into the same toolchain.',
    features: [
      'Supports multiple languages and ecosystems: Java, Node.js, C++, Golang, Angular, and more',
      'Creates fully isolated, nested development environments per component',
      'Manages both mono-repo and multi-repo configurations from one CLI',
      'Bridges local development and CI/CD pipeline setups',
      'Enables polyglot programming and persistence patterns across a project',
    ],
    githubUrl: 'https://github.com/project-talan/tln-cli',
    npmUrl: 'https://www.npmjs.com/package/tln-cli',
    install: [{ command: 'npm i -g tln-cli@1.110.0' }],
    cardPreview: [
      {
        comment: 'serve a service straight from the monorepo',
        command: 'tln init:serve backend/services/apps/iam -- --use-docker',
        result: 'ready in 4.2s',
        resultTone: 'success',
      },
    ],
    license: 'MIT',
    relatedSlugs: ['cloud-skeleton', 'project-management'],
  },
  {
    slug: 'cloud-skeleton',
    name: 'Talan Clouds',
    tagline: 'Cloud agnostic, IaC-based SaaS skeleton.',
    summary:
      'Enterprise-grade, bulletproof SaaS infrastructure skeleton. Simplifies cloud infrastructure deployment by integrating Terraform, Kubernetes, and cloud provider services.',
    description:
      'Talan Clouds is a layered infrastructure platform for standardizing cloud-native deployments. It provides a multi-tenant architecture out of the box, so new SaaS products can start from a production-shaped foundation instead of reinventing one.',
    features: [
      'AWS support today, with Azure and GCP in progress',
      'Multi-tenancy through a layered design: provider, group, network, managed, app, tenant',
      'Environment isolation controlled via a single variable configuration',
      'Infrastructure as Code using Terraform and Helm',
      'Multiple backend providers: Local, Cloud, and PostgreSQL',
    ],
    githubUrl: 'https://github.com/project-talan/tln-clouds',
    gettingStarted: [
      {
        comment: 'clone the repository to get started',
        command: 'git clone git@github.com:project-talan/tln-clouds.git',
      },
    ],
    cardPreview: [
      {
        comment: 'scaffold a multi-tenant cloud skeleton',
        command: 'git clone tln-clouds && cd tln-clouds',
        result: 'layered AWS infra ready to adapt',
        resultTone: 'success',
      },
    ],
    license: 'MIT',
    extraNote:
      'Talan Clouds is not published to npm as a standalone package — it is a repository skeleton you clone and adapt, built on top of Talan CLI and Talan PM.',
    relatedSlugs: ['cli', 'project-management'],
  },
  {
    slug: 'project-management',
    name: 'Talan PM',
    packageName: 'tln-pm',
    tagline: 'Project management as code.',
    summary:
      'Integrates project management into Git-based workflows by treating SDLC artifacts as code — a single source of truth for all software development lifecycle activities.',
    description:
      'Talan PM (the "tpm" CLI) closes the gap between development and project management tooling. Instead of maintaining a separate PM tool that drifts out of sync with the repo, tasks, estimates, and reports live alongside the code they describe.',
    features: [
      'Automatic generation of project management reports and statistics from repository commits',
      'Task estimation based on historical completion data',
      'Multi-project oversight with comprehensive dashboards',
      'CLI for task management integrated directly with Git workflows',
      'Web-based dashboard for project visualization',
      'Built-in support for AI agents participating in the development process',
    ],
    githubUrl: 'https://github.com/project-talan/tln-pm',
    npmUrl: 'https://www.npmjs.com/package/tln-pm',
    install: [{ command: 'npm i -g tln-pm@0.22.0' }],
    gettingStarted: [
      {
        comment: 'initialize configuration in a git repository root',
        command: 'tpm config --project --team --timeline --tasks',
      },
      {
        comment: 'then launch the local web dashboard',
        command: 'tpm serve',
        result: 'http://localhost:5445',
        resultTone: 'muted',
      },
    ],
    cardPreview: [
      {
        comment: 'track work where the code already lives',
        command: 'tpm ls --backlog -t 26.8.0',
        result: 'SDLC artifacts linked to git',
        resultTone: 'success',
      },
    ],
    license: 'MIT',
    relatedSlugs: ['cli', 'cloud-skeleton'],
  },
];

export const getSolution = (slug: SolutionSlug): Solution => {
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) {
    throw new Error(`Unknown solution slug: ${slug}`);
  }
  return solution;
};

export const getSolutionName = (slug: SolutionSlug): string => getSolution(slug).name;
