import { BrowserRouter as Router, Routes, Route } from 'react-router';
import InvestmentSection from './sections/InvestmentSection';
import InvestmentDetailSection from './sections/InvestmentDetailSection';
import './App.css';

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
    <Router>
      <div className="app">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<InvestmentSection />} />
            <Route path="/investment/:investmentId" element={<InvestmentDetailSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
