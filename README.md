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
* psxhr-promise(String) - callback which takes one parameter, Promise from fetch.
* psxhr-response(String) - form response for fetch(arrayBuffer, blob, formData, json, text).
* psxhr-time/interval(Integer) - maybe one of them, if set both of them will work only time.
## Requirments
Browser with support ES6 standart or include polyfill(fetch)

## Examples
# First
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

# Second
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
# Third
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
