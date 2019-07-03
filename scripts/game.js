console.log('Connected!')

// This is where I'll hold my game class and object

class Game {
    constructor() {
        board = [[]];
        this.renderBoard();
    }

    renderBoard() {
        $board.empty();
        for(let i = 1; i <= gridSize; i++){
            for(let j = 1; j <= gridSize; j++){
                let $div = `<div class="off" id="row${i}column${j}" style="width:${boardWidth/gridSize}px; height:${boardWidth/gridSize}px; border: 1px solid black;"></div>`;
                $board.append($div);
            }
        }
    }

}

