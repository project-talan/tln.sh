import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Overview' },
  { to: '/cli', label: 'Talan CLI' },
  { to: '/cloud-skeleton', label: 'Talan Clouds' },
  { to: '/project-management', label: 'Talan PM' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `whitespace-nowrap text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`;

const Navbar = () => (
  <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
    <nav className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
      <NavLink to="/" className="flex flex-none items-center gap-2 text-white">
        <img src="/logo.png" alt="" className="h-7 w-7 rounded-md" />
        <span className="whitespace-nowrap text-base font-semibold tracking-tight">Project Talan</span>
      </NavLink>
      <div className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto sm:justify-end">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClass}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  </header>
);

export default Navbar;
