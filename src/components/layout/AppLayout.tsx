import { useEffect, useState } from 'react';
import { User as UserType } from '@/lib/types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '../ui/button';
import { LogOut, MessageSquare, User } from 'lucide-react';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }

    const user = JSON.parse(storedUser) as UserType;
    try {
      setUser(user);
    } catch (error) {
      console.error('Invalid user stored in local storage', error);
      localStorage.removeItem('user');
      navigate('/');
    }
    console.log('user', user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Headers */}
      <header className="border-b border-border bg-backgound/80 backgorund-blur sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="text-xl font-semibold">We Connect</div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={`rounded-full ${
                location.pathname === '/chat' ? 'bg-blue-500' : ''
              }`}
            >
              <Link to="/chat">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Chat</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={`rounded-full ${
                location.pathname === '/profile' ? 'bg-blue-500' : ''
              }`}
            >
              <Link to="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>
            <Button
              // variant ghost is used to remove the background color and border
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <div className="sr-only">Logout</div>
            </Button>
          </div>
        </div>
      </header>
      {/* main content */}
      <main className="flex-1 overflow-hidden">
        <div className="container h-full px-4 py-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};
