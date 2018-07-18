export function collapse(arr) {
    let temp = arr.filter(c => c);
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] === temp[i + 1]) {
            temp[i] = temp[i] * 2;
            temp[i + 1] = null;
            i++;
        }
    }
    temp = temp.filter(c => c);
    while (temp.length < arr.length) {
        temp.push(null);
    }
    return temp;
}

export function rotateArrays(arr) {
    let len = arr.length;
    let out = [[],[],[],[]];
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            out[i][j] = arr[j][i]
        }
    }
    return out
}
export function checkMoves(arr) {
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr[i].length; j++){
            if (!arr[i][j]){
                return true;
            }
            let a = (
                arr[i][j] === arr[i][j + 1] ||
                arr[i][j] === arr[i][j - 1]
            )
            let b = arr[i - 1] && (arr[i][j] === arr[i - 1][j])
            let c = arr[i + 1] && (arr[i][j] === arr[i + 1][j])
            if(a || b || c){
                return true;
            }
        }
    }
    console.log(arr)
    return false;
}

export function checkDir(game, dir) {
    let temp = game.map(sub=>sub.slice());
    switch (dir) {
        case 'ArrowUp':
            temp = rotateArrays( temp )
            break;
        case 'ArrowDown':
            temp = rotateArrays( temp ).map(s=>s.reverse())
            break;
        case 'ArrowRight':
            temp = temp.map(s=>s.reverse())
            break;
        default:
            break;
    }
    for (let i = 0; i < temp.length; i++){
        let space = false;
        for (let j = 0; j < temp[i].length; j++){
            let cell = temp[i][j]
            if (cell){
                if(
                    space ||
                    (temp[i][j - 1] === cell) ||
                    (temp[i][j + 1] === cell)
                ){
                    return true;
                }
            } else {
                space = true;
            }
        }
    }
    return false;
}

// let test = [
//     [1,2,3,4],
//     [1,2,3,4],
//     [1,2,3,4],
//     [1,2,3,0],
// ]

// console.log(checkDir(test, 'ArrowUp'))
// console.log(checkDir(test, 'ArrowDown'))
// console.log(checkDir(test, 'ArrowLeft'))
// console.log(checkDir(test, 'ArrowRight'))