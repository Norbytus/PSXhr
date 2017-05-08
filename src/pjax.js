class PjaxContainer {

    constructor() {
        this._pool = [];
        this._getPjaxContainer();
    }

    _getPjaxContainer() {

        document.querySelectorAll('[pjax-container="true"]').forEach( node => {
            this._pool.push(new PjaxElement(node));
        });

    }

}

class PjaxElement {

    constructor(node) {
        this.attr = {};
        this.node = node;
        this._data = new FormData();
        this._setData();
        this._checkAttribute(node);
        this._setEvent();
    }

    _checkAttribute() {

        let attributeList = [ 'container', 'event', 'href', 'method', 'state' ];
        let result = {};
        attributeList.map( attr => {
            result[attr] = this.node.hasAttribute('pjax-' + attr)
                ? this.node.getAttribute('pjax-' + attr)
                : false;
        });
        this.attr = result;

    }

    _setData() {

        if (this.node.tagName == 'FORM')
            this._data = new FormData(this.node);

    }

    _setEvent() {

        if (!this.attr.event) return false;

        let eventList = this.attr.event.split(',');
        let node = this.node;

        eventList.map( event => {
            node.addEventListener(event, this._eventWrapper.bind(this), false);
        });

    }

    _eventWrapper(e) {

        this._Ajax(this.attr.href, this.attr.method);

        e.preventDefault();

    }

    _Ajax(href, method) {

        let data = {
            method: method ? method : 'GET',
            headers: {'X-REQUESTED-WITH': 'XMLHttpRequest'},
        };
        var href = href ? href : window.location.href;

        fetch(href, data)
            .then( res => {
                return res.text();
            })
            .then( res => {
                this.node.innerHTML = res;
                if (JSON.parse(this.attr.state)) {
                    history.pushState({test: 'test'}, '', href);
                }

            })
            .catch( err => {
                console.log(err);
            })

    }

}
