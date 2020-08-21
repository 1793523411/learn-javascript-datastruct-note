const map = new Map()
map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');
console.log(map.has('Gandalf')); // true
console.log(map.size); // 3
console.log(map.keys()); // 输出{"Gandalf", "John", "Tyrion"}
console.log(map.values()); // 输出{"gandalf@email.com", "johnsnow@email.com","tyrion@email.com"}
console.log(map.get('Tyrion')); // tyrion@email.com
console.log(map)

console.log('---------------')

const map2 = new WeakMap()
const obj1 = {name: 'AAA'}
const obj2 = {name: 'BBB'}
const obj3 = {name: 'CCC'}
const obj4 = {name: 'DDD'}
map2.set(obj1, 'gandalf@email.com'); // {2}
map2.set(obj2, 'johnsnow@email.com');
map2.set(obj3, 'tyrion@email.com');
map2.set(obj4, '~~~~tyrion@email.com');
console.log(map2.has(obj1))
console.log(map2.get(obj3))
map2.delete(obj2)
console.log(map2)