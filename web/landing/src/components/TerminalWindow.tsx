import type { TerminalBlock } from '../types/terminal';

type TerminalWindowProps = {
  title?: string;
  blocks: TerminalBlock[];
  className?: string;
};

const TerminalWindow = ({ title = 'terminal', blocks, className }: TerminalWindowProps) => (
  <div
    className={`overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)] ${className ?? ''}`}
  >
    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      <span className="ml-2 truncate font-mono text-xs text-zinc-500">{title}</span>
    </div>
    <div className="space-y-3 overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed">
      {blocks.map((block) => (
        <div key={block.command ?? block.comment}>
          {block.comment && <div className="text-zinc-500"># {block.comment}</div>}
          {block.command && (
            <div className="text-zinc-100">
              <span className="text-brand-400">$</span> {block.command}
            </div>
          )}
          {block.result && (
            <div className={block.resultTone === 'success' ? 'text-emerald-400' : 'text-zinc-500'}>
              {block.resultTone === 'success' ? '✔ ' : ''}
              {block.result}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default TerminalWindow;
