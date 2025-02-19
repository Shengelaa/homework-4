//1) Create a Promise with a 50/50 Chance of Resolving or Rejecting

const randomPromise = new Promise((resolve, reject) => {
  const number = Math.random();
  if (number > 0.5) {
    resolve("resolved");
  } else {
    reject("rejected");
  }
});

randomPromise
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

//2) Fetch Data from Two Sources and Return the Faster Response: https://dummyjson.com/users and https://jsonplaceholder.typicode.com/users .
//Use either fetch or axios.

const fetchData = async () => {
  const url1 = "https://dummyjson.com/users";
  const url2 = "https://jsonplaceholder.typicode.com/users";

  const fetch1 = fetch(url1).then((response) => response.json());

  const fetch2 = fetch(url2).then((response) => response.json());

  try {
    const fastestRespone = await Promise.race([fetch1, fetch2]);
    console.log(fastestRespone);
  } catch (error) {
    console.log("error", error);
  }
};

fetchData();

//3) Write three promises that return arrays after different time intervals:
//Two should resolve successfully.

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve([1, 2, 3]), 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => reject("error"), 1500);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve([1, 2, 3]), 2000);
});

Promise.allSettled([promise1, promise2, promise3]).then((res) => {
  const successfullResults = res.filter((res) => {
    return res.status === "fulfilled";
  });
  const mergedArray = successfullResults.map((res) => res.value).flat();

  console.log("fullfilled promises", mergedArray);
});

//4) Use these APIs: https://fakestoreapi.com/users  and https://jsonplaceholder.typicode.com/users Fetch data from both endpoints
//  and display the combined data only if both promises are fulfilled successfully
//

const fetchData1 = async () => {
  url1 = "https://fakestoreapi.com/users";
  url2 = "https://jsonplaceholder.typicode.com/users";

  try {
    const [response1, response2] = await Promise.all([
      fetch(url1).then((response) => response.json()),
      fetch(url2).then((response) => response.json()),
    ]);
    const combinedData = [...response1, ...response2];
    console.log(combinedData);
  } catch (error) {
    console.log("error", error);
  }
};

fetchData1();
