/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
	  ignoreBuildErrors: true
  },
  publicRuntimeConfig: {
	  TRPC_URL: process.env.TRPC_URL
  }
}

export default nextConfig
