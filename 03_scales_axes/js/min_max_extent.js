// min, max, extent
const data = [
  { grade: "A", value: 4 },
  { grade: "B", value: 3 },
  { grade: "C", value: 2 }
];

const min = d3.min(data, d => d.value);
console.log("min", min);

const max = d3.max(data, d => d.value);
console.log("max", max);

const extent = d3.extent(data, d => d.value);
console.log("extent", extent);

const grade_map = data.map(d => d.grade);
console.log("grade_map", grade_map);
