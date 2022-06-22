class Entry {
    #startTime;
    #endTime;
    #activity;
    #type;

    constructor(sTime, eTime, act, type) {
        this.#startTime = sTime.length > 0 ? sTime : "00:00";
        this.#endTime = eTime.length > 0 ? eTime : "00:00";
        this.#activity = act.length > 0 ? act : "Test";
        this.#type = type;
    }

    getType() {
        return this.#type;
    }

    getEntry() {
        return `${this.#startTime}-${this.#endTime}: ${this.#activity}`;
    }

}