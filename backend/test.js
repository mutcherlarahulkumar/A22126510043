const MaxHeap = require('./lib/max_heap'); // Adjust path if needed

const heap = new MaxHeap(5); // Max heap of size 5

const users = [
    { userId: 1, username: "Alice", postCount: 15 },
    { userId: 2, username: "Bob", postCount: 30 },
    { userId: 3, username: "Charlie", postCount: 10 },
    { userId: 4, username: "David", postCount: 40 },
    { userId: 5, username: "Eve", postCount: 35 },
    { userId: 6, username: "Frank", postCount: 5 },
    { userId: 7, username: "Grace", postCount: 40 },
    { userId: 8, username: "Hank", postCount: 100 },
    { userId: 9, username: "Ivy", postCount: 50 },
    { userId: 10, username: "Jack", postCount: 45 }
];

users.forEach(user => heap.insert(user));

console.log("Top Users in Heap:", heap.getTopUsers());
