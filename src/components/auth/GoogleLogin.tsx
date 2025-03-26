import { useState } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function GoogleLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user = {
        id: 'user-1',
        name: 'John Doe',
        email: 'johndoe@example.com',
        avatar:
          'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
      };

      localStorage.setItem('user', JSON.stringify(user));
      navigate('/chat');
    } catch (error) {
      console.error('Google login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={handleGoogleLogin}
      className="w-full bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-all duration-200 font-medium rounded-lg"
    >
      {loading ? 'Loading...' : 'Sign in with Google'}
    </Button>
  );
}
