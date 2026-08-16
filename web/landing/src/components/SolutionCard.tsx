import { Link } from 'react-router-dom';
import type { Solution } from '../data/solutions';
import TerminalWindow from './TerminalWindow';

type SolutionCardProps = {
  solution: Solution;
};

const SolutionCard = ({ solution }: SolutionCardProps) => (
  <Link
    to={`/${solution.slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
  >
    <div className="p-4 pb-0">
      <TerminalWindow title={solution.packageName ?? solution.slug} blocks={solution.cardPreview} />
    </div>
    <div className="flex flex-1 flex-col gap-3 p-6">
      <h3 className="text-lg font-semibold text-white">{solution.name}</h3>
      <p className="text-sm font-medium text-brand-400">{solution.tagline}</p>
      <p className="flex-1 text-sm text-zinc-400">{solution.summary}</p>
      <span className="text-sm font-medium text-zinc-200 transition-colors group-hover:text-white">
        Learn more &rarr;
      </span>
    </div>
  </Link>
);

export default SolutionCard;
