console.log("Up and running!");

// ---------- CONSTANTS------------- //
const boardWidth = 400; // Board is 400px
const gridSize = 20; // 10x10 grid
const maxSelection = 50;
let birthCount = 0;
let deathCount = 0;
let cellsSelected = 0;

// ---------- STATE VARIABLES ------------- //

class Game {
    constructor() {
        this.board = [[]];
        this.renderBoard();
        this.readBoard();
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

// ---------- FUNCTIONS ------------- //

const renderBoard = () => {
    $board.empty();
    for(let i = 1; i <= gridSize; i++){
        for(let j = 1; j <= gridSize; j++){
            let $div = `<div class="off" id="row${i}column${j}" style="width:${boardWidth/gridSize}px; height:${boardWidth/gridSize}px; border: 1px solid black;"></div>`;
            $board.append($div);
        }
    }
}


// ---------- CACHED DOM ELEMENTS------------- //

const $board = $('.board');
const $startButton = $('#start');


// ---------- EVENT LISTENERS ------------- //

$startButton.on('click', () => {console.log("CLICKED")});

$board.on('click', (event) => {
    if ($(event.target).hasClass("on")) {
        $(event.target).removeClass("on");
        $(event.target).addClass("off");
        cellsSelected -= 1;
    } else if ($(event.target).hasClass("off")) {
        $(event.target).removeClass("off");
        $(event.target).addClass("on");
        cellsSelected += 1;
    }
    if ($startButton.hasClass("buttonOn") && cellsSelected > maxSelection){
        $startButton.removeClass("buttonOn");
        $startButton.addClass("buttonOff");
        $startButton.off('click')
    } else if ($startButton.hasClass("buttonOff") && cellsSelected <= maxSelection){
        $startButton.removeClass("buttonOff");
        $startButton.addClass("buttonOn");
        $startButton.on('click', () => {console.log("CLICKED")});
    }
});


// Begin logic
const game = new Game();