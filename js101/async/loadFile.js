function load(file) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = file;
    script.onload = () => resolve(script);
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
}

load("js/hd.js")
.then(() => load("js/houdunren.js"))
.then(() => houdunren());
