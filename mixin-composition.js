(function () {
  const withConstructor = (constructor) => (o) => ({
    // create the delegate [[Prototype]]
    __proto__: {
      // add the constructor prop to the new [[Prototype]]
      constructor,
    },

    // mix all o's props into the new object
    ...o,
  });

  const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);

  const withFlying = (o) => {
    let isFlying = false;
    return {
      ...o,
      fly() {
        isFlying = true;
        return this;
      },
      land() {
        isFlying = false;
        return this;
      },
      isFlying: () => isFlying,
    };
  };

  const withBattery = ({ capacity }) => (o) => {
    let percentCharged = 100;
    return {
      ...o,
      draw(percent) {
        const remaining = percentCharged - percent;
        percentCharged = remaining > 0 ? remaining : 0;
        return this;
      },
      getCharge: () => percentCharged,
      getCapacity() {
        return capacity;
      },
    };
  };

  const createDrone = ({ capacity = "3000mAh" }) =>
    pipe(
      withFlying,
      withBattery({ capacity }),
      withConstructor(createDrone)
    )({});

  const myDrone = createDrone({ capacity: "5500mAh" });

  console.log(`
    can fly: ${myDrone.fly().isFlying() === true}
    can land: ${myDrone.land().isFlying() === false}
    battery capacity: ${myDrone.getCapacity()}
    battery status: ${myDrone.draw(50).getCharge()}%
    battery drained: ${myDrone.draw(75).getCharge()}%
  `);

  console.log(`
    constructor linked: ${myDrone.constructor === createDrone}
  `);
})();
