import { Ship } from "../ship.js";
import { GameBoard } from "../gameBoard.js";


describe('ship tests', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(2);
    });

    test('hit method increments timesHit and changes sunken if hit equals length of ship', () => {
        ship.hit()
        ship.hit()
        expect(ship.sunken).toBe(true);
    });

    test('returns false for ship that was not hit', () => {
        expect(ship.sunken).toBe(false);
    });
});

describe('gameBoard tests', () => {
    let gameBoard;
    let ship = new Ship(3);

    beforeEach(() => {
        gameBoard = new GameBoard();
        gameBoard.placeShip(ship, [0, 0], "horizontal");
    })

    describe('placeShip method', () => {
        test('gameBoard places ship horizontaly correct', () => {
            expect(gameBoard.board[0][2]).toBe(ship);
        })

        test('second ship is not placed due to being adjacent to the first ship', () => {
            expect(() => {
                gameBoard.placeShip(ship, [0, 1], "vertical");
            }).toThrow(Error);
        })

    })

    describe('reciveAttack method', () => {
        test('hits the ship and returns true', () => {
            expect(gameBoard.reciveAttack([0,2])).toBe(true);
        })

        test('fail to hit the ship and returns false', () => {
            expect(gameBoard.reciveAttack([1,2])).toBe(false);
        })
    })

    
})
