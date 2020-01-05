// adding via js
const chartArea = document.querySelector("#chart-area");

const svgNamespace = "http://www.w3.org/2000/svg";

const addSvg = document.createElementNS(svgNamespace, "svg");
addSvg.setAttribute("width", 100);
addSvg.setAttribute("height", 100);

const rect = document.createElementNS(svgNamespace, "rect");
rect.setAttribute("x", 0);
rect.setAttribute("y", 0);
rect.setAttribute("width", 50);
rect.setAttribute("height", 50);
rect.setAttribute("fill", "green");

addSvg.appendChild(rect);
chartArea.appendChild(addSvg);

// d3 selectors
d3.select("#canvas")
  .append("circle")
  .attr("cx", 800)
  .attr("cy", 100)
  .attr("r", 50)
  .attr("fill", "blue");

const redEle = d3.selectAll(".red");
redEle.attr("fill", "red");
