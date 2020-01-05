const margins = {
  top: 20,
  right: 50,
  bottom: 50,
  left: 70
};

const canvas_dims = { width: 960, height: 500 };

const content_dims = {
  width: canvas_dims.width - margins.left - margins.right,
  height: canvas_dims.height - margins.top - margins.bottom
};

const group = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", canvas_dims.width)
  .attr("height", canvas_dims.height)
  .append("g")
  .attr("transform", `translate(${margins.left},${margins.top})`);

d3.json("data/revenues.json").then(data => {
  data.forEach(d => (d.revenue = +d.revenue));

  const scales = {
    x: d3
      .scaleBand()
      .domain(data.map(d => d.month))
      .range([0, content_dims.width])
      .padding(0.3),
    y: d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d.revenue))])
      .range([content_dims.height, 0])
  };

  // axes
  const yAxis = d3.axisLeft(scales.y).tickFormat(d =>
    d.toLocaleString("en-US", {
      currency: "USD",
      style: "currency",
      minimumFractionDigits: 0
    })
  );
  d3.select("g")
    .append("g")
    .attr("class", "left axis")
    .call(yAxis);

  // y axis-label
  group
    .append("text")
    .attr("class", "y axis-label")
    .attr("y", -55)
    .attr("x", -(content_dims.height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

  const xAxis = d3.axisBottom(scales.x);
  d3.select("g")
    .append("g")
    .attr("class", "bottom axis")
    .attr("transform", `translate(0,${content_dims.height})`)
    .call(xAxis);

  // x axis-label
  group
    .append("text")
    .attr("class", "x axis-label")
    .attr("x", content_dims.width / 2)
    .attr("y", content_dims.height)
    .attr("dy", 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

  const rects = group.selectAll("rects").data(data);

  rects
    .enter()
    .append("rect")
    .attr("x", d => scales.x(d.month))
    .attr("y", d => scales.y(d.revenue))
    .attr("width", scales.x.bandwidth)
    .attr("height", d => content_dims.height - scales.y(d.revenue))
    .attr("fill", "grey");
});
