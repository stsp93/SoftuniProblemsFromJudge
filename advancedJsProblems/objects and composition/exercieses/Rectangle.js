function rectangle(width, height,color) {
    this.width = width
    this.height = height
    this.color = color[0].toUpperCase() + color.slice(1)
    this.calcArea = function () {
        return this.width * this.height;
    }
    return this
}
let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());
