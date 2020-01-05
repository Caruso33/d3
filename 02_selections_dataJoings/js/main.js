// using internal data
const data = [25, 20, 10, 12, 15];

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", 800)
  .attr("height", 600);

const circles = svg.selectAll("circle").data(data);

circles
  .enter()
  .append("circle")
  .attr("cx", (_, i) => 50 + i * 100)
  .attr("cy", 100)
  .attr("r", d => d * 1.5)
  .attr("fill", "green");

// loading external data
d3.json("data/buildings.json").then(data => {
  data.forEach(d => (d.height = +d.height));

  console.log("json", data);

  const rects = svg.selectAll("rects").data(data);

  rects
    .enter()
    .append("rect")
    .attr("x", (_, i) => i * 100)
    .attr("y", 200)
    .attr("width", 50)
    .attr("height", d => d.height * 0.6)
    .attr("fill", d =>
      d.name.includes("Shanghai") || d.name.includes("Ping") ? "blue" : "orangered"
    );
});

d3.csv("data/buildings.csv").then(data => {
  console.log("csv", data);
});
