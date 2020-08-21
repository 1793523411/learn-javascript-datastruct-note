var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const friends: (name:string, age:number)[];
var friends = [
    { name: 'John', age: 30 },
    { name: 'Aha', age: 20 },
    { name: 'Chris', age: 25 },
];
function comparePerson(a, b) {
    if (a.age > b.age) {
        return 1;
    }
    if (a.age < b.age) {
        return -1;
    }
    return 0;
}
friends.sort(comparePerson);
console.log(friends);
