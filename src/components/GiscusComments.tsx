import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

interface GiscusCommentsProps {
  pageTitle: string;
}

export function GiscusComments({ pageTitle }: GiscusCommentsProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'preferred_color_scheme'>('preferred_color_scheme');

  useEffect(() => {
    setTheme('preferred_color_scheme');
  }, []);

  return (
    <section className="giscus-comments">
      <div className="comments-separator"></div>
      
      <div className="comments-header">
        <div className="comments-icon-wrapper">
          <svg className="comments-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </div>
        
        <div className="comments-text">
          <h3>Yorumlar</h3>
          <p>GitHub hesabınızla giriş yaparak yorum yapabilirsiniz</p>
        </div>
      </div>
      
      <div className="comments-container">
        <Giscus
          id="comments"
          repo="metinfarukbiyik/metinfarukbiyik"
          repoId="R_kgDOO2O5xw"
          category="Announcements"
          categoryId="DIC_kwDOO2O5x84Cs5XU"
          mapping="title"
          term={pageTitle}
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme={theme}
          lang="tr"
          loading="lazy"
        />
      </div>
    </section>
  );
} 