import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Pill, Activity, LogIn, LogOut, User, History } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signInWithGoogle, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">Pharmacy Advisor</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "border-blue-500 text-slate-900"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                )}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/history"
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                  location.pathname === '/history'
                    ? "border-blue-500 text-slate-900"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                )}
              >
                History
              </Link>
            )}
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
             {user ? (
               <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-sm text-slate-700">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="h-8 w-8 rounded-full" referrerPolicy="no-referrer" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span className="hidden lg:inline">{user.displayName}</span>
                 </div>
                 <button 
                   onClick={logout}
                   className="text-slate-500 hover:text-slate-700 transition-colors"
                   title="Sign Out"
                 >
                   <LogOut className="h-5 w-5" />
                 </button>
               </div>
             ) : (
               <button 
                 onClick={signInWithGoogle}
                 className="text-slate-600 hover:text-blue-600 font-medium text-sm flex items-center gap-2"
               >
                 <LogIn className="h-4 w-4" />
                 Sign In
               </button>
             )}

             <Link to="/symptom-checker">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Check Symptoms
                </button>
             </Link>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                  location.pathname === link.path
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700"
                )}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/history"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                  location.pathname === '/history'
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700"
                )}
              >
                History
              </Link>
            )}
            <Link
                to="/symptom-checker"
                onClick={() => setIsOpen(false)}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-600 font-semibold hover:bg-slate-50"
            >
                Check Symptoms
            </Link>
            <div className="border-t border-slate-200 pt-4 pb-3">
              {user ? (
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    {user.photoURL ? (
                      <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                    ) : (
                      <User className="h-10 w-10 rounded-full bg-slate-100 p-2 text-slate-500" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-slate-800">{user.displayName}</div>
                    <div className="text-sm font-medium text-slate-500">{user.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <div className="px-4">
                  <button
                    onClick={() => {
                      signInWithGoogle();
                      setIsOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
