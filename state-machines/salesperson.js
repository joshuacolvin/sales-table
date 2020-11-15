import { interpreter } from './interpreter.js';

const salespersonState = {
  initial: 'chronological',
  states: {
    chronological: {
      events: {
        CLICK: 'alphabetical',
      },
    },
    alphabetical: {
      events: {
        CLICK: 'chronological',
      },
    },
  },
};

const salespersonStateMachine = interpreter(salespersonState);

export { salespersonStateMachine };
