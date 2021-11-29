console.log("Hello !!!");

// const arr = [1, 2, 56, 76, 43, 221, 23];

console.log(process.argv);

const [, , nums] = process.argv;
const arr = JSON.parse(nums);
console.log(arr);
console.log(Math.max(...arr));
