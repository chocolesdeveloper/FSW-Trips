import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/Components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "search-background": "url(/world-map.png)",
      },
      colors: {
        primary: "#590bd8",
        primaryLighter: "#DDD5EA",
        primaryDarker: "#312a4f",
        grayPrimary: "#717171",
        grayLighter: "#bbbfbf",
        walterWhite: "#f5f5f5",
      },
      textColor: {
        dark: "#717171",
      },
    },
  },
  plugins: [],
}
export default config
