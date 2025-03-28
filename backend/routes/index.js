const express = require('express');
const axios = require('axios');
const MaxHeap = require('../lib/max_heap');
const { MaxHeap2, Deque } = require('../lib/max_heap2');

const router = express();
const heap = new MaxHeap(5);
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTU0OTY0LCJpYXQiOjE3NDMxNTQ2NjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk0NDhjOWY3LWFhODgtNGJmNy1iOGRhLTE3NmY5ZjQzYjA3ZiIsInN1YiI6Im11dGNoZXJsYXJhaHVsa3VtYXIuMjIuY3NlQGFuaXRzLmVkdS5pbiJ9LCJjb21wYW55TmFtZSI6InN5bmNmaXNzaW9uIiwiY2xpZW50SUQiOiI5NDQ4YzlmNy1hYTg4LTRiZjctYjhkYS0xNzZmOWY0M2IwN2YiLCJjbGllbnRTZWNyZXQiOiJHaERGdUVLWVRSQnBxeGxaIiwib3duZXJOYW1lIjoicmFodWwiLCJvd25lckVtYWlsIjoibXV0Y2hlcmxhcmFodWxrdW1hci4yMi5jc2VAYW5pdHMuZWR1LmluIiwicm9sbE5vIjoiQTIyMTI2NTEwMDQzIn0.djyHLT-H5jtqRbrzTXNt2CyarEgAq96sHwUgif2MW54';

router.get('/health', (req, res) => {
    console.log("The router is Working fine and we are good to go..");
    res.status(200).json({ msg: "Server is Fine..." });
});

async function fetchUsers() {
    const response = await fetch('http://20.244.56.144/test/users', {
        method: 'GET',
        headers: {
            'Authorization': AUTH_TOKEN,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log("data", data);
    return data.users;
}

async function fetchPosts(userId) {
    const response = await fetch(`http://20.244.56.144/test/users/${userId}/posts`, {
        method: 'GET',
        headers: {
            'Authorization': AUTH_TOKEN,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log("data", data);
    return data.posts.length;
}

async function processUsers() {
    const users = await fetchUsers();
    for (const userId in users) {
        const username = users[userId];
        const postCount = await fetchPosts(userId);
        heap.insert({ userId, username, postCount });
    }
    console.log("Top Users by Post Count:", heap.getTopUsers());
    return heap.getTopUsers();
}

router.get('/users', async (req, res) => {
    const data = await processUsers();
    res.json({ topUsers: data });
});

const usersMap = new Map();
const postsMap = new Map();
const popularPostsHeap = new MaxHeap2();
const latestPostsDeque = new Deque(5);

const fetchUsersAndPosts = async () => {
    try {
        const userResponse = await fetch('http://20.244.56.144/test/users', {
            method: 'GET',
            headers: {
                'Authorization': AUTH_TOKEN,
                'Content-Type': 'application/json'
            }
        });

        if (!userResponse.ok) throw new Error(`HTTP error! Status: ${userResponse.status}`);
        const userData = await userResponse.json();
        console.log(userData);
        usersMap.clear();
        Object.entries(userData.users).forEach(([id, name]) => {
            usersMap.set(id, name);
        });

        const postRequests = [...usersMap.keys()].map(async (userId) => {
            const postResponse = await fetch(`http://20.244.56.144/test/users/${userId}/posts`, {
                method: 'GET',
                headers: {
                    'Authorization': AUTH_TOKEN,
                    'Content-Type': 'application/json'
                }
            });

            if (!postResponse.ok) throw new Error(`HTTP error! Status: ${postResponse.status}`);
            const postData = await postResponse.json();
            let userPosts = postData.posts.map(post => ({
                ...post,
                comments: Math.floor(Math.random() * 100)
            }));
            postsMap.set(userId, userPosts);
            userPosts.forEach(post => {
                popularPostsHeap.insert(post);
                latestPostsDeque.addFirst(post);
            });
        });

        await Promise.all(postRequests);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};

router.get("/posts", (req, res) => {
    const type = req.query.type;
    if (type) {
        fetchUsersAndPosts();
    }
    if (type === "popular") {
        return res.json({ posts: popularPostsHeap.getTopPosts() });
    } else if (type === "latest") {
        return res.json({ posts: latestPostsDeque.getAll() });
    } else {
        return res.status(400).json({ error: "Invalid type. Use 'popular' or 'latest'." });
    }
});

module.exports = {
    rootRouter: router
};
