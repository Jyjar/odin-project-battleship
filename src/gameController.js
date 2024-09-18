import { Player } from "./player.js";
import { Ship } from "./ship.js";

class GameController {
    constructor(domManager) {
        this.player1;
        this.player2;
        this.currentPlayer;
        this.domManager = domManager;
    }

    startGame(gameMode) {
        this.player1 = new Player("player1", false);
        this.player2 = new Player("player2", gameMode === "playerVSComputer");
        this.currentPlayer = this.player1;

        // Generate ships for both players
        this.generateShips(this.player1);
        this.generateShips(this.player2);
    }

    generateShips(player) {
        const numberOfShips = 5;
        for (let i = 2; i < numberOfShips + 1; i++) {
            const ship = new Ship(i);
            let validShipPlacement = false;

            while (!validShipPlacement) {
                try {
                    const randomCoord = [
                        Math.floor(Math.random() * 10),
                        Math.floor(Math.random() * 10),
                    ];
                    const randomOrientation =
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

    switchTurn() {
        this.currentPlayer =
            this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    playTurn(coord) {
        let opponent =
            this.currentPlayer === this.player1 ? this.player2 : this.player1;

        if (this.player2.isComputer) {
            this.currentPlayer.attack(opponent, coord);
            opponent.computerMove(this.currentPlayer);
        } else {
            this.currentPlayer.attack(opponent, coord);
            this.switchTurn();
        }
    }

    checkGameOver() {
        if (this.player1.gameBoard.areAllShipSunk()) {
            return this.player2;
        }

        if (this.player2.gameBoard.areAllShipSunk()) {
            return this.player1;
        }
        return false;
    }
}

export { GameController };
