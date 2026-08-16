import type { PropsWithChildren } from 'react';

const PageContainer = ({ children }: PropsWithChildren) => (
  <div className="mx-auto max-w-6xl px-6 py-16">{children}</div>
);

export default PageContainer;
