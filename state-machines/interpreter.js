const interpreter = (machine) => {
  let currentState = machine.initial;

  return {
    currentState() {
      return currentState;
    },
    transition(event) {
      const nextState =
        machine.states[currentState].events[event] || currentState;
      currentState = nextState;

      return nextState;
    },
    reset() {
      currentState = machine.initial;
      return currentState;
    },
  };
};

export { interpreter };
