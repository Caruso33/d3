const { scaleOrdinal } = d3;

const colorScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c11d1d", "#eae600"]);

const radiusScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range([80, 50]);

const fruitBowl = (selection, props) => {
  const { fruits, height } = props;

  selection // bowl
    .selectAll("rect")
    .data([null])
    .enter()
    .append("rect")
    .attr("y", 110)
    .attr("width", 920)
    .attr("height", 300)
    .attr("rx", 300 / 2);

  const groups = selection.selectAll("g").data(fruits, d => d.id);
  const groupsEnter = groups.enter().append("g");

  groupsEnter
    .attr("transform", (_, i) => `translate(${i * 180 + 100},${height / 2})`)
    .merge(groups)
    .transition()
    .duration(1000)
    .attr("transform", (_, i) => `translate(${i * 180 + 100},${height / 2})`);

  groups
    .exit()
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .remove();

  groups
    .exit()
    .select("circle")
    .transition()
    .duration(1000)
    .attr("transform", `scale(3)`);

  groupsEnter
    .append("circle")
    .attr("r", 0)
    .merge(groups.select("circle"))
    .attr("fill", d => colorScale(d.type))
    .transition()
    .duration(1000)
    .attr("r", d => radiusScale(d.type));

  groupsEnter
    .append("text")
    .merge(groups.select("text"))
    .text(d => d.type)
    .attr("y", 120);
};
