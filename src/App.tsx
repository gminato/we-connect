import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/ui/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Chat from './pages/Chat';

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system">
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
