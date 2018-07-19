import React, { Component } from 'react';

import './Game.css'

import { checkMoves, rotateArrays, collapse, checkDir } from '../../utils';

class Game extends Component{
    constructor(props){
        super(props);
        this.game = React.createRef();
        this.state = {
            game: [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]],
            undo: [],
            score: 0,
            hiScore: 0
            // game: [[null, 2, 4, 8], [16, 32, 64, 128], [null, 512, 1024, 2048], [4096, null, null, 2]]
        }
    }

    componentDidMount() {
        let hiScore = localStorage.getItem('hiScore')
        if (hiScore){
            this.setState({ hiScore });
        } else {
            localStorage.setItem('hiScore', 0);
        }
        this.resetGame()
        this.setFocus()
    }
    setFocus(){
        this.game.current.focus()
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
        this.setFocus()
    }

    undo(){
        this.setState({ game: this.state.undo, undo: [] });
        this.setFocus()
    }

    move(event){
        let { key } = event;
        let newScore = 0;
        let tGame = this.state.game.slice();
        let undo = this.state.game.slice();

        if(checkDir(tGame, key)){
            let moves = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']
            if (moves.includes(key)){
                switch (key){
                    case 'ArrowUp':
                        tGame = rotateArrays(tGame)
                        tGame = rotateArrays(tGame.map(r=>{
                            let {gameState, score } = collapse(r)
                            newScore += score;
                            return gameState;
                        }))
                        break;
                        case 'ArrowDown':
                        tGame = rotateArrays(tGame)
                        // tGame = rotateArrays(tGame.map(r=>collapse(r.slice().reverse()).reverse()))
                        tGame = rotateArrays(tGame.map(r=>{
                            let {gameState, score } = collapse(r.slice().reverse())
                            newScore += score;
                            return gameState.reverse();
                        }))
                        break;
                    case 'ArrowLeft':
                        tGame = tGame.map(r=>{
                            let {gameState, score } = collapse(r)
                            newScore += score;
                            return gameState;
                        })
                        break;
                        case 'ArrowRight':
                        // tGame = tGame.map(r=>collapse(r.slice().reverse()).reverse())
                        tGame = tGame.map(r=>{
                            let {gameState, score } = collapse(r.slice().reverse())
                            newScore += score;
                            return gameState.reverse();
                        })
                        break;
                    default:
                        break;
                }
                let newTotal = newScore + this.state.score;
                if(newScore){
                    this.setState({ score: newTotal });
                }
                if (newTotal > this.state.hiScore){
                    localStorage.setItem('hiScore', newTotal)
                    this.setState({ hiScore: newTotal });
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
                    this.setState({ game: tGame, undo }, ()=>{
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
        this.setFocus()
    }

    resetHighScore(){
        localStorage.setItem('hiScore', 0);
        this.setState({ hiScore: 0 });
        this.setFocus()
    }

    render(){
        let { game, score, hiScore } = this.state;
        let board = game.map((row, i)=>row.map((tile, j)=><div className={`tile bg${tile}`} key={j} >{tile}</div>))
        return(
            <div className="game-container" >
                <div className="game-left">
                    <button className="reset" onClick={e=>this.resetGame()} >Reset</button>
                    <button className="undo" onClick={e=>this.undo()} disabled={!this.state.undo.length} >Undo</button>
                </div>
                <div
                    className="grid"
                    onKeyDown={e=>this.move(e)}
                    tabIndex="0"
                    ref={this.game}
                >
                    {board}
                </div>
                <div className="game-right">
                    <h2>Score: {score}</h2>
                    <h3>High Score: {hiScore}</h3>
                    <button onClick={e=>this.resetHighScore()} >Reset High Score</button>
                </div>
            </div>
        )
    }
}

export default Game;

