import { Mail, Twitter, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../src/assets/sirdash-logo.png'

const footerLinks = {
  PRODUCT: [
    { label: "Features", href: "#technology" },
    { label: "Security", href: "#security" },
    { label: "Case Studies", href: "#use-cases" },
  ],
  COMPANY: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Contact Us", href: "#demo" },
    { label: "Request Demo", href: "/login" },
  ],
};



export default function Footer() {

    const location = useLocation();



  return (
    <footer className="bg-[#06071a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg  flex items-center justify-center">
<img src={logo} alt="sirdash logo" />
              </div>
              <span className="text-white font-bold text-lg">sirdash.ai</span>
            </div>
            <p className="text-white text-sm leading-relaxed max-w-xs">
              Transforming how enterprises access and analyze data through
              AI-powered natural language interfaces.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 hover:border-white/20 flex items-center justify-center hover:text-white transition-all"
              >
                <Twitter size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 hover:border-white/20 flex items-center justify-center hover:text-white transition-all"
              >
                <Linkedin size={15} />
              </a>
            </div>
            <div className="glass-card rounded-xl p-4 flex items-start gap-3 max-w-xs">
              <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                <Mail size={14} className="text-brand-light" />
              </div>
              <div>
                <div className="text-white text-sm font-medium mb-0.5">
                  Email Us
                </div>
                <div className="text-white text-xs mb-1">
                  For support & general inquiries:
                </div>
                <a
                  href="mailto:support@sirdash.ai"
                  className="text-brand-light text-sm hover:text-brand transition-colors"
                >
                  support@sirdash.ai
                </a>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5">
                {category}
              </h4>
              <ul className="space-y-3">

{

  location.pathname=='/impressum' || location.pathname=='/career' ? links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-white hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                )) :  links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-white hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-white hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}


               
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} SirDash.ai — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
