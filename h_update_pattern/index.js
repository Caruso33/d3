const { select, range } = d3;

const svg = select("svg");
let fruits;

const render = () => {
  fruitBowl(svg, {
    fruits,
    height: +svg.attr("height")
  });
};

// Buy 5 apples.
const makeFruit = type => ({ type, id: Math.random() });
fruits = range(5).map(() => makeFruit("apple"));
render();

// Eat an apple.
setTimeout(() => {
  fruits.pop();
  render();
}, 1000);

// Replace an apple with a lemon.
setTimeout(() => {
  fruits[2].type = "lemon";
  render();
}, 2000);

// Eat an apple (second one from the left).
setTimeout(() => {
  fruits = fruits.filter((_, i) => i !== 1);
  render();
}, 3000);
