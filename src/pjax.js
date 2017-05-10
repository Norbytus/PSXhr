class PjaxElement {

    static setPjax() {
        document.querySelectorAll('[pjax="true"]').forEach( node => {
            new PjaxElement(node);
        });
    }

    constructor(node) {
        this.attr = {};
        this._response = {
            array : 'arrayBuffer',
            blob : 'blob',
            form : 'formData',
            json : 'json',
            text : 'text'
        };
        this.node = node;
        this._data = new FormData();
        this._checkAttribute(node);
        this._setEvent();
    }

    _checkAttribute() {

        let result = {};

        if (this._isForm()) this._setData();

        let attrList = [
            'container',
            'event',
            'href',
            'method',
            'state',
            'callback',
            'interval',
            'time',
            'response',
        ];

        attrList.map( attr => {
            result[attr] = this.node.hasAttribute('pjax-' + attr)
                ? this.node.getAttribute('pjax-' + attr)
                : false;
        });

        this.attr = Object.assign(this.attr, result);

    }

    _isForm() { return this.node.tagName == 'FORM'; }

    _setData() { this._data = new FormData(this.node); }

    _setEvent() {

        if (!this.attr.event) return false;

        let eventList = this.attr.event.split(',');
        let node = this.node;

        eventList.map( event => {
            node.addEventListener(event, this._eventWrapper.bind(this), false);
        });

        if (this.attr.interval)
            setInterval(this._eventWrapper.bind(this), this.attr.time);

        if (this.attr.time)
            setTimeout(this._eventWrapper.bind(this), this.attr.time);

    }

    _eventWrapper(e) {

        this._request(this.attr.href, this.attr.method);

        if (e) e.preventDefault();

    }

    _request(href, method) {

        let data = {
            method: method ? method : 'GET',
            headers: {'X-REQUESTED-WITH': 'XMLHttpRequest'},
        };

        if (data.method == 'POST') data.body = this._data;

        var href = href ? href : window.location.href;

        fetch(href, data)
            .then( res => {

                let responseType = this._response[this.attr.response]
                    ? this._response[this.attr.response]
                    : 'text';

                return res[this.attr.response]();

            })
            .then( res => {

                this._defaultHandler(res);

                if (JSON.parse(this.attr.state))
                    history.pushState({test: 'test'}, '', href);

            })
            .catch( err => {
                console.log(err);
            })

    }

    _defaultHandler(res) {

        if (!this.attr.container)
            this.node.innerHTML = res;
        else {
            let container = document.querySelector(this.attr.container);
            if (!container) return false;
            container.innerHTML = res;
        }

    }

}
