
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  CircleDollarSign,
  Bitcoin,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would toggle dark/light mode
    // For now dark mode is always on by default
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/5">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-crypto-neon-purple rounded-full blur-sm animate-pulse-glow"></div>
              <CircleDollarSign size={28} className="text-white relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue text-transparent bg-clip-text">
              MAAL-X
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition duration-200 flex items-center gap-1.5">
              <Bitcoin size={18} />
              <span>Home</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? (
                <Sun size={20} className="text-foreground/80" />
              ) : (
                <Moon size={20} className="text-foreground/80" />
              )}
            </Button>
            <Button className="bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glassmorphism border-t border-white/5 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-foreground transition duration-200 flex items-center gap-1.5"
              onClick={() => setIsOpen(false)}
            >
              <Bitcoin size={18} />
              <span>Home</span>
            </Link>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {darkMode ? (
                  <Sun size={20} className="text-foreground/80" />
                ) : (
                  <Moon size={20} className="text-foreground/80" />
                )}
              </Button>
              <Button className="bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
