'use client';

import type { BlockStyleProps } from 'sanity';

/**
 * Studio'nun varsayılan alıntı bileşeni <p> içine <div> yerleştirdiği için
 * tarayıcı konsolunda geçersiz HTML uyarısı oluşuyor. Alıntıyı burada
 * kendimiz çizerek bu iç içe geçmeyi ortadan kaldırıyoruz.
 */
const BlockquoteStyle = ({ children }: BlockStyleProps) => (
  <blockquote
    style={{
      margin: 0,
      paddingLeft: '1rem',
      borderLeft: '3px solid var(--card-border-color, #d5d8dd)',
      fontStyle: 'italic',
    }}
  >
    {children}
  </blockquote>
);

export default BlockquoteStyle;
