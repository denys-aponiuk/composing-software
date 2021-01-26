// TODO: Array Aggregation
(function () {
  const objs = [{ a: "a", b: "ab" }, { b: "b" }, { c: "c", b: "cb" }];

  const collection = (acc, e) => acc.concat([e]);
  /**
   * 1. [].concat([{a: 'a', b: 'ab'}])  => [{a: 'a', b: 'ab'}]
   *
   * 2. [{a: 'a', b: 'ab'}].concat([{ b: "b" }])
   *    => [{a: 'a', b: 'ab'}, { b: "b" }]
   *
   * 3. [{a: 'a', b: 'ab'}, { b: "b" }].concat([{ c: "c", b: "cb" }])
   *    => [{a: 'a', b: 'ab'}, { b: "b" }, { c: "c", b: "cb" }]
   */

  const a = objs.reduce(collection, []);

  console.log(
    "collection aggregation",
    a,
    a[1].b,
    a[2].c,
    `enumerable keys: ${Object.keys(a)}`
  );
})();

// TODO: Linked list aggregation using pairs:
(function () {
  const objs = [{ a: "a", b: "ab" }, { b: "b" }, { c: "c", b: "cb" }];
  const pair = (a, b) => [b, a];

  const l = objs.reduceRight(pair, []);

  /**
   * 1. ( [], { c: "c", b: "cb" } ) => [{ c: "c", b: "cb" }, []]
   * 2. ( [{ c: "c", b: "cb" }, []], { b: "b" } ) => [{ b: "b" }, [{ c: "c", b: "cb" }, []]]
   * 3. ( [{ b: "b" }, [{ c: "c", b: "cb" }, []]], { a: "a", b: "ab" } )
   *    => [
   *         { a: "a", b: "ab" },
   *         [
   *           { b: "b" },
   *           [
   *             { c: "c", b: "cb" },
   *             []
   *           ]
   *          ]
   *         ]
   *
   */

  console.log(
    "linked list aggregation",
    l,
    `enumerable keys: ${Object.keys(l)}`
  );
})();

// TODO: Concatenation
(function () {
  const objs = [{ a: "a", b: "ab" }, { b: "b" }, { c: "c", b: "cb" }];

  const concatenate = (a, o) => ({ ...a, ...o });

  const c = objs.reduce(concatenate, []);

  console.log("concatenation", c, `enumerable keys: ${Object.keys(c)}`);

  // concatenation { a: 'a', b: 'cb', c: 'c' } enumerable keys: a,b,c
})();
