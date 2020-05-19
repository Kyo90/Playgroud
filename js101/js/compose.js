const compose = (...fns) => fns.reduce(
  (f, g) => (...args) => f(g(...args))
);

const pipeAsync = (...fns) => arg => fns.reduce(
  (p, f) => p.then(f), Promise.resolve(arg)
);


const compose1 = (...fns) => fns.reduce(
  (f,g) => {
    console.log(f, g)
    return function(args) {
      f(g(args))
    }
  }
)

const pipeAsync1 = (...fns) => arg => fns.reduce(
  (f,g) => {
    console.log(f,g)
   return f.then(g);
  }, Promise.resolve(arg)
);

const setName = (config) => {
  if(config) {
    config.name = "momo"
  }
  return config
}

const setAge = (config) => {
  if(config) {
    config.age = "18"
  }
  return config
}

const print = (config) => {
  if(config) {
    console.log(JSON.stringify(config))
  }
  return config;
}

compose(print, setName)({init:'100'});
//compose1(print, setName, setAge)({init:'100'});

const sum = pipeAsync1(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();
