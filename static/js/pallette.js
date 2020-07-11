let PalletteLB3 = [];

let R = 15
let G = 255
let B = 157
let X = 50

for (var i = 0; i <= X; i++) {
    R = R + 10 
    B = B + 5
    RGB = ("rgb("+R+", 255, "+B+")")
    PalletteLB3.push(RGB)
 }

 console.log(PalletteLB3);

