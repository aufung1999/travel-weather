/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "openweathermap.org"],
  },
};

module.exports = nextConfig;
