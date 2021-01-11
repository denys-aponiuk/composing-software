(function () {
  const trace = (l) => (value) => {
    console.log(`${l}: ${value}`);
    return value;
  };

  const composeM = (flatMap) => (...ms) =>
    ms.reduce((f, g) => (x) => g(x)[flatMap](f));

  const composePromises = composeM("then");

  const label = "API call composition";

  // a => Promise(b)
  const getUserById = (id) =>
    id === 3 ? Promise.resolve({ name: "Den", role: "Author" }) : undefined;

  // b => Promise(c)
  const hasPermission = ({ role }) => Promise.resolve(role === "Author");

  // Compose the functions
  const authUser = composePromises(hasPermission, getUserById);

  authUser(3).then(trace(label));

  const Monad = (value) => ({
    flatMap: (f) => f(value),
    map(f) {
      return this.flatMap((a) => Monad.of(f(a)));
    },
  });

  Monad.of = (x) => Monad(x);

  // console.log(
  Monad(21).map((x) => x * 2);
  // .map((x) => console.log(x))
  // );
})();

// Identity monad
const Id = (value) => ({
  // Functor mapping
  // Preserve the wrapping for .map() by passing the mapped value into
  // type lift:
  map: (f) => Id.of(f(value)),

  // Monad flatMap
  // Discard one level of wrapping by omitting the .of() type lift:
  flatMap: (f) => f(value),
});

// The type lift for this monad is just a reference to the factory
Id.of = Id;

(function () {
  const trace = (l) => (value) => {
    console.log(`${l}: ${value}`);
    return value;
  };
  const composeM = (flatMap) => (...ms) =>
    ms.reduce((f, g) => (x) => g(x)[flatMap](f)); // g(f(x))

  const composePromises = composeM("then");

  const label = "Promise composition";

  const plus = (n) => Promise.resolve(n + 1); // g
  const double = (n) => Promise.resolve(n * 2); // f

  const composition = composePromises(double, plus);

  composition.then(trace(label));
  // Promise composition
})();
