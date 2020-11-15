const sortFns = {
  high: (data) => data.slice().sort((a, b) => b.sales - a.sales),
  low: (data) => data.slice().sort((a, b) => a.sales - b.sales),
  chronological: (data) => data,
  alphabetical: (data) =>
    data.slice().sort((a, b) => a.salesperson.localeCompare(b.salesperson)),
};

export default sortFns;
