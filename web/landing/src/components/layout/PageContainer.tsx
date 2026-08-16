import type { PropsWithChildren } from 'react';

const PageContainer = ({ children }: PropsWithChildren) => (
  <main className="mx-auto max-w-6xl px-6 py-16">{children}</main>
);

export default PageContainer;
