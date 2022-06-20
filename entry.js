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

    
}

module.exports = Entry;