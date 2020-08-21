const { reverseCompare } = require("../../Learning-JavaScript-Data-Structures-and-Algorithms-Third-Edition/LearningJavaScriptDataStructuresandAlgorithmsThirdEdition_Code/src/js/util");

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, a, b) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

// const swap = (array,a,b) => [array[a],array[b]] = [array[b],array[a]]
// 有一个公开的问题表示解构操作比正常的赋值操作性能更差

class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  getRightIndex(index) {
    return 2 * index + 2;
  }
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }
  insert(value) {
    if (value != null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false
  }
  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (
      index>0  &&
      this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN
    ) {
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
      // this.siftUp(parent)
    }
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    // const removedValue = this.heap.shift();
    // const removedValue = this.heap.pop();
    const removedValue = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.siftDown(0);
    return removedValue;
  }
  //向下是递归，向上是交换，不保证整体顺序
  siftDown(index) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN
    ) {
      element = left;
    }
    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN
    ) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }
  heapify(array){
    if(array){
      this.heap = array
    }
    const maxIndex = Math.floor(this.size()/2) - 1
    for(let i = 0;i<maxIndex;i++){
      this.siftDown(i)
    }
    return this.heap
  }
}

//! 堆创建似乎有误,不不不，没有，是我理解错了，顺序输出堆，不是有序的

let heap = new MinHeap();
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(1);
console.log(heap)
// console.log("Heap size: ", heap.size()); // 5
// console.log("Heap is empty: ", heap.isEmpty()); // false
// console.log("Heap min value: ", heap.findMinimum()); // 1

heap = new MinHeap();
for (let i = 1; i < 10; i++) {
// heap.insert(i);
let a = Math.ceil(Math.random()*100)
console.log(a)
heap.insert(a);

}
console.log(heap)
console.log('Extract minimum: ', heap.extract()); // 1
console.log('Extract minimum: ', heap.extract()); // 1
console.log('Extract minimum: ', heap.extract()); // 1
console.log('Extract minimum: ', heap.extract()); // 1
console.log(heap)


class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare){
    super(compareFn)
    this.compareFn = reverseCompare(compareFn)
  }
}
//小技巧
function reverseCompare(compareFn){
  return (a,b) => compareFn(b,a)
}

// *堆排序
//堆排序算法不是一个稳定的排序算法，也就是说如果数组没有排好序，可能会得到不一样的结果
function heapSort(array, compareFn = defaultCompare){
  let heapSize = array.length
  buildMaxHeap(array,compareFn)
  while(heapSize > 1){
    swap(array, 0 ,--heapSize)
    heapify(array, 0 , heapSize,compareFn)
  }
  return array
}

function buildMaxHeap(array, compareFn){
  //从下往上构建
  for(let i = Math.floor(array.length/2);i>=0;i-=1){
    heapify(array, i ,array.length,compareFn)
  }
  return array
}