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

    getType() {
        return this.#type;
    }

    getEntryHTML() {
        let checkbox = `<input type="checkbox">`;
        return checkbox + `<h3 style="display: inline-block;">${this.#startTime}-${this.#endTime}: ${this.#activity}</h3><br>`;
    }

}