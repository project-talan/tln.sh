type CtaButtonsProps = {
  githubUrl: string;
  npmUrl?: string;
};

const CtaButtons = ({ githubUrl, npmUrl }: CtaButtonsProps) => (
  <div className="flex flex-wrap gap-3">
    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
      View on GitHub
    </a>
    {npmUrl && (
      <a href={npmUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
        View on npm
      </a>
    )}
  </div>
);

export default CtaButtons;
