'use strict'

import Aliases from 'aliases.js';

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
    'observ': ['psxhr-observ'],
    'href':  ['psxhr-href', 'href', 'action'],
    'method': ['psxhr-method', 'method'],
    'state': ['psxhr-state'],
    'callback': ['psxhr-callback'],
    'interval': ['psxhr-interval'],
    'time': ['psxhr-time'],
    'response': ['psxhr-response',],
    'promise': ['psxhr-promise']
}

class PSXhr {

    static init() {

        Array.from(document.querySelectorAll('[psxhr="true"]'))
            .forEach( node => {
                let psxhr = new PSXhr(node);
                psxhr.start();
            });

    }

    constructor(node) {

        this._attr = {};
        this._node = node;

    }

    set container(container) { this._attr.container = container; }
    set event(event) { this._attr.event = event; }
    set observ(callback) { this._attr.observ = callback; }
    set href(href) { this._attr.href = href; }
    set method(method) { this._attr.method = method; }
    set state(bool) { this._attr.method = bool; }
    set callback(callback) { this._attr.callback = callback; }
    set interval(time) { this._attr.interval = time; }
    set time(time) { this._attr.time = time; }
    set response(responseType) { this._attr.response = responseType; }
    set promise(callback) { this._attr.promise = callback; }

    start() {

        this._checkAttribute(this._node);
        if (this._attr.observ) this._setObservServer();
        this._setEvent();

    }

    _setObservServer() {

        let pool = [];
        let callback = this._attr.observ;

        if (!this._callbackExsists(callback))
            return false;
        else
            callback = this._getCallback(callback);

        if (!this._attr.container)
            pool.push(this._node);
        else {

            let container = document.querySelectorAll(this._attr.container);

            if (!container) return false;

            Array.from(container).forEach( node => {
                pool.push(node);
            })

        }

        let mo = new MutationObserver( m => { callback(m); });

        let config = { attributes: true, childList: true, characterData: true };

        pool.forEach( node => {
            mo.observe(node, config);
        })

    }

    _checkAttribute() {

        let result = {};

        Object.keys(ATTR_LIST).map( attr => {
            let alias = new Aliases(attr, ATTR_LIST[attr]);
            let name = alias.check(attr, this._checkAlias.bind(this));
            result[attr] = name ? this._node.getAttribute(name) : false;
        })

        this._attr = Object.assign(result, this._attr);

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

        if (this._attr.event) {

            let eventList = this._attr.event.split(',');
            let node = this._node;

            eventList.map( event => {
                node.addEventListener(event, this._eventWrapper.bind(this), false);
            });

        }

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

        if (JSON.parse(attr.state))
            history.pushState({test: 'test'}, '', href);

         let fetchPromise = fetch(href, data);

         if (this._dispatchCallback('promise', fetchPromise)) return false;

         fetchPromise
             .then( res => {

                 let responseType = RESPONSE[attr.response]
                     ? RESPONSE[attr.response]
                     : 'text';

                 return res[responseType]();

             })
             .then( res => {

                 if (this._dispatchCallback('callback', res))
                     return false;
                 else
                     this._defaultHandler(res);

             })
             .catch( err => {
                 console.log(err);
             })

    }

    _dispatchCallback(name, params) {

        let callback = this._attr[name];

        if (callback) {
            let fn = this._getCallback(callback);
            fn(params);
            return true;
        } else return false;

    }

    _callbackExsists(callbackName) {

        if (typeof window[callbackName] === 'function' || typeof callbackName)
            return true;
        else
            return false;

    }

    _getCallback(callbackName) {

        if (typeof callbackName === 'function')
            return callbackName;
        else if (typeof window[callbackName] == 'function')
            return window[callbackName];

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
