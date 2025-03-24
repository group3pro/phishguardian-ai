
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  SignedIn, 
  SignedOut, 
  UserButton,
  useClerk 
} from "@clerk/clerk-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { signOut } = useClerk();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/60 backdrop-blur-md z-40 border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-lg"
          onClick={closeMenu}
        >
          <Shield className="h-5 w-5 text-primary" />
          <span>PhishGuardian</span>
        </Link>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <nav className={`${isMobile ? 
          `absolute top-16 left-0 right-0 bg-background border-b border-border/40 shadow-md transition-all duration-200 ${isMenuOpen ? 'block' : 'hidden'} p-4` : 
          'flex items-center gap-6'}`}
        >
          <Link 
            to="/" 
            className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5"
            onClick={closeMenu}
          >
            Home
          </Link>
          
          <SignedIn>
            <Link 
              to="/dashboard" 
              className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          </SignedIn>
          
          <Link 
            to="/scanner" 
            className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5"
            onClick={closeMenu}
          >
            Scanner
          </Link>
          <Link 
            to="/about" 
            className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5"
            onClick={closeMenu}
          >
            About
          </Link>

          <div className={`${isMobile ? 'mt-4 flex flex-col gap-3' : 'ml-2 flex items-center gap-3'}`}>
            <SignedIn>
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            
            <SignedOut>
              <Link to="/sign-in" onClick={closeMenu}>
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/sign-up" onClick={closeMenu}>
                <Button>Sign Up</Button>
              </Link>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
