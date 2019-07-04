console.log("Up and running!");

// ---------- CONSTANTS------------- //

// ---------- STATE VARIABLES ------------- //

class Game {
    constructor() {
        this.boardWidth = 400; // Board is 400px
        this.gridSize = 20; // 10x10 grid
        this.$body = $('.body')
        this.$board = $('.board');
        this.$bottom = $('.bottom')
        this.$startButton = $('#start');
        this.generations = 100;
        this.$generationCount = $('#generation');
        this.$birthCount = $('#births')
        this.$deathCount = $('#deaths')
        this.generation = 0;
        this.birthCount = 0;
        this.deathCount = 0;
        this.exitCall = false;
        this.board = new Array(this.gridSize).fill(0).map(() => new Array(this.gridSize).fill(0));
        this.renderBoard();
        this.readBoard();
        this.addEventListeners();
    }

    addEventListeners() {
        this.$startButton.on('click', () => {
            this.$startButton.remove();
            this.playGame(this.generations);
        });
        
        this.$board.on('click', (event) => {
            if ($(event.target).hasClass("on")) {
                $(event.target).removeClass("on");
                $(event.target).addClass("off");
                cellsSelected -= 1;
            } else if ($(event.target).hasClass("off")) {
                $(event.target).removeClass("off");
                $(event.target).addClass("on");
                cellsSelected += 1;
            }
            if (this.$startButton.hasClass("buttonOn") && cellsSelected > maxSelection){
                this.$startButton.removeClass("buttonOn");
                this.$startButton.addClass("buttonOff");
                this.$startButton.off('click')
            } else if (this.$startButton.hasClass("buttonOff") && cellsSelected <= maxSelection){
                this.$startButton.removeClass("buttonOff");
                this.$startButton.addClass("buttonOn");
                this.$startButton.on('click', () => {
                    this.$startButton.remove();
                    this.playGame(this.generations);
                });
            }
        });
    }

    // Renders the board at the beginning of the game
    renderBoard() {
        this.$board.empty();
        for(let i = 0; i < this.gridSize; i++){
            for(let j = 0; j < this.gridSize; j++){
                let $div = `<div class="off" id="row${i}column${j}" style="width:${this.boardWidth/this.gridSize}px; height:${this.boardWidth/this.gridSize}px; border: 1px solid black;"></div>`;
                this.$board.append($div);
            }
        }
    }


    // Loops through the HTML board elements and looks for the classes 'on' or 'off'. Updates the this.board matrix appropriately
    readBoard() {
        for(let i = 0; i < this.gridSize; i++) {
            for(let j = 0; j < this.gridSize; j++) {
                let $cell = $(`#row${i}column${j}`);
                if ($cell.hasClass('on')) {
                    this.board[i][j] = 1;
                } else if ($cell.hasClass('off')) {
                    this.board[i][j] = 0;
                }
            }
        }
    }

    // Computes the number of neighbors for any cell on the board
    computeNeighbors(i,j) {
        let sumNeighbors = 0;
        for(let x = i - 1; x <= i + 1; x++){
            for(let y = j - 1; y <= j + 1; y++){
                if((x !== i) || (y !== j)){
                    let tempX = x;
                    let tempY = y;
                    if (x < 0) {
                        tempX = this.gridSize-1;
                    } else if(x > this.gridSize-1){
                        tempX = 0;
                    }
                    if (y < 0) {
                        tempY = this.gridSize-1;
                    } else if(y > this.gridSize-1){
                        tempY = 0;
                    }
                    sumNeighbors += this.board[tempX][tempY];
                }
            }
        }
        return sumNeighbors;
    }

    // Renders the next generation of cells based on the current state of this.board, then updates this.board by calling this.readBoard()
    computeNextGen() {
        for(let i = 0; i < this.gridSize; i++) {
            for(let j = 0; j < this.gridSize; j++) {
                let sumNeighbors = this.computeNeighbors(i,j);
                let $cell = $(`#row${i}column${j}`);
                if ($cell.hasClass('on') && (sumNeighbors < 2 || sumNeighbors > 3)){
                    $cell.removeClass('on');
                    $cell.addClass('off');
                    this.deathCount += 1;
                } else if ($cell.hasClass('off') && sumNeighbors === 3){
                    $cell.removeClass('off');
                    $cell.addClass('on');
                    this.birthCount += 1;
                }
            }
        }
        this.generation += 1;
    }

    playGame(generations) {
        const timer = setInterval(() => {
            let currentBirths = this.birthCount;
            let currentDeaths = this.deathCount;
            this.readBoard();
            this.computeNextGen();
            this.$generationCount.text(this.generation);
            this.$birthCount.text(this.birthCount);
            this.$deathCount.text(this.deathCount);
            if((currentBirths === this.birthCount) && (currentDeaths === this.deathCount)){
                this.exitCall = true;
            }
            if (this.generation >= generations || this.exitCall) {
                clearInterval(timer);
                this.displayEndGame();
            }
        }, 250);
    }

    displayEndGame() {
        this.$board.remove();
        this.$bottom.remove();
        let endString = '';
        if(this.generation === this.generations){
            endString = `Congratulations, you won!!!`;
        }
        else {
            endString = `Sorry, you lost...`;
        }
        const $endState = $(`
            <div class="endStatus">
                <h3>${endString}</h3>
                <div>Generations: <span id="generation">${this.generation}</span></div>
                <div>Births: <span id="births">${this.birthCount}</span></div>
                <div>Deaths: <span id="deaths">${this.deathCount}</span></div>
                <button id="resetButton" class="btn btn-primary" type="button">Play Again</button>
            </div>
        `);
        this.$body.append($endState);
        
        $('#resetButton').on('click', () => {
            $('.endStatus').remove();
            this.$body.append($(`
            <div class="board container"></div>
            <div class="bottom container">
                <button id="start" class="btn btn-primary buttonOn" type="button">Start</button>
                <div>Generation: <span id="generation">0</span></div>
                <div>Births: <span id="births">0</span></div>
                <div>Deaths: <span id="deaths">0</span></div>
            </div>`));
            game = new Game();
        })
    }
}

// Begin logic
let game = new Game();