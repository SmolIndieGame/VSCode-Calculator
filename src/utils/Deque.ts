class Deque<E> implements RelativeIndexable<E>, Iterable<E> {
    private static readonly CAPACITY = 1 << 50;

    private data: { [index: number]: E; };
    private begin: number;
    private end: number;
    private _size: number;

    public get size(): number { return this._size; }

    public constructor() {
        this.data = {};
        this.begin = 1;
        this.end = 0;
        this._size = 0;
    }

    private *iterator() {
        for (let i = 0; i < this.size; i++) {
            yield this.data[(i + this.begin) % Deque.CAPACITY];
        }
    }
    public [Symbol.iterator](): IterableIterator<E> {
        return this.iterator();
    }

    public at(idx: number) {
        if (idx < 0 || idx >= this.size) { return; }
        return this.data[(idx + this.begin) % Deque.CAPACITY];
    }

    public pushFront(value: E): void {
        this._size++;
        this.begin = (Deque.CAPACITY + this.begin - 1) % Deque.CAPACITY;
        this.data[this.begin] = value;
    }
    public popFront(): E | undefined {
        if (this.size === 0) { return; }
        let value = this.front();
        this._size--;
        delete this.data[this.begin];
        this.begin = (this.begin + 1) % Deque.CAPACITY;
        return value;
    }
    public front(): E | undefined {
        if (this.size === 0) { return; }
        return this.data[this.begin];
    }

    public pushBack(value: E): void {
        this._size++;
        this.end = (this.end + 1) % Deque.CAPACITY;
        this.data[this.end] = value;
    }
    public popBack(): E | undefined {
        if (this.size === 0) { return; }
        let value = this.front();
        this._size--;
        this.end = (Deque.CAPACITY + this.end - 1) % Deque.CAPACITY;
        delete this.data[this.end];
        return value;
    }
    public back(): E | undefined {
        if (this.size === 0) { return; }
        return this.data[this.end];
    }
}