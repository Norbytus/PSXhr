class Aliases {

    constructor(key, aliases) {
        this._data = {};
        this._data.key = aliases;
    }

    check(key, callback) {

        return callback(this._data.key);

    }

}

export default Aliases;
