class MaxHeap2 {
    constructor() {
        this.heap = [];
    }

    insert(post) {
        this.heap.push(post);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0 && this.heap[index].comments > this.heap[Math.floor((index - 1) / 2)].comments) {
            [this.heap[index], this.heap[Math.floor((index - 1) / 2)]] =
                [this.heap[Math.floor((index - 1) / 2)], this.heap[index]];
            index = Math.floor((index - 1) / 2);
        }
    }

    getTopPosts() {
        if (this.heap.length === 0) return [];

        let maxComments = this.heap[0].comments;
        return this.heap.filter(post => post.comments === maxComments);
    }
}

class Deque {
    constructor(size = 5) {
        this.queue = [];
        this.size = size;
    }

    addFirst(post) {
        this.queue.unshift(post);
        if (this.queue.length > this.size) this.queue.pop();
    }

    getAll() {
        return [...this.queue]; // Return latest posts in order
    }
}

module.exports={MaxHeap2,Deque};