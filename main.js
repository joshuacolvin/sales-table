import data from './data.js';
import sortFns from './helpers/sort-fns.js';
import { salesStateMachine } from './state-machines/sales.js';
import { salespersonStateMachine } from './state-machines/salesperson.js';
import { render } from './modules/render.js';
import { filterDataByQuarter } from './modules/filter.js';

const KEY_SPACE = 32;
const quarterFilter = document.querySelector('.filter ul');
const salesSort = document.querySelector('.sales');
const salespersonSort = document.querySelector('.salesperson');
let activeFilters = [];

const init = () => {
  render(data);
  initSalesSort();
  initSalespersonSort();
  initQuarterFilter();
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

    const sortedData = sortAndFilterData(getSortedState(), activeFilters, data);
    render(sortedData);
  }
};

const initSalespersonSort = () => {
  salespersonSort.addEventListener('click', handleSalespersonSort);
  salespersonSort.addEventListener('keypress', (event) => {
    event.preventDefault();
    if (event.which === KEY_SPACE) {
      handleSalespersonSort();
    }
  });
};

const handleSalespersonSort = () => {
  const nextState = salespersonStateMachine.transition('CLICK');
  const sortedData = sortAndFilterData(nextState, activeFilters, data);
  salesStateMachine.reset();
  render(sortedData);
};

const initSalesSort = () => {
  salesSort.addEventListener('click', handleSalesSort);
  salesSort.addEventListener('keypress', (event) => {
    event.preventDefault();
    if (event.which === KEY_SPACE) {
      handleSalesSort();
    }
  });
};

const handleSalesSort = () => {
  const nextState = salesStateMachine.transition('CLICK');
  const sortedData = sortAndFilterData(nextState, activeFilters, data);
  salespersonStateMachine.reset();
  render(sortedData);
};

const getSortedState = () =>
  salespersonStateMachine.currentState() !== 'chronological'
    ? salespersonStateMachine.currentState()
    : salesStateMachine.currentState();

const sortAndFilterData = (nextState, activeFilters, data) => {
  const filteredData = filterDataByQuarter(activeFilters, data);
  return sortFns[nextState](filteredData);
};

const keyHandler = (event) => {
  switch (event.which) {
    case KEY_SPACE: {
      event.stopPropagation();
      return doStuff();
      break;
    }
  } //end switch
  return true;
};

init();
