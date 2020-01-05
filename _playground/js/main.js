(async () => {
  const URL =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

  const { baseTemperature, monthlyVariance: data } = await d3
    .json(URL)
    .catch(() => ({ baseTemperature: 0, monthlyVariance: [] }));

  const margin = {
    top: 80,
    right: 50,
    bottom: 150,
    left: 80
  };

  const canvas_dims = { width: 960, height: 700 };
  const content_dims = {
    width: canvas_dims.width - margin.left - margin.right,
    height: canvas_dims.height - margin.top - margin.bottom
  };
  const rect_dims = {
    height: 40,
    width: 5
  };

  const { scale, parseDates, specifier } = getScale(data, content_dims);

  console.error(`
color scheme doesn't work, so does legend,
tooltip styles don't get applied, 

following user stories don't work:

User Story #2: My heat map should have a description with a corresponding id="description".
User Story #6: There should be at least 4 different fill colors used for the cells.
User Story #15: The rect elements in the legend should use at least 4 different fill colors.

test cdn is included but apparently runs only on chrome
`);

  const { svg, group } = drawSvgAndContentGroup(canvas_dims, margin);

  const rects = drawRects({
    group,
    data,
    parseDates,
    specifier,
    scale,
    rect_dims
  });

  drawAxes({
    svg,
    group,
    scale,
    content_dims,
    margin,
    baseTemperature
  });

  drawLegend({ svg, margin, content_dims, scale });

  drawTooltip({ rects, parseDates, specifier, baseTemperature });
})();

function getScale(data, content_dims) {
  const specifier = { month: "%m", year: "%Y" };
  const parseDates = (specifier, data) => d3.timeParse(specifier)(data);

  const scale = {
    x: d3
      .scaleTime()
      .domain([1750, 2017].map(y => parseDates(specifier.year, y)))
      // .domain(d3.extent(data.map(v => parseDates(specifier.year, v.year))))
      .range([0, content_dims.width]),
    y: d3
      .scaleTime()
      .domain(d3.extent(data.map(v => parseDates(specifier.month, v.month))))
      .range([0, content_dims.height - 20]),
    color: d3
      .scaleOrdinal(d3.schemeRdYlBu)
      .domain(d3.extent(data.map(v => v.variance)))
      .range(["blue", "red"])
  };

  return { scale, parseDates, specifier };
}

function drawSvgAndContentGroup(canvas_dims, margin) {
  const svg = d3
    .select("#chart-area")
    .append("svg")
    .attr("width", canvas_dims.width)
    .attr("height", canvas_dims.height);

  const group = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  return { svg, group };
}

function drawRects({ group, data, parseDates, specifier, scale, rect_dims }) {
  const rects = group
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("x", d => scale.x(parseDates(specifier.year, d.year)))
    .attr(
      "y",
      d => scale.y(parseDates(specifier.month, d.month)) - rect_dims.height / 2
    )
    .attr("width", rect_dims.width)
    .attr("height", rect_dims.height)
    .style("stroke", "white")
    .style("fill", d => scale.color(d.variance))
    .attr("class", "cell")
    .attr("data-year", d => parseDates(specifier.year, d.year))
    .attr("data-month", d => parseDates(specifier.month, d.month))
    .attr("data-temp", d => d.variance);

  return rects;
}

function drawAxes({
  svg,
  group,
  scale,
  content_dims,
  margin,
  baseTemperature
}) {
  const xAxis = d3.axisBottom(scale.x);
  const yAxis = d3
    .axisLeft(scale.y)
    .tickFormat(d => d.toLocaleString("default", { month: "long" }));

  group
    .append("g")
    .attr("transform", `translate(0,${content_dims.height})`)
    .attr("class", "tick")
    .attr("id", "x-axis")
    .style("font-size", "14px")
    .call(xAxis);

  svg
    .append("line")
    .classed("connecting-line", true)
    .attr("x1", margin.left)
    .attr("x2", margin.left)
    .attr("y1", content_dims.height + margin.top)
    .attr("y2", content_dims.height + margin.top - 20)
    .style("stroke", "#000");

  group
    .append("g")
    .attr("class", "tick")
    .attr("id", "y-axis")
    .style("font-size", "14px")
    .call(yAxis);

  // labels
  svg
    .append("text")
    .attr("y", 40)
    .attr("id", "title")
    .attr("transform", `translate(${content_dims.width / 2 + margin.left},0)`)
    .style("text-anchor", "middle")
    .style("font-size", "16px")
    .text(`Heatmap - 1753 - 2015: Base temperature ${baseTemperature}℃`);

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -content_dims.height / 2 - margin.top)
    .attr("y", 20)
    .style("text-anchor", "middle")
    .text("Month");

  svg
    .append("text")
    .attr("x", content_dims.width / 2 + margin.left)
    .attr("y", content_dims.height + margin.top)
    .attr("dy", 40)
    .style("text-anchor", "middle")
    .text("Year");
}

function drawLegend({ svg, margin, content_dims, scale }) {
  const legend_dims = { height: 40, width: 60 };

  const legend = svg
    .selectAll("#legend")
    .data(scale.color.domain())
    .enter()
    .append("g")
    .attr("id", "legend")
    .attr(
      "transform",
      `translate(${margin.left},${margin.top + content_dims.height + 50})`
    );

  legend
    .append("rect")
    .attr("x", (_, i) => i * legend_dims.width)
    .attr("y", 0)
    .attr("height", legend_dims.height)
    .attr("width", legend_dims.width)
    .style("fill", scale.color)
    .attr("stroke", "black")
    .attr("stroke-width", "1px");

  legend
    .append("text")
    .attr("x", (_, i) => i * legend_dims.width)
    .attr("y", legend_dims.width)
    .text(d => d);
}

function drawTooltip({ rects, parseDates, specifier, baseTemperature }) {
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

  rects
    .on("mouseover", d => {
      tooltip
        .transition()
        .duration(500)
        .style("opacity", 1);

      tooltip
        .html(
          `${d.year} - ${parseDates(
            specifier.month,
            d.month
          ).toLocaleString("default", { month: "long" })}<br />
          ${(baseTemperature + d.variance).toFixed(2)}℃<br>
                ${d.variance >= 0 ? "+" : ""}${d.variance.toFixed(1)}℃`
        )
        // .attr("data-year", parseDates(specifier.year, d.Year))
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 50 + "px")
        .attr("data-year", parseDates(specifier.year, d.year));
    })
    .on("mouseout", () => {
      tooltip
        .transition()
        .duration(500)
        .style("opacity", 0);
    });
}
