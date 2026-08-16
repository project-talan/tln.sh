import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SolutionDetail from './pages/SolutionDetail';

const App = () => (
  <div className="relative flex min-h-screen flex-col">
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_800px_420px_at_50%_-15%,rgba(59,130,246,0.22),transparent)]"
    />
    <Navbar />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cli" element={<SolutionDetail slug="cli" />} />
        <Route path="/cloud-skeleton" element={<SolutionDetail slug="cloud-skeleton" />} />
        <Route path="/project-management" element={<SolutionDetail slug="project-management" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
