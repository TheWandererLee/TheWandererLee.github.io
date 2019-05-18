(() => {
    const Board = {
        blockElement: document.createElement('div'),
        sizeInPixels: [320, 640],
        size: [10, 20],
        currentPosition: [0, 0],
        backgroundColor: '#000'
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

    window.addEventListener('load', () =>
    {
        Board.element = document.getElementById('board');

        Board.style();
        initGrid();

        createPiece(3, 2);
        
        drawBoard();
    })

    Board.style = () =>
    {
        Board.element.style.width = Board.sizeInPixels[0] + "px";
        Board.element.style.height = Board.sizeInPixels[1] + "px";
        Board.element.style.backgroundColor = "#DDD";

        // Determine appropriate size for blocks
        Board.blockElement.style.width = (Board.sizeInPixels[0] / Board.size[0]) + "px";
        Board.blockElement.style.height = (Board.sizeInPixels[1] / Board.size[1]) + "px";
    }

    const createPiece = (x = 0, y = 0) =>
    {
        let piece = selectRandomPiece();

        // Combine all colliding cells
        for(let dat of piece.data)
        {
            let cellX = x + dat[0]; let cellY = y + dat[1];
            Board.grid[cellX][cellY] = { ...Board.grid[cellX][cellY], piece };
            console.log(Board.grid[cellX][cellY]);
        }
        
    }

    // Return random item from Pieces. Use Math.floor for uniform distribution
    const selectRandomPiece = () =>
    {
        const keys = Object.keys(Pieces);
        return Pieces[ keys[ Math.floor( Math.random() * keys.length ) ] ];
    }

    const initGrid = () =>
    {
        Board.element.innerHTML = '';

        Board.grid = createFilled2dArray();

        // Output grid contents as a filled or empty BlockChar
        for (let yy=0; yy<Board.size[1]; ++yy) {
            
            for (let xx=0; xx<Board.size[0]; ++xx) {

                Board.grid[xx][yy].element = Board.blockElement.cloneNode();

                Board.element.appendChild( Board.grid[xx][yy].element );
            }
            Board.element.appendChild( document.createElement('br') );
        }
    }

    const drawBoard = () =>
    {
        // Output grid contents as a filled or empty BlockChar
        for (let yy=0; yy<Board.size[1]; ++yy) {
            for (let xx=0; xx<Board.size[0]; ++xx) {
                if (Board.grid[xx][yy].hasOwnProperty('piece')) {
                    Board.grid[xx][yy].element.style.backgroundColor = Board.grid[xx][yy].piece.color;
                } else {
                    Board.grid[xx][yy].element.style.backgroundColor = Board.backgroundColor;
                }
            }
        }
    }

    // Use this to clone objects, Array.fill() only copies the reference
    // Default creates multidimensional array from Board.size and set all values to empty objects
    const createFilled2dArray = (size1 = Board.size[0], size2 = Board.size[1], fill = {}) =>
    {
        let array2d = [];
        for (let xx = 0; xx < size1; ++xx) {
            array2d[xx] = [];
            for (let yy = 0; yy < size2; ++yy) {
                array2d[xx][yy] = {...fill};
            }
        }
        return array2d;
    }
})()