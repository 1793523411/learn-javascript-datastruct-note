class Set {
  constructor() {
    this.items = {};
  }
  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }
  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }
  has(element) {
    //   return element in this.items
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }
  clear() {
    this.items = {};
  }
  size() {
    return Object.keys(this.items).length;
  }
  values() {
    return Object.values(this.items);
  }
  valuesLegacy() {
    let values = [];
    for (let key in this.items) {
      // {1}
      if (this.items.hasOwnProperty(key)) {
        values.push(key); // {2}
      }
    }
    return values;
  }
  sizeLegacy() {
    let count = 0;
    for (const key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        count++;
      }
    }
    return count;
  }
  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach((value) => unionSet.add(value));
    otherSet.values().forEach((value) => unionSet.add(value));
    return unionSet;
  }
  //   intersection(otherSet) {
  //     const intersectionSet = new Set();
  //     const values = this.values();
  //     for (let i = 0; i < values.length; i++) {
  //       if (otherSet.has(values[i])) {
  //         intersectionSet.add(values[i]);
  //       }
  //     }
  //     return intersectionSet;
  //   }
  /*改进*/

  intersection(otherSet) {
    const intersectionSet = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    let bigger = values;
    let smallerSet = otherValues;
    if (otherValues.length - values.length > 0) {
      bigger = otherValues;
      smallerSet = values;
    }
    smallerSet.forEach((value) => {
      if (bigger.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach((value) => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }
    let isSubset = true;
    this.values().every((value) => {
      if (!otherSet.has(value)) {
        isSubset = false;
        return false;
      }
      return true;
    });
    return isSubset;
  }
  //   values() {}
}
const set = new Set();
set.add(1);
set.add(2);
set.add(200);
console.log(set.items);
console.log(set.size());
console.log(set.sizeLegacy());
console.log(set.values());
console.log(set.valuesLegacy());
console.log(set.has(1));
console.log(set.delete(1));
console.log(set.has(1));
const set2 = new Set();
set2.add(9);
set2.add(8);
set2.add(7);
set2.add(2);

const unionAB = set.union(set2);
console.log(unionAB);
const interestion12 = set.intersection(set2);
console.log(interestion12);
const difference = set.difference(set2);
console.log(difference);

const setA = new Set();
setA.add(1);
setA.add(2);
const setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
const setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.isSubsetOf(setB));
console.log(setA.isSubsetOf(setC));