
// let myname = 'Packt';
// myname = 10;
// console.log(myname)
var MyObjects = /** @class */ (function () {
    function MyObjects() {
    }
    MyObjects.prototype.compareTo = function (b) {
        if (this.age === b.age) {
            return 0;
        }
        return this.age > b.age ? 1 : -1;
    };
    return MyObjects;
}());
