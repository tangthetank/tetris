//this is a changed code
const dbClient = require("./db.js")
let storage = {
    id: "stoTet",
    state: 0,
    score: 0,
    tiles: Array(200).fill(0),
    current: {
        type: 0,
        pos: 0,
        rot: 0
    },
    next:0
}
const getColumns = (curr) => {
    switch(curr.type) {
        case 0:
            return (rot % 2 == 0 ? 4:1)
        case 1:
            return (rot % 2 == 0 ? 3:2)
        case 2:
            return (rot % 2 == 0 ? 3:2)
        case 3:
            return (rot % 2 == 0 ? 3:2)
        case 4:
            return (rot % 2 == 0 ? 3:2)
        case 5:
            return (rot % 2 == 0 ? 3:2)
        case 6:
            return (rot % 2 == 0 ? 2:2)
    }
}

const dropBlock = (block,tiles) => {
    let id = tiles.reduce((a,b) => Math.max(a, b), 0) + 1
    let columns = getColumns(block)
    let row = 19
    let column = pos
    Array(1).fill(0).forEach((_) => {
        for(;row>=0; row++) {
            for(;column < pos+columns; column++) {
                if(tiles[10*row+column] != 0) {
                    return
                }
            }
        }
    })

    if(!(row == 0 && column == columns + pos - 1 && tiles[10*row+column] == 0)) {
        row++
    }
    Array(columns).fill(0).forEach((_, col) => {
        tiles[10*row+col+pos]=id
    })
}

const updateGameState = (tiles,score) => {
    for(let row = 0; row < 20; row++) {
        complete=true
        for(let column = 0; column < 10; column++) {
            if(tiles[column + 10 * row] == 0) {
                complete=false
                break
            }
        }
        if(complete) {
            score+=10
            for(let clearRow=row;clearRow<20;clearRow++){
                for(let column=0;column<10;column++){
                    if(clearRow==19){
                        tiles[10*clearRow+column]=0
                    }
                    else{
                        tiles[10*clearRow+column]=tiles[10*(clearRow+1)+column]
                    }
                }
            }
            row--
        }
    }
    return [tiles,score]
}
module.exports=async(req,res)=>{
    const client=await dbClient;
    const data=client.db().collection("data");
    if((await data.find({id:"stoTet"}).toArray()).length==0){
        data.insertOne(storage);
    }
    else{
        storage=await data.findOne({id:"stoTet"});
    }
    switch(req.query.type){
        case "getState":
            res.status(200).json([storage.score,storage.tiles,storage.current,storage.next])
        case "getScore":
            res.status(200).json([storage.score])
            break
        default:
            res.status(404).send()
    }
    data.updateOne({id:"stoTet"},{$set:storage});
}
