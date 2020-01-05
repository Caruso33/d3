// axes
const leftAxis = d3.axisLeft(y); // scale input
d3.select("g")
  .append("g")
  .attr("class", "left axis")
  .call(leftAxis);

// y axis-label
g.append("text")
  .attr("class", "y axis-label")
  .attr("y", -40)
  .attr("x", -(canvas_dimensions.height / 2) + margin.top + margin.bottom)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Lala Lulu Y-Axis");

const topAxis = d3.axisTop(x);
d3.select("g")
  .append("g")
  .attr("class", "top axis")
  .call(topAxis);

// additional translating needed
const bottomAxis = d3.axisBottom(x);
d3.select("g")
  .append("g")
  .attr("class", "bottom axis")
  .attr("transform", `translate(0,${content_height})`)
  .call(bottomAxis);

// x axis-label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", content_width / 2)
  .attr("y", content_height)
  .attr("dy", 40)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Lala Lulu X-Axis");

// additional ticks setup
const rightAxis = d3
  .axisRight(y)
  .tickSize(5) // for inner & outer
  .tickSizeInner(-5)
  .tickSizeOuter(10)
  .ticks(12) // how many
  // .tickFormat(d3.format(",.0f")); // floating point
  .tickFormat(d => `${d}m`); // or  custom
//   .tickValues([1, 2, 3, 4, 5, 8, 21]); // explicit values

d3.select("g")
  .append("g")
  .attr("class", "right axis")
  .attr("transform", `translate(${content_width},0)`)
  .call(rightAxis)
  .selectAll("text")
  .attr("x", 10)
  .attr("y", 10)
  // .attr("text-anchor", "end")
  .attr("transform", "rotate(-40)");
