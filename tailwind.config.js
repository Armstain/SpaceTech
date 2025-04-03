/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        
      },
    },
    plugins: [require("daisyui"), require("tailwindcss-animate")],
    daisyui: {
      themes: [
        {
          light: {
            primary: "#2c2b49",
            secondary: "#f20231",
            "secondary-content": "#D6E6F0",
            tertiary: "#000000",
            accent: "#ffffff",
            neutral: "#7a7a7a",
            "base-100": "#F5F9FC",
            "base-200": "#FFFFFF",
            "base-300": "#D9D9D9",
          },
        },
      ],
    },
    
  };
