module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/walls',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
}
