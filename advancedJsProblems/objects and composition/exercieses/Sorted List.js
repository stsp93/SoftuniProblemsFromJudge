function createSortedList() {
    const list = [];
    let size = 0;
    function sort(list) {
        list.sort((a,b) => a - b);
        return list;
    };
    this.add = function(num) {
        this.list.push(+num);
        sort(this.list);
        this.size++;
    };
    this.remove = function(index) {
        if(index < 0 || index >= this.size) return;
        this.list.splice(index, 1);
        this.size--;
    };
    this.get = function(index) {
        if(index < 0 || index >= this.size) return;

        return this.list[index]
    };
    return {list, add, remove, get, size}
}

let list = createSortedList();
console.log(list);
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(4));
console.log(list.size);
