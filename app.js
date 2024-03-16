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

const Player = (name, marker, plays) => {
    return { name, marker, plays };
};

const cell = document.querySelectorAll(".square");

const makeUnclickable = () => {
    cell.forEach((el) => {
        el.style.pointerEvents = "none";
    });
};

const makeClickable = () => {
    cell.forEach((el) => {
        el.style.pointerEvents = "auto";
    });
};
const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", () => {
    Game();
    makeClickable();
});

const Game = () => {
    let currentPlayer;
    let allPlays = [];
    const resetBtn = document.querySelector("#reset");
    resetBtn.disabled = true;
    resetBtn.classList.add("disabled");
    const turnTracker = document.querySelector("#turn-tracker");
    let player1Name = document.querySelector("#player1").value;
    let player2Name = document.querySelector("#player2").value;
    if (!player1Name) {
        player1Name = "Player 1";
    }
    if (!player2Name) {
        player2Name = "Player 2";
    }
    let player1 = Player(player1Name, "X", []);
    let player2 = Player(player2Name, "O", []);
    turnTracker.textContent = `${player1Name} vs ${player2Name}...game on! ${player1Name} goes first.`;
    startBtn.disabled = true;
    startBtn.classList.add("disabled");
    currentPlayer = player1;
    console.log("before click", player1.name, player2.name);

    cell.forEach((el) => {
        el.addEventListener("click", () => {
            console.log("after click", player1.name, player2.name);
            el.disabled = false;
            if (!el.textContent) {
                el.textContent = currentPlayer.marker;
            } else {
                return false;
            }
            let currentCell = el.id;
            for (let i = 0; i < Gameboard.gameboard.length; i++) {
                for (let j = 0; j < Gameboard.gameboard[i].length; j++) {
                    let stringsIJ = i + "-" + j;
                    if (currentCell == stringsIJ) {
                        Gameboard.gameboard[i][j] = currentPlayer.marker;
                    }
                }
            }
            const switchPlayer = () => {
                currentPlayer == player1
                    ? (currentPlayer = player2)
                    : (currentPlayer = player1);
                turnTracker.textContent = `${currentPlayer.name}'s turn!`;
            };
            let cellNumber = el.dataset.cell;
            currentPlayer.plays.push(cellNumber);
            allPlays.push(cellNumber);
            if (
                //horizontal
                (currentPlayer.plays.includes("1") &&
                    currentPlayer.plays.includes("2") &&
                    currentPlayer.plays.includes("3")) ||
                (currentPlayer.plays.includes("4") &&
                    currentPlayer.plays.includes("5") &&
                    currentPlayer.plays.includes("6")) ||
                (currentPlayer.plays.includes("7") &&
                    currentPlayer.plays.includes("8") &&
                    currentPlayer.plays.includes("9")) ||
                //vertical
                (currentPlayer.plays.includes("1") &&
                    currentPlayer.plays.includes("4") &&
                    currentPlayer.plays.includes("7")) ||
                (currentPlayer.plays.includes("2") &&
                    currentPlayer.plays.includes("5") &&
                    currentPlayer.plays.includes("8")) ||
                (currentPlayer.plays.includes("3") &&
                    currentPlayer.plays.includes("6") &&
                    currentPlayer.plays.includes("9")) ||
                //diagonal
                (currentPlayer.plays.includes("1") &&
                    currentPlayer.plays.includes("5") &&
                    currentPlayer.plays.includes("9")) ||
                (currentPlayer.plays.includes("3") &&
                    currentPlayer.plays.includes("5") &&
                    currentPlayer.plays.includes("7"))
            ) {
                turnTracker.textContent = `${currentPlayer.name} wins! Press reset to play again!`;
                resetBtn.disabled = false;
                resetBtn.classList.remove("disabled");
                allPlays = [];
                makeUnclickable();
                return false;
            }
            if (allPlays.length == 9) {
                turnTracker.textContent =
                    "It's a draw! Press reset to play again!";
                makeUnclickable();
                resetBtn.disabled = false;
                resetBtn.classList.remove("disabled");
                allPlays = [];
            } else {
                switchPlayer();
            }
        });
    });
    resetBtn.addEventListener("click", () => {
        startBtn.disabled = false;
        startBtn.classList.remove("disabled");
        allPlays = [];
        player1.plays = [];
        player2.plays = [];
        cell.forEach((el) => {
            el.textContent = "";
        });
        turnTracker.textContent = "Enter Names and Press Start to Begin!";
        document.querySelector("#player1").value = "";
        document.querySelector("#player2").value = "";
        player1 = null;
        player2 = null;
        console.log("reset click", player1.name, player2.name);
        makeUnclickable();
    });
};

makeUnclickable();
