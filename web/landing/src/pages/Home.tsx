import PageContainer from '../components/layout/PageContainer';
import SolutionCard from '../components/SolutionCard';
import TerminalWindow from '../components/TerminalWindow';
import { solutions } from '../data/solutions';
import type { TerminalBlock } from '../types/terminal';

const heroBlocks: TerminalBlock[] = [
  {
    comment: 'serve a service straight from the monorepo',
    command: 'tln init:serve backend/services/apps/iam -- --use-docker',
    result: 'ready in 4.2s',
    resultTone: 'success',
  },
  {
    comment: 'check what’s queued for this release',
    command: 'tpm ls --backlog -t 26.8.0',
    result: 'SDLC artifacts linked to git',
    resultTone: 'success',
  },
  {
    comment: 'onboard a tenant on the cloud skeleton',
    command: 'tln onboard-tenant -- --tenant demo',
    result: 'smooth tenant onboarding',
    resultTone: 'success',
  },
];

const Home = () => (
  <>
    <section className="relative overflow-hidden border-b border-white/10">
      <PageContainer>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">Project Talan</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              SDLC Orchestration
            </h1>
            <p className="mt-5 max-w-lg text-lg text-zinc-400">
              Three open-source, MIT-licensed tools covering the software development lifecycle - from
              architecture and local development environments, through cloud infrastructure, to project
              management.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#solutions" className="btn-primary">
                View the tools
              </a>
              <a
                href="https://github.com/project-talan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Star on GitHub
              </a>
            </div>
          </div>

          <TerminalWindow title="~/projects/petramco/platform" blocks={heroBlocks} />
        </div>
      </PageContainer>
    </section>

    <div id="solutions">
      <PageContainer>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">The suite</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Three tools - one SDLC
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
      </PageContainer>
    </div>
  </>
);

export default Home;
