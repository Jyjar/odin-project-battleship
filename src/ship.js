class Ship {
    constructor(length) {
        this.length = length;
        this.timesHit = 0;
        this.sunken = false;
    }

    hit() {
        this.timesHit++;
        if (this.timesHit == this.length) {
            this.sunken = true;
        }
    }

    hasSunken() {
        return this.sunken;
    }
}

export { Ship };