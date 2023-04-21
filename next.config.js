/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: !debug ? `/${name}/` : '',
  basePath: '/NEXT',
  trailingSlash: true,// 빌드 시 폴더 구조 그대로 생성

}



//next.config.js
const debug = process.env.NODE_ENV !== 'production'
const name = '/NEXT'



module.exports = nextConfig