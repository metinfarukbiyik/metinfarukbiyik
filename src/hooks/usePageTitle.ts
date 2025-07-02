import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    console.log('usePageTitle: Setting title to:', title);
    
    // Immediate title set
    document.title = title;
    
    // Also try to set via setTimeout for react-helmet compatibility
    setTimeout(() => {
      if (document.title !== title) {
        console.log('usePageTitle: Title not set by helmet, setting manually');
        document.title = title;
      }
    }, 100);
    
    return () => {
      console.log('usePageTitle: Cleanup for title:', title);
    };
  }, [title]);
} 