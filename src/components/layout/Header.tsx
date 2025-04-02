
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Menu, X, MessageSquare, Mail, Link2 } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-40 border-b border-border/40 shadow-sm">
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
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="relative">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <nav className={`${isMobile ? 
          `absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-md transition-all duration-200 ${isMenuOpen ? 'block' : 'hidden'} p-4` : 
          'flex items-center gap-4'}`}
        >
          <div className={`${isMobile ? 'space-y-3' : 'flex items-center gap-4'}`}>
            <Link 
              to="/" 
              className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent/50 flex items-center"
              onClick={closeMenu}
            >
              Home
            </Link>
            
            <SignedIn>
              <Link 
                to="/dashboard" 
                className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent/50 flex items-center"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            </SignedIn>
            
            <Link 
              to="/scanner" 
              className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent/50 flex items-center"
              onClick={closeMenu}
            >
              Scanner
            </Link>

            <Link 
              to="/chatbot" 
              className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent/50 flex items-center gap-1"
              onClick={closeMenu}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chatbot</span>
            </Link>

            <Link 
              to="/email-verifier" 
              className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent/50 flex items-center gap-1"
              onClick={closeMenu}
            >
              <Mail className="h-4 w-4" />
              <span>Email Verifier</span>
            </Link>

            <Link 
              to="/link-checker" 
              className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent/50 flex items-center gap-1"
              onClick={closeMenu}
            >
              <Link2 className="h-4 w-4" />
              <span>Link Checker</span>
            </Link>

            <Link 
              to="/about" 
              className="text-foreground/70 hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-accent/50 flex items-center"
              onClick={closeMenu}
            >
              About
            </Link>
          </div>

          <div className={`${isMobile ? 'mt-4 pt-4 border-t border-border/40 flex flex-col gap-3' : 'ml-2 flex items-center gap-3'}`}>
            <SignedIn>
              <div className={`${isMobile ? 'flex flex-col gap-3' : 'flex items-center gap-3'}`}>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="w-full md:w-auto justify-start md:justify-center"
                >
                  Sign Out
                </Button>
                <div className="flex justify-start">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className={`${isMobile ? 'flex flex-col gap-3' : 'flex items-center gap-3'}`}>
                <Link to="/sign-in" onClick={closeMenu} className="w-full">
                  <Button variant="outline" className="w-full md:w-auto">Sign In</Button>
                </Link>
                <Link to="/sign-up" onClick={closeMenu} className="w-full">
                  <Button className="w-full md:w-auto">Sign Up</Button>
                </Link>
              </div>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
