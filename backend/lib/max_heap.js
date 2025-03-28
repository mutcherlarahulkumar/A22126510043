class MaxHeap {
    constructor(k = 5) {
        this.heap = [];
        this.k = k;
    }

    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    leftChild(index) {
        return 2 * index + 1;
    }

    rightChild(index) {
        return 2 * index + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(user) {
        if (this.heap.length < this.k) {
            this.heap.push(user);
            this.heapifyUp();
        } else {
            const minUser = this.heap.reduce((min, current) => min.postCount < current.postCount ? min : current);
            if (user.postCount > minUser.postCount) {
                const minIndex = this.heap.indexOf(minUser);
                this.heap[minIndex] = user;
                this.heapifyDown(minIndex);
            }
        }
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0 && this.heap[this.parent(index)].postCount < this.heap[index].postCount) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    heapifyDown(index) {
        let largest = index;
        const left = this.leftChild(index);
        const right = this.rightChild(index);

        if (left < this.heap.length && this.heap[left].postCount > this.heap[largest].postCount) {
            largest = left;
        }
        if (right < this.heap.length && this.heap[right].postCount > this.heap[largest].postCount) {
            largest = right;
        }
        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }

    getTopUsers() {
        return [...this.heap].sort((a, b) => b.postCount - a.postCount);
    }
}

module.exports = MaxHeap;