import { GameBoard } from "./gameBoard.js";

class Player {
    constructor(name, isComputer) {
        this.name = name;
        this.gameBoard = new GameBoard;
        this.isComputer = isComputer;
    }

    attack(opponent, coord) {
        opponent.gameBoard.receiveAttack(coord);
    }

    computerMove(opponent) {
        function generateRandomCoord() {
            let randomCoord;
            let isValidCoord = false;
            
            while (!isValidCoord) {
                randomCoord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
                
                const hasBeenShot = this.gameBoard.shots.some((coord) => 
                    coord[0] === randomCoord[0] && coord[1] === randomCoord[1]
                );
    
                if (!hasBeenShot) {
                    isValidCoord = true;
                }
            }
            
            return randomCoord;
        }
    
        const randomCoord = generateRandomCoord.call(this);
        opponent.gameBoard.receiveAttack(randomCoord);
    }
}

export { Player };