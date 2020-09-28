import randomWords from "random-words";

export const searchRequest = (value) => {
  const delay = Math.floor(Math.random() * 5);
  console.log(delay);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!value) return resolve([]);
      const result = [value, ...randomWords(5)];
      resolve(result);
    }, delay * 1000);
  });
};
e;
