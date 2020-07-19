const asyncLimit = (fn, n, name) => {
  let pendingPromises = [];

  return async function (...args) {
    while (pendingPromises.length >= n) {
      await Promise.race(pendingPromises).catch(() => {});
    }

    // console.log(name);
    const p = fn.apply(this, args);
    pendingPromises.push(p);
    await p.catch(() => {});
    pendingPromises = pendingPromises.filter(pending => pending !== p);
    return p;
  };
};

module.exports = asyncLimit;

// function AsyncLimit(fn, n) {
//   this.fn = fn;
//   this.n = n;
//   this.pendingPromises = [];

//   this.limit = async function(...args) {
//     while (this.pendingPromises.length >= this.n) {
//       await Promise.race(this.pendingPromises).catch(() => {});
//     }

//     const p = this.fn.apply(this, args);
//     this.pendingPromises.push(p);
//     await p.catch(() => {});
//     this.pendingPromises = this.pendingPromises.filter(pending => pending !== p);
//     return p;
//   }
// }