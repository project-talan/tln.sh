type FeatureListProps = {
  features: string[];
};

const FeatureList = ({ features }: FeatureListProps) => (
  <ul className="space-y-3">
    {features.map((feature) => (
      <li key={feature} className="flex items-start gap-3 text-zinc-300">
        <svg
          className="mt-1 h-4 w-4 flex-none text-brand-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.704 5.29a1 1 0 010 1.415l-7.25 7.25a1 1 0 01-1.415 0l-3.25-3.25a1 1 0 111.415-1.415L8.75 11.836l6.543-6.543a1 1 0 011.411-.003z"
            clipRule="evenodd"
          />
        </svg>
        <span>{feature}</span>
      </li>
    ))}
  </ul>
);

export default FeatureList;
