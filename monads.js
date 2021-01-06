const trace = (label) => (value) => {
  console.log(`${label}: ${value}`);
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
