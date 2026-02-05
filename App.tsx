
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import WikiPage from './pages/WikiPage';
import EntranceAnimation from './components/EntranceAnimation';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Router>
      {!isLoaded && <EntranceAnimation onComplete={() => setIsLoaded(true)} />}
      <div className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0 scale-95'}`}>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wiki/:slug" element={<WikiPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
