function cars(input) {
    const cars = {};

    const funcObj = {
        create(name, _, parentName) {
            if (parentName) {
                cars[name] = { 'from': parentName }
            } else {
                cars[name] = {};
            }
        },
        set(name, key, value) {
            cars[name][key] = value;
        },
        print(name) {
            Object.entries(cars).filter(c => c[1].hasOwnProperty('from')).forEach(c => {
                Object.entries(cars[c[1].from])
                    .forEach(([key, value]) =>
                        c[1][key] = value
                    )
            });


            console.log(Object.entries(cars[name]).filter(c => c[0] !== 'from').map(e => `${e[0]}:${e[1]}`).join(','));
        }

    }
    input.forEach(c => {
        const [cmd, ...tokens] = c.split(' ');
        funcObj[cmd](...tokens);
    })

}
cars(['create c1', 'create c2 inherit c1', 'set c1 color red', 'set c2 model new', 'print c1', 'print c2']
)