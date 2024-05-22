//
// This is unused code
// Just in case!
//

// const fetchRoutes = fetch('http://localhost:3000/api/v1/get_routes')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     return data;
//   });

// module.exports = (async () => {
//   fetch('http://localhost:3000/api/v1/get_routes')
//   .then((response) => {
//     const r = response.json();
//     return r.message;
//   })
//   .then((data) => {
//     return data;
//   });
// })();

// export default await fetchRoutes;

// import fetch from 'cross-fetch';
// let routsArray = [];
// const fetchRoutes = fetch('http://localhost:3000/api/v1/get_routes')
// .then((response) => {
//   return response.json();
// })
// .then((data) => {
//   console.log(data)
//   routsArray = data
//   return data;
// });
// export { fetchRoutes };

//
//LAST VARIANT
//
// import fetch from 'cross-fetch';
// let routsArray = [];
// export function fetchRoutes() {
//   fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     routsArray = data
//     return data;
//   });
// }
