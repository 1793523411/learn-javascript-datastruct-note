// const  Queue = require('./queue')
class Queue {
    constructor() {
      this.count = 0;
      this.lowestCount = 0;
      this.items = {};
    }
    enqueue(element) {
      this.items[this.count] = element;
      this.count++;
    }
    dequeue() {
      if (this.isEmpty()) {
        return undefined;
      }
      const result = this.items[this.lowestCount];
      delete this.items[this.lowestCount];
      this.lowestCount++;
      return result;
    }
    peek() {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.items[this.lowestCount];
    }
    isEmpty() {
      // return this.count - this.lowestCount === 0
      return this.size() === 0;
    }
    size() {
      return this.count - this.lowestCount;
    }
    clear() {
      this.items = {};
      this.count = 0;
      this.lowestCount = 0;
    }
    toString() {
      if (this.isEmpty()) {
        return "";
      }
      let objString = `${this.items[this.lowestCount]}`;
      for (let i = this.lowestCount + 1; i < this.count; i++) {
        objString = `${objString},${this.items[i]}`;
      }
      return objString;
    }
  }

function hoPotato(elementsList, num){
    console.log(elementsList)
    const queue = new Queue()
    const elimitatedList = []

    for(let i = 0; i< elementsList.length; i++){
        queue.enqueue(elementsList[i])
    }
    console.log(queue.size())
    while(queue.size() > 1){
        for(let i = 0; i< num;i++){
            queue.enqueue(queue.dequeue())
            // console.log(queue.dequeue())
        }
        elimitatedList.push(queue.dequeue())
    }
    console.log(elementsList)
    console.log(elimitatedList)
    return {
        eliminated: elimitatedList,
        winner: queue.dequeue()
    }
}

const names = ['John','Jack','Camila','Ingrid','Carl']
const result = hoPotato(names,7)
console.log(result)
result.eliminated.forEach(name => {
    console.log(`${name}在击鼓传花中淘汰`)
})

console.log(`胜利者：${result.winner}`)