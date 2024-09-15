import { Ship } from "../ship.js";


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
