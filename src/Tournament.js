export default class Tournament {

    constructor() {

        this.round = 1;

    }

    nextRound() {

        this.round++;

    }

    getRoundName() {

        return "Round " + this.round;

    }

}