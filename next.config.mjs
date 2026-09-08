/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Não revela o framework no header X-Powered-By.
  poweredByHeader: false,
  // Sem source maps no cliente em produção.
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Sem otimizador remoto: apenas assets locais, sem SSRF/abusos.
    remotePatterns: [],
  },
};

export default nextConfig;
