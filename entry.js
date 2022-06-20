class Entry {
    #startTime;
    #endTime;
    #activity;
    #type;

    constructor(sTime, eTime, act, type) {
        this.#startTime = sTime;
        this.#endTime = eTime;
        this.#activity = act;
        this.#type = type;
    }

    getEntryHTML() {
        let display = "<div>";
        return `<h3>${this.#startTime}-${this.#endTime}: ${this.#activity}</h3>`;
    }

}