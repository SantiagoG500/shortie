import { heroui } from '@heroui/react';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@heroui/theme/dist/components/(button|snippet|code|input).js'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              "100": "#FDE6D8",
              "200": "#FCC8B1",
              "300": "#F6A289",
              "400": "#EE7D6A",
              "500": "#E4463B",
              "600": "#C42B2D",
              "700": "#A41D2B",
              "800": "#841227",
              "900": "#6D0B25",
            },
            secondary: {
              "100": "#D3DEFE",
              "200": "#A8BCFD",
              "300": "#7C98FB",
              "400": "#5B7BF8",
              "500": "#274CF4",
              "600": "#1C39D1",
              "700": "#1329AF",
              "800": "#0C1C8D",
              "900": "#071375",
            },
            success: {
              "100": "#DCFBD7",
              "200": "#B3F7B1",
              "300": "#85E88A",
              "400": "#62D273",
              "500": "#34B554",
              "600": "#269B4E",
              "700": "#1A8248",
              "800": "#106840",
              "900": "#09563A",
            },
            warning: {
              "100": "#FEF2CB",
              "200": "#FEE198",
              "300": "#FECB65",
              "400": "#FDB63F",
              "500": "#FC9300",
              "600": "#D87500",
              "700": "#B55A00",
              "800": "#924200",
              "900": "#783200",
            },
            danger: {
              "100": "#FDDBD3",
              "200": "#FCB0A8",
              "300": "#F87C7D",
              "400": "#F15A6A",
              "500": "#E8274D",
              "600": "#C71C4E",
              "700": "#A7134C",
              "800": "#860C47",
              "900": "#6F0743"
            },
            foreground: "#343333",
            background: "#e5e1e1",
            focus: "#e62517",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#66E1FF",
              foreground: "#131212",

              "100": "#D6FFFE",
              "200": "#ADFAFF",
              "300": "#84F0FF",
              "400": "#66E1FF",
              "500": "#33CAFF",
              "600": "#259FDB",
              "700": "#1978B7",
              "800": "#105693",
              "900": "#093D7A",
            },
            secondary: {
              DEFAULT: "#5B7BF8",
              foreground: "#131212",

              "100": "#D3DEFE",
              "200": "#A8BCFD",
              "300": "#7C98FB",
              "400": "#5B7BF8",
              "500": "#274CF4",
              "600": "#1C39D1",
              "700": "#1329AF",
              "800": "#0C1C8D",
              "900": "#071375",
            },
            success: {
              DEFAULT: "#62D273",
              foreground: "#131212",

              "100": "#DCFBD7",
              "200": "#B3F7B1",
              "300": "#85E88A",
              "400": "#62D273",
              "500": "#34B554",
              "600": "#269B4E",
              "700": "#1A8248",
              "800": "#106840",
              "900": "#09563A",
            },
            warning: {
              DEFAULT: "#FDB63F",
              foreground: "#131212",

              "100": "#FEF2CB",
              "200": "#FEE198",
              "300": "#FECB65",
              "400": "#FDB63F",
              "500": "#FC9300",
              "600": "#D87500",
              "700": "#B55A00",
              "800": "#924200",
              "900": "#783200",
            },
            danger: {
              DEFAULT: "#F15A6A",
              foreground: "#131212",

              "100": "#FFE6D7",
              "200": "#FFC7B0",
              "300": "#FFA188",
              "400": "#FF7D6B",
              "500": "#FF413A",
              "600": "#DB2A33",
              "700": "#B71D31",
              "800": "#93122E",
              "900": "#7A0B2C"
            },
            
            background: "#131212",
            foreground: "#e5e1e1",
            divider: "rgba(255, 255, 255, 0.322)",
            focus: "#84F0FF",
            // content1: "#414141" ,
            // content2: "#525252",
            // content3: "#5e5d5d",
            // content4: "#797878",
            
          },
        },
      },
    })
  ],
} satisfies Config;
