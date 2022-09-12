function listProcessor(arr) {
    const output = []
    const cmdObj = {

        add(string){
            output.push(string)
        },
        remove(string){
            while(output.includes(string)) {
                output.splice(output.indexOf(string),1);
            }
        },
        print(){
            console.log(output.join(','));
        }
    }
    arr.forEach(e => {
        const [cmd, input] = e.split(' ');
        cmdObj[cmd](input);
    })
}

listProcessor(['add hello', 'add again', 'remove hello', 'add again', 'print'])