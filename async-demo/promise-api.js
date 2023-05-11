// const p = Promise.resolve({ id: 1});
// p.then(res => console.log(res));

// const p1 = Promise.reject(new Error('Reason for rejection...'));
// p1.then(res => console.log(res));

// Parallel Operations
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async op 1....");
        resolve(1);
        //reject(new Error('Something failed...'));
    }, 2000);
}); 

const p3 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async op 2....");
        resolve(2);
    }, 2000);
}); 

// Promise.all([p2, p3])
//     .then(res => console.log('Result: ', res))
//     .catch(err => console.log('Error: ', err.message));

// Anyone execution succeed.
Promise.race([p2, p3])
    .then(res => console.log('Result: ', res))
    .catch(err => console.log('Error: ', err.message));