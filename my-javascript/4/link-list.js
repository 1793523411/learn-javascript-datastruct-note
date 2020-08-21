function defaultEquals(a, b) {
  return a === b;
}
class Node2 {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

class LinkList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }
  push(element) {
    const node2 = new Node2(element);
    let current;
    // this.head == null和 (this.head === undefined || head ===
    //     null) 等价， current.next != null 和 (current.next !==
    //     undefined && current.next !== null) 等价
    if (this.head == null) {
      this.head = node2;
    } else {
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node2;
    }
    this.count++;
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node2 = new Node2(element);
      if (index === 0) {
        const current = this.head;
        node2.next = current;
        this.head = node2;
      } else {
        const previous = this.getElementAt(index - 1);
        node2.next = previous.next;
        previous.next = node2;
      }
      this.count++;
      return true;
    }
    return false;
  }
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node2 = this.head;
      for (let i = 0; i < index && node2 !== null; i++) {
        node2 = node2.next;
      }
      return node2;
    }
    return undefined;
  }
  remove(element) {
    const index = this.indexOf(element);
    return this.remove.removeAt(index);
  }
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
      } else {
        let pervious;
        // for (let i = 0; i < index; i++) {
        //   pervious = current;
        //   current = current.next;
        // }
        // pervious.next = current.next;
        pervious = this.getElementAt(index - 1);
        current = pervious.next;
        pervious.next = current.next;
      }
      this.count--;
      return current.element;
    }
  }
  isEmpty() {
    return this.size === 0;
  }
  getHead() {
    return this.head;
  }
  toString() {
    if (this.head == null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      //   console.log(objString)
      current = current.next;
    }
    return objString;
  }
  size() {
    return this.count;
  }
}

const list = new LinkList();
list.push(15);
list.push(10);
list.push(14);
console.log(list);
console.log(list.size());
console.log(list.indexOf(15));
console.log(list.indexOf(14));
console.log(list.toString());

class DoublyNode2 extends Node2 {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

class DoublyLinkedList extends LinkList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode2(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          current.prev = node; //!!!
          this.head = node;
        }
      } else if (index === this.count) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }
      this.count++;
      return true;
    }
    return false;
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          this.head.prev = undefined;
        }
      } else if (index === this.count) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = undefined;
      } else {
        current = this.getElementAt(index);
        const previous = current.prev;
        previous.next = current.next;
        current.next.prev = previous;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
}

class circularLinkedList extends LinkList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }
  insert(element, index) {
    if (index >= 0 && index <= index.count) {
      const node = new Node2(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getElementAt(this.size());
          this.head = node;
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size());
          current.next = this.head.next;
          current = removed; //最后要返回被删除的元素
        }
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkList {
  constructor(equalsFn = defaultEquals, comparFn = defaultCompare) {
    super(equalsFn);
    this.comparFn = comparFn;
  }
  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }
    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element, pos);
  }
  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for (; i < this.size() && current; i++) {
      const comp = this.comparFn(element, current.element);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
}

class StackLinkList {
  constructor() {
    this.items = new DoublyLinkedList();
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty) {
      return undefined;
    }
    return this.items.removeAt(this.size() - 1);
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.getElementAt(this.size() - 1, element);
  }
  isEmpty(){
      return this.items.isEmpty()
  }
  size(){
      return this.items.size()
  }
  clear(){
      this.items.clear()
  }
  toString(){
      return this.items.toString()
  }
}
