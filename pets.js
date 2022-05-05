const input = process.argv;
const fs = require('fs');

if (input.length < 3) {

    console.log('Usage: node pets.js [read | create | update | destroy]')
    // This needs an exit process with a non-zero code
};

readData();

createData();

updateData();

destroyData();

function readData() {

    if (input[2] === 'read' && input.length === 3) {

        fs.readFile('/Users/bobby/Desktop/mcsp-12/fs-pet-shop/pets.json', 'utf8', (err, data) => {

            if (err) {
                console.error(err);
                return;
              };

            let info = JSON.parse(data);
            console.log(info);

        });

    } else if (input[2] === 'read' && input.length > 3) {

        fs.readFile('/Users/bobby/Desktop/mcsp-12/fs-pet-shop/pets.json', 'utf8', (err, data) => {

            if (err) {
                console.error(err);
                return;
            };

            let info = JSON.parse(data);

            if(input[3] > info.length) {
                console.log('Usage: node pets.js read INDEX');
            };

            if(input[3] < 0) {
                console.log('Usage: node pets.js read INDEX');
            };
            
            console.log(info[input[3]]);
        });
    };
};

function createData () {

    if(input[2] === 'create' && input.length < 6){
        
        console.log('Usage: node pets.js create AGE KIND NAME');

    }else if(input[2] === 'create' && input.length === 6) {

        fs.readFile('/Users/bobby/Desktop/mcsp-12/fs-pet-shop/pets.json', 'utf8', (err, data) => {

            if (err) {
                console.error(err);
                return;
            };
            let info = JSON.parse(data);
        
            let content = {"age":`${input[3]}`, "kind":`${input[4]}`, "name":`${input[5]}`};
        
            info.push(content);
        
            let newFile = JSON.stringify(info);
        
            fs.writeFile('/Users/bobby/Desktop/mcsp-12/fs-pet-shop/pets.json', newFile, err => {

                if(err) {
                    console.error(err);
                };
            });
        });
    };
};

function updateData () {

    if (input[2] === 'update' && input.length < 7) {

        console.log('Usage: node pets.js update INDEX AGE KIND NAME');

    }else if (input[2] === 'update' && input.length === 7) {

        fs.readFile('/Users/bobby/Desktop/mcsp-12/fs-pet-shop/pets.json', 'utf8', (err, data) => {

            if (err) {
                console.error(err);
                return;
            };

            let info = JSON.parse(data);

            let content = {"age":`${input[4]}`, "kind":`${input[5]}`, "name":`${input[6]}`};

            info.splice(input[3], 1, content);

            let newFile = JSON.stringify(info);
        
            fs.writeFile('/Users/bobby/Desktop/mcsp-12/fs-pet-shop/pets.json', newFile, err => {

                if(err) {
                    console.error(err);
                };
            });
        });
    };
};

function destroyData () {
    if (input[2] === 'destroy' && input.length < 4) {

        console.log('Usage: node pets.js destroy INDEX');

    } else if (input[2] === 'destroy' && input.length === 4) {

        fs.readFile('/Users/bobby/Desktop/mcsp-12/fs-pet-shop/pets.json', 'utf8', (err, data) => {

            if (err) {
                console.error(err);
                return;
            };

            let info = JSON.parse(data);

            info.splice(input[3], 1)

            let newFile = JSON.stringify(info);
        
            fs.writeFile('/Users/bobby/Desktop/mcsp-12/fs-pet-shop/pets.json', newFile, err => {

                if(err) {
                    console.error(err);
                };
            });
        });
    };   
}