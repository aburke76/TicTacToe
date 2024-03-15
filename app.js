//create Gameboard object, store gameboard array inside
//create factory function for creating players
//create object function that runs the game

//NOTE: return any functions that need to be used outside of their module!!

const Gameboard = (() => {
    let gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    return {
        gameboard,
    };
})();

const Player = (name, marker) => {
    return { name, marker };
};

const Game = (() => {
    const player1 = Player(document.querySelector("#player1").value, "X");
    const player2 = Player(document.querySelector("#player2").value, "O");
    let currentPlayer = player1;
    const switchPlayer = () => {
        currentPlayer == player1
            ? (currentPlayer = player2)
            : (currentPlayer = player1);
    };
    //create eventListeners on board, start new round after every click
    const cell = document.querySelectorAll(".square");
    cell.forEach((el) => {
        el.addEventListener("click", () => {
            //check is cell is empty. if so, add player marker to cell on gameboard, new round
            if (!el.textContent) {
                el.textContent = currentPlayer.marker;
            } else {
                return false;
            }
            //update array
            let currentCell = el.id;
            for (let i = 0; i < Gameboard.gameboard.length; i++) {
                for (let j = 0; j < Gameboard.gameboard[i].length; j++) {
                    let stringsIJ = i + "-" + j;
                    if (currentCell == stringsIJ) {
                        Gameboard.gameboard[i][j] = currentPlayer.marker;
                    }
                }
            }
            //check gameboard for a win for currentPlayer, or draw. if no win, switch players
            let winningCombinations = [[]];
            switchPlayer();
        });
    });
})();
