import { interpreter } from './interpreter.js';

const salesState = {
  initial: 'chronological',
  states: {
    chronological: {
      events: {
        CLICK: 'low',
      },
    },
    low: {
      events: {
        CLICK: 'high',
      },
    },
    high: {
      events: {
        CLICK: 'chronological',
      },
    },
  },
};

const salesStateMachine = interpreter(salesState);

export { salesStateMachine };
