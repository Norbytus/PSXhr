# PSXhr

## Description
This is a simple analog of pjax(Push State Ajax) written in ES6 standard.

## Attributes list
* psxhr-container(String) - node element(or elements) for update.
* psxhr-event(String) - event for call(click, scroll...).
* psxhr-href(String) - address for request(if node is a form and psxhr-href is not set. PSXhr takes address from a.href or form.action).
* psxhr-method(String) - by default GET(if stay empty PSXhr will use form.method for this one).
* psxhr-state(String) - by default is false, in case of true it pushes new state to the browser history.
* psxhr-callback(String) - callback which takes one parameter as response.
* psxhr-response(String) - form response for fetch(arrayBuffer, blob, formData, json, text).
* psxhr-time/interval(Integer) - maybe one of them, if set both of them will work only time.
## Create in clean javascript
```javascript
let psx = document.querySelector('.some_node');
psx.container = document.querySelectorAll('.some_nodes'); //Analog psxhr-container attribute.
psx.event = 'click' //Analog psxhr-event attribute.
psx.href = 'some_link' //Analog psxhr-href attribute.
psx.method = 'GET/POST' //Analog psxhr-method attribute.
psx.state = false //Analog psxhr-state attribute.
psx.callback = response => {/*...*/} //Analog psxhr-callback attribute.
psx.response = 'json' //Analog psxhr-response attribute.
psx.time = '1000' //Analog psxhr-time attribute.
psx.interval = '1000' //Analog psxhr-interval attribute.

psx.before = response => {
    /*...*/
    return false // if function return false PSXhr stop on this momemt
}
psx.after = formatAnswer => {
    /*...*/
}
psx.error = error => {
    /*...*/
}

```
## Requirments
Browser with support ES6 standart or include polyfill(fetch)

## Examples
### First
 After click on node with class .action change contain node width class .replace.
```php
<?php
if (isset($_GET['some_get']))
    echo 'Hello world';
```
```html
<div class="replace"></div>
<div psxhr="true" class="action" psxhr-method="GET" psxhr-href="/?some-get" psxhr-container=".replace" psxhr-event="click">Cick me</div>
<div class="replace"></div>
<script src="/PSXhr.min.js"></script>
<script>
    PSXhr.init();
</script>
```

### Second
Examplae like first but insted node div.action tag a
```php
<?php
if (isset($_GET['some_get']))
    echo 'Hello world';
```
```html
<a psxhr="true" href="/?some-get" psxhr-container=".replace" psxhr-event="click">Click me</a>
<div id="replace"></div>
<script src="/PSXhr.min.js"></script>
<script>
    PSXhr.init();
</script>
```
### Third
This example will update node div.replace every 10 seconds and push new state in browser history
```php
<?php
if (isset($_GET['some_get']))
    echo 'Hello world';
```
```html
<a psxhr="true" psxhr-interval="10000" href="/?some-get" psxhr-container=".replace" psxhr-state="true">Click me</a>
<div id="replace"></div>
<script src="/PSXhr.min.js"></script>
<script>
    PSXhr.init();
</script>
```
### Four
After submit send from data by form.action
```php
<?php
if (isset($_POST['some_get']))
    echo 'Hello world';
```
```html
<form action="/send" method="POST" psxhr="true" psxhr-event="submit">
    <input type="text" name="Test" value="">
    <input type="submit" value="Send">
</form>
<script>
    PSXhr.init();
</script>
```
