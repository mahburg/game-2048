import React, { Component } from 'react';

import './Game.css'

import { checkMoves, rotateArrays, collapse, checkDir } from '../../utils';

class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            game: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]
            // game: [[null, 2, 4, 8], [16, 32, 64, 128], [null, 512, 1024, 2048], [4096, null, null, 2]]
        }
    }

    componentDidMount() {
        this.resetGame()
    }
    resetGame() {
        let r1 = (~~(Math.random() * 4))
        let r2 = (~~(Math.random() * 4))
        let c1 = (~~(Math.random() * 4))
        let c2 = (~~(Math.random() * 4))
        let v1 = (~~(Math.random() * 2)) ? 2 : 4;
        let v2 = (~~(Math.random() * 2)) ? 2 : 4;
        while (c2 === c1){
            c2 = (~~(Math.random() * 4) + 0)
        }
        let newGame = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]
        newGame[r1][c1] = v1;
        newGame[r2][c2] = v2;
        this.setState({ game: newGame });
    }

    move(event){
        let { key } = event;
        let tGame = this.state.game.slice();
        if(checkDir(tGame, key)){
            let moves = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']
            if (moves.includes(key)){
                switch (key){
                    case 'ArrowUp':
                        tGame = rotateArrays(tGame)
                        tGame = rotateArrays(tGame.map(r=>collapse(r)))
                        break;
                        case 'ArrowDown':
                        tGame = rotateArrays(tGame)
                        tGame = rotateArrays(tGame.map(r=>collapse(r.slice().reverse()).reverse()))
                        break;
                    case 'ArrowLeft':
                        tGame = tGame.map(r=>collapse(r))
                        break;
                        case 'ArrowRight':
                        tGame = tGame.map(r=>collapse(r.slice().reverse()).reverse())
                        break;
                    default:
                        break;
                }
                let empty = []
                for (let i = 0; i < tGame.length; i++){
                    for (let j = 0; j < tGame[i].length; j++){
                        if (!tGame[i][j]){
                            empty.push([i,j])
                        }
                    }
                }
                if (empty.length){
                    let next = empty[(~~(Math.random() * empty.length))];
                    let val = (~~(Math.random() * 2) + 0) ? 2 : 4;
                    tGame[next[0]][next[1]] = val;
                    this.setState({ game: tGame }, ()=>{
                        if(!checkMoves(tGame)){
                            alert('game over')
                        }
                    });
                } else {
                    if (!checkMoves(tGame)){
                        alert('game over')
                    }
                }
            }
        }
    }

    render(){
        let { game } = this.state;
        let board = game.map((row, i)=>row.map((tile, j)=><div className={`tile bg${tile}`} key={j} >{tile}</div>))
        return(
            <div>
                <br/>
                <div
                    className="grid"
                    onKeyDown={e=>this.move(e)}
                    tabIndex="0"
                >
                    {board}
                </div>
                <button onClick={e=>this.resetGame()} >Reset</button>
            </div>
        )
    }
}

export default Game;

