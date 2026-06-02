import { ReactNode } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Layout/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen  text-white overflow-x-hidden">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
