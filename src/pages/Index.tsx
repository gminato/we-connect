import { ThemeToggle } from '@/components/ThemeToggle';
import { GoogleLogin } from '@/components/auth/GoogleLogin';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md animinate-fade-in">
        <h1 className="text-4xl font-bold mb-2">We Connect</h1>
        <p className="text-muted-foreground">
        </p>
      </div>
    </div> */}

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">We Connect</h1>
            <p className="text-muted-foreground">
              Connect, chat, and share with friends and family.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center">
                Sign in to your account
              </h2>

              <div className="pt-4">
                <GoogleLogin />
              </div>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Features
                  </span>
                </div>
              </div>

              <div className="grid gap-4 mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Real-time messaging</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Emoji support</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Light and dark mode</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} We Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
