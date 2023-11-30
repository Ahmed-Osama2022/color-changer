const body = document.body;

const myFavColors = [
  "#FC2C9C",
  "yellow",
  "green",
  "red",
  "blue",
  "orange",
  "purple",
  "brown",
];

// Color Chnager function
body.addEventListener("click", () => {
  body.style.backgroundColor =
    myFavColors[Math.floor(Math.random() * myFavColors.length)];
});

// For any key
window.addEventListener("keyup", (e) => {
  console.log(e);
  body.style.backgroundColor =
    myFavColors[Math.floor(Math.random() * myFavColors.length)];
});
