/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  output: 'export',
  images: {
   unoptimized: true,
  },
};

export default nextConfig;
