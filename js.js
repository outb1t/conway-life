window.onload = function()
{
    var canvas = document.getElementById('field');
    var game = new Game(canvas);
    var btn = document.getElementById('nextgen');
    btn.onclick = function(){
        game.nextGen();
    };
    game.start();
};

function Point(x, y) {
    return {x:x, y:y};
}

function Game(canvas)
{
    var cellSize = 10;
    var gridSizeX = 5;
    var gridSizeY = 5;
    var grid = [];

    canvas.width = gridSizeX * cellSize;
    canvas.height = gridSizeY * cellSize;
    var context = canvas.getContext('2d');

    this.start = function()
    {
        generateGrid();
        drawGrid();
        nextGeneration();
        /*setInterval(nextGeneration, 300);*/
    };

    this.nextGen = function(){
        nextGeneration();
    };

    function nextGeneration() {
        var nextGeneration = [];
        for(var i = 0; i < grid.length; i++) {
            nextGeneration[i] = [];
            for(var j = 0; j < grid[i].length; j++) {
                nextGeneration[i][j] = isAlive(new Point(j, i));
            }
        }
        grid = nextGeneration;
        drawGrid();
    }

    function isAlive(point) {
        var neighbors = getNeighbors(point);
        var liveNeighborsNumber = 0;
        for(var i in neighbors) {
            var p = neighbors[i];
            if(grid[p.y][p.x]) {
                liveNeighborsNumber++;
            }
        }
        console.log(liveNeighborsNumber);
        if(grid[p.y][p.x] == false && liveNeighborsNumber == 3) {
            return true;
        }
        if(grid[p.y][p.x] == true) {
            return liveNeighborsNumber == 2 || liveNeighborsNumber == 3;
        }
    }

    function generateGrid()
    {
        for(var i = 0; i < gridSizeY; i++) {
            grid[i] = [];
            for(var j = 0; j < gridSizeX; j++) {
                grid[i][j] = Math.random() >= 0.5;
            }
        }
    }

    function drawGrid()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length; j++) {
                if(grid[i][j]) {
                    context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                }
            }
        }
    }

    function getNeighbors(point) {
        var neighbors =  [
            new Point(point.x - 1, point.y - 1),
            new Point(point.x,     point.y - 1),
            new Point(point.x + 1, point.y - 1),
            new Point(point.x - 1, point.y),
            new Point(point.x + 1, point.y),
            new Point(point.x - 1, point.y + 1),
            new Point(point.x,     point.y + 1),
            new Point(point.x + 1, point.y + 1)
        ];

        for(var i in neighbors) {
            var p = neighbors[i];
            if(p.y >= gridSizeY) {
                neighbors[i].y = 0;
            }
            if(p.y < 0) {
                neighbors[i].y = gridSizeY - 1;
            }
            if(p.x >= gridSizeX) {
                neighbors[i].x = 0;
            }
            if(p.x < 0 ) {
                neighbors[i].x = gridSizeX - 1;
            }
        }

        return neighbors;
    }
}

