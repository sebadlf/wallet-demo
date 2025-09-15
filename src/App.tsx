import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import InvestmentSection from './sections/InvestmentSection';
import InvestmentDetailSection from './sections/InvestmentDetailSection';
import './App.css';
import { App as AntdApp } from 'antd';
import { useLayoutEffect } from 'react';


const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

// Header component
const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <img 
          src="https://bbsa.com.ar/wp-content/uploads/2022/01/Logo-Becerra.svg" 
          alt="BBSA Logo" 
          className="app-logo" 
        />
      </div>
    </header>
  );
};

function App() {
  return (
    <AntdApp> 
      <Router>
        <div className="app">
          <Header />
          <main className="app-main">
            <Wrapper>
              <Routes>
                <Route path="/" element={<InvestmentSection />} />
                <Route path="/investment/:investmentId" element={<InvestmentDetailSection />} />
              </Routes>
            </Wrapper>
          </main>
        </div>

      </Router>
    </AntdApp>
  );
}

export default App;
