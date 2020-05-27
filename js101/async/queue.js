function queue(...fns) {
  return function (arg) {
    let promise = Promise.resolve(arg);
    fns.map((fn) => {
      promise = promise.then((v) => {
        return new Promise((resolve) => {
          resolve(fn(v));
        });
      });
    });
    return promise;
  };
}

const sum = queue(
  (x) => x + 1,
  (x) => new Promise((resolve) => setTimeout(() => resolve(x + 2), 1000)),
  (x) => x + 3,
  async (x) => (await x) + 4
);
// (async () => {
//   console.log(await sum(5)); // 15 (after one second)
// })();

const timeout = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });

function mergeAjax(fns) {
  let promise = Promise.resolve();
  let data = []
  fns.forEach((fn) => {
    promise = promise.then(fn).then(res => {
      data.push(res);
      return data;
    })
  });
  return promise
}

mergeAjax([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});
