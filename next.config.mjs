/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  basePath: '/nextcicd',
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // extension: /\.mdx?$/,

};

export default nextConfig;

//---------------------------
// const isGithubActions = process.env.GITHUB_ACTIONS || false;

// let assetPrefix = '';
// let basePath = '';

// if (isGithubActions) {
//   const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
//   assetPrefix = `/${repo}/`;
//   basePath = `/${repo}`;
// }

// module.exports = {
//   output: 'export',
//   assetPrefix: assetPrefix,
//   basePath: basePath,
//   images: {
//     unoptimized: true, // GitHub Pages doesn't support dynamic image optimization
//   },
//   trailingSlash: true, // Ensures that all paths end with a '/'
// };
