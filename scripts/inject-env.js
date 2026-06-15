// Script para inyectar variables de entorno sensibles en el HTML
// durante el build. Las variables se leen de process.env (Vercel) 
// o .env.local (desarrollo local)

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Google Search Console verification
const gscId = process.env.REACT_APP_GSC_VERIFICATION || '';
if (gscId) {
  html = html.replace(
    '%REACT_APP_GSC_VERIFICATION%',
    `<meta name="google-site-verification" content="${gscId}" />`
  );
} else {
  html = html.replace('%REACT_APP_GSC_VERIFICATION%', '');
}

// Google Analytics 4
const ga4Id = process.env.REACT_APP_GA4_ID || '';
if (ga4Id) {
  html = html.replace(
    '%REACT_APP_GA4_ID%',
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4Id}');
    </script>`
  );
} else {
  html = html.replace('%REACT_APP_GA4_ID%', '');
}

fs.writeFileSync(indexPath, html);
console.log('✅ Variables de entorno inyectadas en index.html');
