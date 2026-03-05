/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SymptomChecker from './pages/SymptomChecker';
import History from './pages/History';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
          <footer className="bg-slate-900 text-slate-400 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p>&copy; {new Date().getFullYear()} Pharmacy Advisor. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
