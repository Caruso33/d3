// linear scale
const y = d3
  .scaleLinear()
  .domain([0, 828])
  .range([0, 400]);

console.log(`
  y(100): ${y(100)}
  y(700): ${y(700)}
  y.invert(48.3): ${y.invert(48.3)}
  y.invert(338.2): ${y.invert(338.2)}`);

// log scale
const x = d3
  .scaleLog()
  .domain([300, 15000]) // domain strictly positive or negative (<> log(0))
  .range([0, 400])
  .base(10); // should be tested which looks best

console.log(`
  x(500): ${x(500)}
  x(5000): ${x(5000)}
  x(50000): ${x(50000)}
  x.invert(52.3): ${x.invert(52.3)}
  `);

// time scale
const time = d3
  .scaleTime()
  .domain([new Date(2001, 0, 0), new Date(2020, 0, 0)])
  .range([0, 400]);

console.log(`
new Date(2010, 0, 0): ${time(new Date(2010, 0, 0))}
x.invert(52.3): ${new Date(time.invert(213.2))}
`);

// ordinal scale
const continents = [
  "AFRICA",
  "N.AMERICA",
  "EUROPA",
  "S.AMERICA",
  "ASIA",
  "AUSTRALIA"
];
const range = ["red", "orange", "yellow", "green", "blue", "indigo", "grey"];

const ordinal = d3
  .scaleOrdinal()
  .domain(continents)
  .range(range);

console.log(`
ordinal("AFRICA"): ${ordinal("AFRICA")},
ordinal("ASIA"): ${ordinal("ASIA")},
ordinal("ANTARCTICA"): ${ordinal("ANTARCTICA")},
ordinal("PANGEAE"): ${ordinal("PANGEAE")}
`);

const color = d3
  .scaleOrdinal()
  .domain(continents)
  .range(d3.schemeCategory10);

console.log(`
color("AFRICA"): ${color("AFRICA")},
color("ASIA"): ${color("ASIA")},
color("ANTARCTICA"): ${color("ANTARCTICA")},
color("PANGEAE"): ${color("PANGEAE")}
`);

// band scale
const band = d3
  .scaleBand()
  .domain(continents)
  .range([0, 400])
  .paddingInner(0.3)
  .paddingOuter(0.2);

console.log(`
band("AFRICA"): ${band("AFRICA")},
band("ASIA"): ${band("ASIA")},
band("ANTARCTICA"): ${band("ANTARCTICA")},
band.bandwidth(): ${band.bandwidth()}
`);
