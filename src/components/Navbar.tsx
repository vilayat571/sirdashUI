import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { navItems } from '../data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm py-3' : 'py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center group-hover:bg-brand-dark transition-colors">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className={`font-bold text-lg tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>sirdash.ai</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}
              className={`text-sm font-medium transition-colors duration-200 ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/70 hover:text-white'}`}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#" className={`text-sm font-medium transition-all px-4 py-2 rounded-lg border ${
            scrolled ? 'text-gray-600 border-gray-200 hover:border-gray-300' : 'text-white/70 border-white/15 hover:border-white/30'
          }`}>
            Try Our Sandbox
          </a>
          <a href="#demo" className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md shadow-brand/20 flex items-center gap-1.5">
            Request Demo <span className="text-lg leading-none">↗</span>
          </a>
        </div>

        <button className={`md:hidden p-2 ${scrolled ? 'text-gray-700' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="block text-gray-600 hover:text-gray-900 text-sm font-medium py-2 transition-colors" onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="pt-3 space-y-2 border-t border-gray-100">
            <a href="#" className="block text-center text-gray-600 text-sm border border-gray-200 rounded-xl py-2.5 hover:border-gray-300 transition-colors">Try Our Sandbox</a>
            <a href="#demo" className="block text-center bg-brand text-white text-sm font-semibold rounded-xl py-2.5 hover:bg-brand-dark transition-colors">Request Demo ↗</a>
          </div>
        </div>
      )}
    </nav>
  );
}
