import { Player } from "./player.js";
import { Ship } from "./ship.js";

class GameController {
    constructor() {
        this.player1;
        this.player2;
        this.currentPlayer = this.player1;
    }

    startGame() {
        function generateShips(player) {
            let numberOfShips = 5;
            for (let i = 2; i < numberOfShips + 1; i++) {
                let ship = new Ship(i);
                let validShipPlacement = false;

                while (!validShipPlacement) {
                    try {
                        let randomCoord = [
                            Math.floor(Math.random() * 10),
                            Math.floor(Math.random() * 10),
                        ];
                        let randomOrientation =
                            Math.random() < 0.5 ? "horizontal" : "vertical";

                        player.gameBoard.placeShip(
                            ship,
                            randomCoord,
                            randomOrientation
                        );

                        validShipPlacement = true;
                    } catch (error) {
                        console.log("Generating ships...");
                    }
                }
            }
        }

        this.player1 = new Player("player1", false);
        generateShips(this.player1)

        this.player2 = new Player("player2", true);
        generateShips(this.player2)
    }

    switchTurn() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    checkGameOver() {
        if (this.player1.gameBoard.areAllShipSunk() == true) {
            return player1
        } else if (this.player1.gameBoard.areAllShipSunk() == true) {
            return player2
        }
        return false;
    }

    playTurn(coord) {
        let opponent = this.currentPlayer === this.player1 ? this.player2 : this.player1;

        if (this.currentPlayer.isComputer == true) {
            this.currentPlayer.computerMove(opponent)
        } else {
            this.currentPlayer.attack(opponent, coord);
        }

        //Re-render the game board

        if (!this.checkGameOver()) {
            this.switchTurn();
        }
    }
}

export { GameController };
