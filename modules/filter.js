const filterDataByQuarter = (selectedQuarters, data) => {
  if (!selectedQuarters.length) return data;

  return data.filter(({ quarter }) =>
    selectedQuarters.includes(quarter.toString())
  );
};

export { filterDataByQuarter };
