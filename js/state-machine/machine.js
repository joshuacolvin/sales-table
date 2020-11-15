import interpreter from './interpreter.js';

const state = {
  initial: 'chronological',
  states: {
    chronological: {
      events: {
        SORT_SALES: 'low',
        SORT_SALESPERSON: 'alphabetical',
      },
    },
    low: {
      events: {
        SORT_SALES: 'high',
        SORT_SALESPERSON: 'alphabetical',
      },
    },
    high: {
      events: {
        SORT_SALES: 'chronological',
        SORT_SALESPERSON: 'alphabetical',
      },
    },
    alphabetical: {
      events: {
        SORT_SALES: 'low',
        SORT_SALESPERSON: 'chronological',
      },
    },
  },
};

const stateMachine = interpreter(state);

export default stateMachine;
