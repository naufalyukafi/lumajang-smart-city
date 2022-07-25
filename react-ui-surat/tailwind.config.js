/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*/.{js,jsx}",
  ],
  
  theme: {
    extend: {
      fontSize: {
        xxs: ".70rem",
        xs: ".75rem",
        s: "10px",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
      },
      minHeight: {
        "5v": "5vh",
        "10v": "10vh",
        "15v": "15vh",
        "17v": "17vh",
        "20v": "20vh",
        "25v": "25vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "1/4": "25vh",
        "1/2": "50vh",
        "3/4": "75vh",
      },
      inset: {
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
        '38%': '38%',
        '43%': '43%'
      },
      colors: {
        "antique-walnut": "#482e15",
        "spruce": "#ceb78e",
        "red-cheny-wood": "#ceb78e"
      },
      blur: {
        xs: '2px',
      },
      fontFamily: {
        Pacifico: "Pacifico, cursive"
      }
    },
  },
  plugins: [],
};
