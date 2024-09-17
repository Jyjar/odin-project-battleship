import "./styles.css";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
import { GameBoard } from "./gameBoard.js";
import { GameController } from "./gameController.js";
import { DOMManager } from "./domManager.js";

let domManager = new DOMManager;
let gameController = new GameController(domManager);

domManager.renderStartScreen();

let playerVsComputerButton = document.querySelector(".player-vs-computer");
playerVsComputerButton.addEventListener("click", () => {
    gameController.startGame("playerVSComputer");
    domManager.renderBoard(gameController.player1.gameBoard, gameController.player2.gameBoard);

    domManager.setBoardClickListener((x, y) => {
        gameController.playTurn([x, y]);
    });
});

