(() => {
    const Board = {
        blockElement: document.createElement('div'),
        sizeInPixels: [320, 640],
        size: [10, 20],
        currentPosition: [0, 0]
    }

    const Pieces = {
        I: {
            name: 'I',
            data: [[0,0],[0,1],[0,2],[0,3]],
            color: '#0EE'
        },
        O: {
            name: 'O',
            data: [[0,0],[0,1],[1,0],[1,1]],
            color: '#EE0'
        },
        T: {
            name: 'T',
            data: [[1,0],[0,1],[1,1],[2,1]],
            color: '#90E'
        },
        S: {
            name: 'S',
            data: [[0,1],[1,1],[1,0],[2,0]],
            color: '#0E0'
        },
        Z: {
            name: 'Z',
            data: [[0,0],[1,0],[1,1],[2,1]],
            color: '#E00'
        },
        J: {
            name: 'J',
            data: [[1,0],[1,1],[1,2],[0,2]],
            color: '#00E'
        },
        L: {
            name: 'L',
            data: [[0,0],[0,1],[0,2],[1,2]],
            color: '#E90'
        }
    };

    window.addEventListener('load', () => {
        Board.element = document.getElementById('board');

        Board.style();
        initGrid();

        createPiece(3, 2);
        
        drawBoard();
    })

    Board.style = () => {
        Board.element.style.width = Board.sizeInPixels[0] + "px";
        Board.element.style.height = Board.sizeInPixels[1] + "px";
        Board.element.style.backgroundColor = "#DDD";

        // Determine appropriate size for blocks
        Board.blockElement.style.width = (Board.sizeInPixels[0] / Board.size[0]) + "px";
        Board.blockElement.style.height = (Board.sizeInPixels[1] / Board.size[1]) + "px";
    }

    const createPiece = (piece, x = 0, y = 0) => {
        let p = selectRandomPiece();
        
        Board.grid[4][5].element.style.backgroundColor = '#00F';

        for(let dat of p.data) {
            Board.grid[x + dat[0]][y + dat[1]] =
                {...Board.grid[x + dat[0]][y + dat[1]], ...p};
                console.log(Board.grid[x + dat[0]][y + dat[1]]);
        }
    }

    // Return random item from Pieces. Use Math.floor for uniform distribution
    const selectRandomPiece = () => {
        const keys = Object.keys(Pieces);
        return Pieces[ keys[ Math.floor( Math.random() * keys.length ) ] ];
    }

    const initGrid = () => {
        Board.element.innerHTML = '';

        // Create multidimensional array from Board.size and set all values to a empty objects
        /*Board.grid = Array.from(
            Array(Board.size[0]),
            () => new Array(Board.size[1]).fill( {} )
        );*/

        Board.grid = [];
        for (let xx=0;xx<Board.size[0]; ++xx) {
            Board.grid[xx] = [];
            for (let yy=0;yy<Board.size[1]; ++yy) {
                Board.grid[xx][yy] = {};
            }
        }


        // Output grid contents as a filled or empty BlockChar
        for (let yy=0; yy<Board.size[1]; ++yy) {
            
            for (let xx=0; xx<Board.size[0]; ++xx) {

                Board.grid[xx][yy].element = Board.blockElement.cloneNode();

                Board.element.appendChild( Board.grid[xx][yy].element );
            }
            Board.element.appendChild( document.createElement('br') );
        }

        console.log(Board.grid);
    }

    const drawBoard = () => {

        // Output grid contents as a filled or empty BlockChar
        for (let yy=0; yy<Board.size[1]; ++yy) {
            for (let xx=0; xx<Board.size[0]; ++xx) {
                    Board.grid[xx][yy].element.style.backgroundColor = Board.grid[xx][yy].color;
            }
        }
    }
})()