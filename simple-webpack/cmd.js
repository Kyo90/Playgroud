const fs = require("fs");
//common js
function req(moduleName) {
  const content = fs.readFileSync(moduleName, "utf8");
  const fn = new Function(
    "exports",
    "module",
    "require",
    "__dirname",
    "__filename",
    content + "\n return module.exports"
  );
  let module = {
    exports: {}
  };
  return fn(module.exports, module, req, __dirname, __filename);
}

let str = req("./a.js");
console.log(str);
