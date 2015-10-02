window.onload = function()
{
    var canvas = document.getElementById('field');
    var game = new Game(canvas);
    game.start();
};

function Point(x, y) {
    return {x:x, y:y};
}

function Game(canvas)
{
    var cellSize = 10;
    var gridSizeX = 30;
    var gridSizeY = 30;
    var grid = [];

    canvas.width = gridSizeX * cellSize;
    canvas.height = gridSizeY * cellSize;
    var context = canvas.getContext('2d');

    this.start = function()
    {
        generateGrid();
        drawGrid();
        getNeighbors(new Point(30,30));
    };

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
                neighbors[i].y = p.y - gridSizeY;
            }
            if(p.x >= gridSizeX) {
                neighbors[i].x = p.x - gridSizeX;
            }
        }

        return neighbors;
    }
}

