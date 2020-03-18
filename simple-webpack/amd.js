let factories = {};

function define(moduleName, dependencies, factory) {
  factory.dependencies = dependencies;
  factories[moduleName] = factory;
}

function require(modules, callback) {
  const result = modules.map(module => {
    let factory = factories[module];
    let exports;
    let dependencies = factory.dependencies;
    require(dependencies, function() {
      exports = factory.apply(null, arguments)
    })
    return exports;
  })
  callback.apply(null, result);
}

define('name',[], function() {
  return "AMD"
})

define('age',['name'], function(name) {
  return name + 9
})

require(['age'], function(age) {
  console.log(age)
})
