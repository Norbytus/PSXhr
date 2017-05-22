'use strict'

const RESPONSE = {
    array : 'arrayBuffer',
    blob : 'blob',
    form : 'formData',
    json : 'json',
    text : 'text'
}

const ATTR_LIST = {
    'container': ['psxhr-container', 'container'],
    'event': ['psxhr-event'],
    'href':  ['psxhr-href', 'href', 'action'],
    'method': ['psxhr-method', 'method'],
    'state': ['psxhr-state'],
    'callback': ['psxhr-callback'],
    'interval': ['psxhr-interval'],
    'time': ['psxhr-time'],
    'response': ['psxhr-response',],
    'promise': ['psxhr-promise']
}

class Aliases {

    constructor(key, aliases) {
        this._data = {};
        this._data.key = aliases;
    }

    check(key, callback) {

        return callback(this._data.key);

    }

}

class PSXhr {

    static init() {

        Array.from(document.querySelectorAll('[psxhr="true"]'))
            .forEach( node => {
                new PSXhr(node);
            });

    }

    constructor(node) {

        this._attr = {};
        this._node = node;
        this._checkAttribute(node);
        this._setEvent();

    }

    _checkAttribute() {

        let result = {};

        Object.keys(ATTR_LIST).map( attr => {
            let alias = new Aliases(attr, ATTR_LIST[attr]);
            let name = alias.check(attr, this._checkAlias.bind(this));
            result[attr] = name ? this._node.getAttribute(name) : false;
        })

        this._attr = result;

    }

    _checkAlias(aliases) {

        let attributes = this._node.attributes;
        for (var alias of aliases)
            if (attributes.getNamedItem(alias)) return alias;
        return false;

    }

    _isForm() { return this._node.tagName == 'FORM'; }

    _setData() { this._data = new FormData(this.node); }

    _setEvent() {

        if (!this._attr.event) return false;

        let eventList = this._attr.event.split(',');
        let node = this._node;

        eventList.map( event => {
            node.addEventListener(event, this._eventWrapper.bind(this), false);
        });

        if (this._attr.time) {
            setTimeout(this._eventWrapper.bind(this), this._attr.time);
            this._attr.interval = false;
        }

        if (this._attr.interval)
            setInterval(this._eventWrapper.bind(this), this._attr.time);

    }

    _eventWrapper(e) {

        this._request();

        if (e) e.preventDefault();

    }


    _request() {

        let attr = this._attr;

        let data = {
            method: attr.method ? attr.method : 'GET',
            headers: {'X-REQUESTED-WITH': 'XMLHttpRequest'},
            credentials: 'same-origin'
        };

        if (data.method == 'POST') data.body = new FormData();
        else if (data.method == 'POST' && this._isForm())
            data.body = new FormData(this._node);

        var href = attr.href
            ? attr.href
            : window.location.href;

        let fetchPromise = fetch(href, data);

        if (attr.promise && this._callbackExsists(attr.promise)) {
            let fn = window[attr.promise];
            fn(fetchPromise);
            return false;
        }

        fetchPromise
            .then( res => {

                let responseType = RESPONSE[attr.response]
                    ? RESPONSE[attr.response]
                    : 'text';

                return res[responseType]();

            })
            .then( res => {

                if (attr.callback && this._callbackExsists(attr.callback)) {
                    let fn = window[attr.promise];
                    fn(res);
                } else this._defaultHandler(res);

                if (JSON.parse(attr.state))
                    history.pushState({test: 'test'}, '', href);

            })
            .catch( err => {
                console.log(err);
            })

    }

    _callbackExsists(callbackName) {
        return typeof window[callbackName] === 'function' ? true : false;
    }

    _defaultHandler(res) {

        if (!this._attr.container) this._node.innerHTML = res;
        else {
            let container = document.querySelectorAll(this._attr.container);
            if (!container) return false;

            Array.from(container).forEach( node => {
                node.innerHTML = res;
            })
        }

    }

}

window.PSXhr = PSXhr;
