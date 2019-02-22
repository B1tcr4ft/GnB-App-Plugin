export class State {
    constructor(name, trigger) {
        this.name = name;
        this.trigger = trigger;
    }

    /**
     * TODO
     * Check whether the trigger has been fired or not
     * @param currentValue {number} the current node value to check
     * @return {boolean} true, if the trigger is fired, false otherwise
     */
    isFired(currentValue) {
        return false;
    }
}