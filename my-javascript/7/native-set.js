const set = new Set()
set.add(1)
console.log(set.values())
console.log(set.has(1))
console.log(set.size)


const union = (setA,setB) => {
    const unionAb = new Set()
    setA.forEach(value => unionAb.add(value))
    setB.forEach(value => unionAb.add(value))
    return unionAb
}

const intersection = (setA,setB) => {
    const intersectionSet = new Set()
    setA.forEach(value => {
        if(setB.has(value)){
            intersectionSet.add(value)
        }
    })
    return intersectionSet
}

const difference = (setA,setB) => {
    const differenceSet = new Set()
    setA.forEach(value => {
        if(!setB.has(value)) {
            differenceSet.add(value)
        }
    })
    return differenceSet
}

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

console.log(union(setA,setB))
console.log(intersection(setA,setB))
console.log(difference(setA,setB))

console.log(new Set([...setA, ...setB]))
console.log(new Set([...setA].filter(x => setB.has(x))))
console.log(new Set([...setA].filter(x => !setB.has(x))))