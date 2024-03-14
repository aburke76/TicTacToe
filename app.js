//create Gameboard object, store gameboard array inside, render board on page
//create factory function for creating players
//create object function that runs the game

//NOTE: return any functions that need to be used outside of their module!!

const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let htmlBoard = "";
        board.forEach((square, index) => {
            htmlBoard += `<div class='square' id='square-${index}'>${square}</div>`;
        });
        document.querySelector("#gameboard-container").innerHTML = htmlBoard;
    };
    return { render };
})();
