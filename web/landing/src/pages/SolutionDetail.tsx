import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import FeatureList from '../components/FeatureList';
import CtaButtons from '../components/CtaButtons';
import TerminalWindow from '../components/TerminalWindow';
import { getSolution, getSolutionName, type Solution } from '../data/solutions';

type SolutionDetailProps = {
  slug: Solution['slug'];
};

const SolutionDetail = ({ slug }: SolutionDetailProps) => {
  const solution = getSolution(slug);

  return (
    <>
      <section className="border-b border-white/10">
        <PageContainer>
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">{solution.name}</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {solution.tagline}
              </h1>
              <p className="mt-5 text-lg text-zinc-400">{solution.description}</p>
              <div className="mt-8">
                <CtaButtons githubUrl={solution.githubUrl} npmUrl={solution.npmUrl} />
              </div>
            </div>

            <img
              src={`/hero-${solution.slug}.png`}
              alt=""
              className="mx-auto w-full max-w-md"
            />
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-white">Key features</h2>
            <div className="mt-4">
              <FeatureList features={solution.features} />
            </div>
          </div>

          <aside className="space-y-6">
            {solution.install && (
              <div>
                <h2 className="text-sm font-semibold text-white">Install</h2>
                <div className="mt-2">
                  <TerminalWindow title={solution.packageName ?? solution.slug} blocks={solution.install} />
                </div>
              </div>
            )}

            {solution.gettingStarted && (
              <div>
                <h2 className="text-sm font-semibold text-white">Getting started</h2>
                <div className="mt-2">
                  <TerminalWindow title="terminal" blocks={solution.gettingStarted} />
                </div>
              </div>
            )}

            <div>
              <h2 className="text-sm font-semibold text-white">License</h2>
              <p className="mt-2 text-sm text-zinc-400">{solution.license}</p>
            </div>

            {solution.relatedSlugs && solution.relatedSlugs.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-white">Built on</h2>
                <ul className="mt-2 space-y-1">
                  {solution.relatedSlugs.map((relatedSlug) => (
                    <li key={relatedSlug}>
                      <Link to={`/${relatedSlug}`} className="text-sm font-medium text-brand-400 hover:underline">
                        {getSolutionName(relatedSlug)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {solution.extraNote && (
          <p className="mt-12 border-t border-white/10 pt-6 text-sm text-zinc-500">{solution.extraNote}</p>
        )}
      </PageContainer>
    </>
  );
};

export default SolutionDetail;
