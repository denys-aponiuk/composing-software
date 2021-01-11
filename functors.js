(function () {
  const g = (n) => n + 1;
  const f = (n) => n * 2;
  const mappable = [20];

  const a = mappable.map(g).map(f);
  const b = mappable.map((x) => f(g(x)));

  console.log(
    a.toString() === b.toString() // true
  );
})();

(function () {
  const trace = (x) => {
    console.log(x);
    return x;
  };

  const Identity = (value) => ({
    map: (fn) => Identity(fn(value)),
  });

  const u = Identity(2);

  // Identity law
  const r1 = u;
  // Identity(2)
  const r2 = u.map((x) => x); // Identity(2)

  r1.map(trace); // 2
  r2.map(trace); // 2

  const f = (n) => n + 1;
  const g = (n) => n * 2;

  // Composition law
  const r3 = u.map((x) => f(g(x))); // Identity(5)
  const r4 = u.map(g).map(f);
  // Identity(5)

  r3.map(trace); // 5
  r4.map(trace); // 5
})();
