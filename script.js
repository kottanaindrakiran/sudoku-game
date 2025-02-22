function generateSudoku() {
    const puzzle = Array.from({ length: 9 }, () => Array(9).fill(0));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() > 0.6) {
                puzzle[i][j] = Math.floor(Math.random() * 9) + 1;
            }
        }
    }
    return puzzle;
}

function fillGrid(puzzle) {
    const gridBody = document.getElementById("sudoku-grid-body");
    gridBody.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.min = 1;
            input.max = 9;
            if (puzzle[i][j] !== 0) {
                input.value = puzzle[i][j];
                input.readOnly = true;
            }
            cell.appendChild(input);
            row.appendChild(cell);
        }
        gridBody.appendChild(row);
    }
}

function solveSudoku(grid) {
    function isValid(grid, row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num || grid[x][col] === num) {
                return false;
            }
        }
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    function solve(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (solve(grid)) {
                                return true;
                            }
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    solve(grid);
    return grid;
}

document.getElementById("generate-puzzle-btn").addEventListener("click", () => {
    const puzzle = generateSudoku();
    fillGrid(puzzle);
});

document.getElementById("solve-puzzle-btn").addEventListener("click", () => {
    const grid = Array.from(document.querySelectorAll(".sudoku-grid input")).map((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        return (input.value ? parseInt(input.value) : 0);
    }).reduce((rows, key, index) => (index % 9 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
    const solvedGrid = solveSudoku(grid);
    fillGrid(solvedGrid);
});

document.getElementById("clear-grid-btn").addEventListener("click", () => {
    fillGrid(Array.from({ length: 9 }, () => Array(9).fill(0)));
});

document.addEventListener("DOMContentLoaded", () => {
    fillGrid(generateSudoku());
});