import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pg"],
  async redirects() {
    return [
      {
        source: "/sign-in",
        destination: "/?auth=1",
        permanent: false,
      },
      {
        source: "/sign-up",
        destination: "/?auth=1",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
