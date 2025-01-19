/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        logo: "url('src/assets/logo.png')", // Path to the logo image in the public folder
      },
      animation: {
        dots: "dots 1.5s steps(4, end) infinite",
      },
      keyframes: {
        dots: {
          "0%, 20%": { content: "''" },
          "40%": { content: "'.'" },
          "60%": { content: "'..'" },
          "80%, 100%": { content: "'...'" },
        },
      },
      fontFamily: {
        playfair: ["Playfair", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        merriweather: ["Merriweather", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"], // For Google Fonts
      },
      colors: {
        primary: {
          DEFAULT: "#1E3A8A", // Navy Blue
          hover: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#065F46", // Deep Green
          hover: "#047857",
        },
        accent: {
          orange: "#F97316", // Bright Orange
          purple: "#A78BFA", // Pastel Purple
          pink: "#F43F5E", // Rose Pink
          blue: " #7A68EF",
          // blue: " #44318D",
          graphs: "#E98074",
          lightPink: "#FE68B4",
          // lightPink: "#D83F87",
          sidebar: "#2A1B3D",
          olive: "#A4B3B6",
        },
        neutral: {
          light: "#F3F4F6", // Light Gray
          dark: "#374151", // Dark Gray
        },
        background: {
          cream: "#FFFAF0", // Cream White
          mint: "#D1FAE5", // Soft Mint
        },
      },

      // extend: {
      //   colors: {
      //     navyBlue: "#002D62",
      //     gold: "#D4AF37",
      //     lightGray: "#E0E0E0",
      //     offWhite: "#F8F8F8",
      //     black: "#000000",
      //   },
    },
  },
  plugins: [],
};
