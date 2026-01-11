import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

export interface LandingLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({
  children,
  showNav = true,
  showFooter = true,
  className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy via-gray-900 to-black">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple rounded-full filter blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10">
        {showNav && (
          <nav className="fixed top-0 w-full z-50 bg-gray-900/50 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link
                  to="/"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-primary to-purple rounded-lg flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-lg">T</span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    TradeSense
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#market"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Markets
                  </a>
                  <a
                    href="#features"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>

              {/* Mobile Menu */}
              {isMobileMenuOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-col space-y-4">
                    <a
                      href="#home"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </a>
                    <a
                      href="#market"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Markets
                    </a>
                    <a
                      href="#features"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Features
                    </a>
                    <a
                      href="#about"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About Us
                    </a>
                    <div className="flex flex-col gap-2 pt-4">
                      <Link to="/login">
                        <Button variant="ghost" size="sm" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="primary" size="sm" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}

        <main className={cn("pt-20", className)}>{children}</main>

        {showFooter && (
          <footer className="border-t border-white/10 py-12 px-6 mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="text-white font-semibold mb-4">Product</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <a
                        href="#features"
                        className="hover:text-white transition-colors"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#pricing"
                        className="hover:text-white transition-colors"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#security"
                        className="hover:text-white transition-colors"
                      >
                        Security
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <a
                        href="#about"
                        className="hover:text-white transition-colors"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#careers"
                        className="hover:text-white transition-colors"
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#blog"
                        className="hover:text-white transition-colors"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Resources</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <a
                        href="#documentation"
                        className="hover:text-white transition-colors"
                      >
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a
                        href="#api"
                        className="hover:text-white transition-colors"
                      >
                        API
                      </a>
                    </li>
                    <li>
                      <a
                        href="#support"
                        className="hover:text-white transition-colors"
                      >
                        Support
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>
                      <a
                        href="#privacy"
                        className="hover:text-white transition-colors"
                      >
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#terms"
                        className="hover:text-white transition-colors"
                      >
                        Terms
                      </a>
                    </li>
                    <li>
                      <a
                        href="#compliance"
                        className="hover:text-white transition-colors"
                      >
                        Compliance
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
                <p>© 2024 TradeSense AI. Trusted by traders worldwide.</p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};
