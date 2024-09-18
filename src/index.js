import "./styles.css";
import { Ship } from "./ship.js";
import { Player } from "./player.js";
import { GameBoard } from "./gameBoard.js";
import { GameController } from "./gameController.js";
import { DOMManager } from "./domManager.js";

let gameController = new GameController;
let domManager = new DOMManager(gameController);

domManager.renderStartScreen();


