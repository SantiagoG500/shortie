import { heroui } from '@heroui/react';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#1978B7",
              foreground: "#ffffff",
        
              "100": "#093D7A",
              "200": "#105693",
              "300": "#1978B7",
              "400": "#259FDB",
              "500": "#33CAFF",
              "600": "#66E1FF",
              "700": "#84F0FF",
              "800": "#ADFAFF",
              "900": "#D6FFFE",
            },
            secondary: {
              DEFAULT: "#1C39D1",
              foreground: "#ffffff",
        
              "100": "#071375",
              "200": "#0C1C8D",
              "300": "#1329AF",
              "400": "#1C39D1",
              "500": "#274CF4",
              "600": "#5B7BF8",
              "700": "#7C98FB",
              "800": "#A8BCFD",
              "900": "#D3DEFE",
            },
            success: {
              DEFAULT: "#269B4E",
              foreground: "#ffffff",
        
              "100": "#09563A",
              "200": "#106840",
              "300": "#1A8248",
              "400": "#269B4E",
              "500": "#34B554",
              "600": "#62D273",
              "700": "#85E88A",
              "800": "#B3F7B1",
              "900": "#DCFBD7",
            },
            warning: {
              DEFAULT: "#D87500",
              foreground: "#ffffff",
        
              "100": "#783200",
              "200": "#924200",
              "300": "#B55A00",
              "400": "#D87500",
              "500": "#FC9300",
              "600": "#FDB63F",
              "700": "#FECB65",
              "800": "#FEE198",
              "900": "#FEF2CB",
            },
            danger: {
              DEFAULT: "#B71D31",
              foreground: "#ffffff",
        
              "100": "#7A0B2C",
              "200": "#93122E",
              "300": "#B71D31",
              "400": "#DB2A33",
              "500": "#FF413A",
              "600": "#FF7D6B",
              "700": "#FFA188",
              "800": "#FFC7B0",
              "900": "#FFE6D7",
            },
            background: "#ffffff",
            foreground: "#131212",
            divider: "rgba(0, 0, 0, 0.15)",
            focus: "#1978B7",
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
