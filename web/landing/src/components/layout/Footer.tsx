const Footer = () => (
  <footer className="border-t border-white/10">
    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
      <p>&copy; {new Date().getFullYear()} Project Talan. Open source, MIT-licensed tooling for the SDLC, v{__APP_VERSION__}</p>
      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/vladyslav-kurmaz-a635005/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-zinc-500 opacity-70 transition-opacity hover:opacity-100"
        >
          <span className="sr-only">Vladyslav Kurmaz on LinkedIn</span>
          <img src="/author.jpg" alt="" className="h-6 w-6 rounded-full" />
        </a>
        <a
          href="https://github.com/project-talan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 transition-colors hover:text-white"
        >
          <span className="sr-only">Project Talan on GitHub</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
