(() => {
    const Board = {
        filledBlock: '&#x25A0;',
        emptyBlock: '&#x25A1;',
        sizeInPixels: [320, 640],
        size: [10, 20],
        currentPosition: [0, 0]
    }

    const Pieces = [
        {
            name: 'I',
            data: [[0,0],[0,1],[0,2],[0,3]],
            color: '#0EE'
        },
        {
            name: 'O',
            data: [[0,0],[0,1],[1,0],[1,1]],
            color: '#EE0'
        },
        {
            name: 'T',
            data: [[1,0],[0,1],[1,1],[2,1]],
            color: '#90E'
        },
        {
            name: 'S',
            data: [[0,1],[1,1],[1,0],[2,0]],
            color: '#0E0'
        },
        {
            name: 'Z',
            data: [[0,0],[1,0],[1,1],[2,1]],
            color: '#E00'
        },
        {
            name: 'J',
            data: [[1,0],[1,1],[1,2],[0,2]],
            color: '#00E'
        },
        {
            name: 'L',
            data: [[0,0],[0,1],[0,2],[1,2]],
            color: '#E90'
        }
    ];

    window.addEventListener('load', () => {
        Board.element = document.getElementById('board');

        Board.style();
        initGrid();

        createPiece(5, 2);
        
        drawBoard();
    })

    Board.style = () => {
        Board.element.style.width = Board.sizeInPixels[0] + "px";
        Board.element.style.height = Board.sizeInPixels[1] + "px";
        Board.element.style.backgroundColor = "#DDD";

        // Determine appropriate font size for blocks
        Board.element.style.fontSize = (Board.sizeInPixels[0] / Board.size[0]) + 'px';
        Board.element.style.lineHeight = (Board.sizeInPixels[1] / Board.size[1]) + 'px';
    }

    const createPiece = (piece, x = 0, y = 0) => {
        let p = selectRandomPiece();
        
        for(let dat of p.data) {
            console.log(x + dat[0], y + dat[1]);
            Board.grid[x + dat[0]][y + dat[1]] = true;
        }
    }

    // Return random item from Pieces. Use Math.floor for uniform distribution
    const selectRandomPiece = () => Pieces[ Math.floor( Math.random() * Pieces.length ) ];

    const initGrid = () => {
        // Create multidimensional array from Board.size and set all values to false
        Board.grid = Array.from(
            Array(Board.size[0]),
            () => new Array(Board.size[1]).fill(false)
        );
    }

    const drawBoard = () => {
        Board.element.style.color = '#F00';
        Board.element.style.fontFamily = 'Helvetica';
        let boardString = '';

        // Output grid contents as a filled or empty BlockChar
        for (let yy=0; yy<Board.size[1]; ++yy) {
            for (let xx=0; xx<Board.size[0]; ++xx) {
                boardString += (Board.grid[xx][yy] ? Board.filledBlock : Board.emptyBlock);
            }
            boardString += '<br>';
        }
        Board.element.innerHTML = boardString;
    }
})()