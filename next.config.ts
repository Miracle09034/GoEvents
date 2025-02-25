const nextConfig = {
     output: "standalone", // Optimize for deployment
     images: {
       domains: ['utfs.io'],
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'utfs.io',
           port: ''
         }
       ]
     },
     typescript: {
       ignoreBuildErrors: true,
     },
     eslint: {
       ignoreDuringBuilds: true,
     }
   };

   module.exports = nextConfig;
