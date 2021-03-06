(() => {
    const Board = {
        blockElement: document.createElement('div'),
        sizeInPixels: [320, 640],
        size: [10, 20],
        currentPosition: [3, 2],
        currentPiece: undefined,
        backgroundColor: '#000',
        dropper: {
            speed: 1000,
            standardSpeed: 800,
            quickSpeed: 100,
            timer: undefined
        },
        slider: {
            speed: 150,
            timer: undefined
        },
        keys: {}
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

        requestAnimationFrame(drawBoard); 
        Board.dropper.timer = setInterval(dropCursor, Board.dropper.speed);
    })

    window.addEventListener('keydown', (e) =>
    {
        //Board.keys[e.keyCode] = true;
        switch (e.keyCode) {
            case 37: case 39: // Left, Right
                if (!Board.keys[e.keyCode]) {
                    Board.keys[e.keyCode] = true;
                    //clearInterval(Board.slider.timer);
                    slideCursor();
                    Board.slider.timer = setInterval(slideCursor, Board.slider.speed);
                }
                break;
            case 40: // Down
                if (!Board.keys[40]) { // Prevent duplicate keydown

                    Board.keys[40] = true;
                    
                    clearInterval(Board.dropper.timer);
                    dropCursor();
                    Board.dropper.speed = Board.dropper.quickSpeed;
                    Board.dropper.timer = setInterval(dropCursor, Board.dropper.speed);
                }
                break;
            default:
                console.log(e.keyCode);
                //Board.keys[e.keyCode] = true;
                break;
        }
    })

    window.addEventListener('keyup', (e) =>
    {
        //delete Board.keys[e.keyCode];
        switch (e.keyCode) {
            case 37: case 39:
                delete Board.keys[e.keyCode];

               
                        clearInterval(Board.slider.timer);

                        if (typeof Board.keys[37] != 'undefined' ||
                        typeof Board.keys[39] != 'undefined') {
                            Board.slider.timer = setInterval(Board.slideCursor, Board.slider.speed);
                        }
                break;
            case 40:
                delete Board.keys[40];

                Board.dropper.speed = Board.dropper.standardSpeed;
                clearInterval(Board.dropper.timer);
                Board.dropper.timer = setInterval(dropCursor, Board.dropper.speed);
                break;
        }
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

    const createPiece = (piece = Board.currentPiece, x = Board.currentPosition[0], y = Board.currentPosition[1]) =>
    {
        if (typeof piece == 'undefined') {
            piece = Board.currentPiece;
            if (typeof piece == 'undefined') {
                piece = Board.currentPiece = selectRandomPiece();
            }
        }

        // Combine all colliding cells
        for(let dat of piece.data)
        {
            let cellX = x + dat[0]; let cellY = y + dat[1];
            Board.grid[cellX][cellY] = { ...Board.grid[cellX][cellY], piece };
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

    const clearGrid = () =>
    {
        for (let yy=0; yy<Board.size[1]; ++yy) {
            for (let xx=0; xx<Board.size[0]; ++xx) {
                delete Board.grid[xx][yy].piece;
            }
        }
    }

    const dropCursor = () => {
        //if (!Board.keys[40]) { ++Board.currentPosition[1]; }
        ++Board.currentPosition[1];

        if (Board.currentPosition[1] > 20) {
            Board.currentPosition[1] = 0;
            Board.currentPosition[0] = Math.floor(Math.random() * 7);
            Board.currentPiece = selectRandomPiece();
        }
    }
    const slideCursor = () => {
        let previousPosition = Board.currentPosition[0];
        if (Board.keys[37]) { --Board.currentPosition[0]; }
        if (Board.keys[39]) { ++Board.currentPosition[0]; }

        for(let dat of Board.currentPiece.data)
        {
            let cellX = Board.currentPosition[0] + dat[0];
            let cellY = Board.currentPosition[1] + dat[1];

            // Block collides with wall
            if (cellX < 0 || cellX >= Board.size[0] ||
                typeof Board.grid.piece != 'undefined')
            {
                Board.currentPosition[0] = previousPosition;
                break;
            }
        }
    }

    const drawBoard = () =>
    {
        clearGrid();
        createPiece();

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

        requestAnimationFrame(drawBoard);
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