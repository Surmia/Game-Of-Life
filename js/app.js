document.addEventListener('DOMContentLoaded', function () {

    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.cells = [];
    }

    var inputWidth = document.querySelector('.input-width');
    var inputHeight = document.querySelector('.input-height');

    GameOfLife.prototype.board = document.getElementById('board');

    GameOfLife.prototype.createBoard = function () {
        this.board.style.width = this.width * 10 + 'px';
        this.board.style.height = this.height * 10 + 'px';
        var numberOfFields = this.width * this.height;
        for (var i=0; i<numberOfFields; i++) {
            var field = document.createElement('div');
            this.board.appendChild(field);
            this.cells.push(field);
        }
        for (var i=0; i<this.cells.length; i++) {
            this.cells[i].addEventListener('click', function () {
                this.classList.toggle('live');
            })
        }
    };

    GameOfLife.prototype.getCell = function (x, y) {
         var index = x + y * this.width;
         return this.cells[index]; //lewy górny róg to x=0 i y=0
    };

    /*GameOfLife.prototype.setCellState = function (x, y, state) {
        if (state === 'live') {
            this.getCell(x, y).classList.add('live');
        }
        if (state !== 'live') {
            this.getCell(x, y).classList.remove('live');
        }
    };

    GameOfLife.prototype.firstGlider = function () {
        this.setCellState(6,6, 'live');
        this.setCellState(6,7, 'live');
        this.setCellState(6,5, 'live');
        this.setCellState(5,6, 'live');
        this.setCellState(7,6, 'live');
    };*/

    GameOfLife.prototype.computeCellNextState = function(x, y) {
        var counter = 0;

        if (x-1 >= 0 && y-1 >= 0) {
            if (this.getCell(x-1, y-1).className === 'live') { //1
                counter++;
            }
        }
        if (y-1 >= 0) {
            if (this.getCell(x, y-1).className === 'live') { //2
                counter++;
            }
        }
        if (x+1 < this.height && y-1 >= 0) {
            if (this.getCell(x+1, y-1).className === 'live') { //3
                counter++;
            }
        }
        if (x-1 >= 0) {
            if (this.getCell(x-1, y).className === 'live') { //4
                counter++;
            }
        }
        if (x+1 < this.height) {
            if (this.getCell(x+1, y).className === 'live') { //5
                counter++;
            }
        }
        if (x-1 >= 0 && y+1 < this.width) {
            if (this.getCell(x-1, y+1).className === 'live') { //6
                counter++;
            }
        }
        if (y+1 < this.width) {
            if (this.getCell(x, y+1).className === 'live') { //7
                counter++;
            }
        }
        if (x+1 < this.height && y+1 < this.width) {
            if (this.getCell(x+1, y+1).className === 'live') { //8
                counter++;
            }
        }

        if (this.getCell(x, y).className === 'live') {
            if (counter < 2 || counter > 3) {
                return 0;
            }
            else {
                return 1;
            }
        }
        if (this.getCell(x, y).className !== 'live') {
            if (counter === 3) {
                return 1;
            }
            else {
                return 0;
            }
        }
    };

    GameOfLife.prototype.computeNextGeneration = function () {
        var nextGeneration = [];
        for (var i=0; i<this.width; i++) {
            for (var j=0; j<this.height; j++) {
                nextGeneration.push(this.computeCellNextState(i, j));
            }
        }
        return nextGeneration;
    };

    GameOfLife.prototype.printNextGeneration = function () {
        var nextGenerationArray = this.computeNextGeneration();
        for (var i=0; i<this.cells.length; i++) {
            if (nextGenerationArray[i] === 1) {
                this.cells[i].classList.add('live');
            }
            else {
                this.cells[i].classList.remove('live');
            }
        }
    };

    document.querySelector('.generate').addEventListener('click', function () {
        var game = new GameOfLife(inputWidth.value, inputHeight.value);
        game.createBoard();

        document.querySelector('#play').addEventListener('click', function () {
            var interval = setInterval(function () {
                game.printNextGeneration();
            }, 1000);
            document.querySelector('#pause').addEventListener('click', function () {
                clearInterval(interval);
            });
        });
    });




});