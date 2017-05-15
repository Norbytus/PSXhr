# PSXhr

## Description
This is simple analog pjax(Push State Ajax) write in ES6 standart.

## Attribute list
* psxhr-container(String) - node element(eements) for update.
* psxhr-event(String) - event for call(click, scroll...).
* psxhr-href(String) - addres for request(if node is a or form and psxhr-href don't set. PSXhr take addres from a.href or form.action).
* psxhr-method(String) - by default GET(If this for and psxhr-method don't set, PSXhr take method form.method).
* psxhr-state(String) - by default false, if set true it push new state browser history.
* psxhr-callback(String) - callback which takes one parameter in format response.
* psxhr-promise(String) - callback which takes one parameter, Promise from fetch.
* psxhr-response(String) - form response for fetch(arrayBuffer, blob, formData, json, text).
* psxhr-time/interval(Integer) - maybe on of them, if set both of them will work only time.
## Requirments
Support ES6 standart or include polyfill

## Example
# First
 psxhr-method - method for request(by default it's GET)
 psxhr-href - addres for request
 psxhr-container - by default psxhr write response in current node.
 After click on node with class .action in node width class .replace will containt response from server.
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

# Second
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
# Third
This example will update node div.replace every 10 seconds and state in browser history
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
# Four
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
