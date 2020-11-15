import data from './data.js';
import sortFns from './helpers/sort-fns.js';
import render from './modules/render.js';
import filterDataByQuarter from './modules/filter.js';
import stateMachine from './state-machine/machine.js';

const KEY_SPACE = 32;
const SORT_SALES = 'SORT_SALES';
const SORT_SALESPERSON = 'SORT_SALESPERSON';
const quarterFilter = document.querySelector('.filter ul');
const salesSort = document.querySelector('.sales');
const salespersonSort = document.querySelector('.salesperson');
let activeFilters = [];

const init = () => {
  render(data);
  initQuarterFilter();
  initSalesSort();
  initSalespersonSort();
};

const initQuarterFilter = () => {
  quarterFilter.addEventListener('change', handleQuarterFilter);
  quarterFilter.addEventListener('keypress', (event) => {
    event.preventDefault();
    if (event.which === KEY_SPACE) {
      event.target.checked = !event.target.checked;
      handleQuarterFilter(event);
    }
  });
};

const handleQuarterFilter = (event) => {
  if (event.target.type === 'checkbox') {
    if (event.target.checked) {
      activeFilters.push(event.target.value);
    } else {
      activeFilters = activeFilters.filter(
        (item) => item !== event.target.value
      );
    }

    const sortState = stateMachine.currentState();
    const sortedData = sortAndFilterData(sortState, activeFilters, data);
    render(sortedData);
  }
};

const initSalesSort = () => {
  salesSort.addEventListener('click', () => handleSort(SORT_SALES));
  salesSort.addEventListener('keypress', (event) =>
    handleKeypressSort(event, SORT_SALES)
  );
};

const initSalespersonSort = () => {
  salespersonSort.addEventListener('click', () => handleSort(SORT_SALESPERSON));
  salespersonSort.addEventListener('keypress', (event) =>
    handleKeypressSort(event, SORT_SALESPERSON)
  );
};

const handleSort = (sortEvent) => {
  const nextState = stateMachine.transition(sortEvent);
  const sortedData = sortAndFilterData(nextState, activeFilters, data);
  render(sortedData);
};

const handleKeypressSort = (event, sortEvent) => {
  event.preventDefault();

  if (event.which === KEY_SPACE) {
    handleSort(sortEvent);
  }
};

const sortAndFilterData = (nextState, activeFilters, data) => {
  const filteredData = filterDataByQuarter(activeFilters, data);
  return sortFns[nextState](filteredData);
};

init();
