import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-php.min.js';
import 'prismjs/components/prism-markup-templating.min.js';
import 'prismjs/themes/prism-tomorrow.css';

const Code = ({ code, language }: { code: string; language: string }) => {
  useEffect(() => {
    Prism.highlightAll(); 
  }, [code]);

  return ( 
    <pre className={`language-${language} w-full max-w-full !pt-[70px]`}>
      <code className={`language-${language} !whitespace-break-spaces`}>{code}</code>
    </pre>
  );
};

export default Code;
