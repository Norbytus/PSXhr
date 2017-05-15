<?php
if (isset($_GET['get-date'])) {

    echo uniqid();
    die();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <base href="/">
    <title></title>
</head>
<body>
    <div class="cont" psxhr="true" psxhr-href="<?= $_SERVER['PHP_SELF']; ?>?get-date=true" psxhr-time="1000" psxhr-promise="testPromis" psxhr-event="click">
        This block must be restart
    </div>
    <a psxhr="true" psxhr-container=".cont" href="<?= $_SERVER['PHP_SELF']; ?>?get-date=true" psxhr-event="click">Link</a>
    <form class="cont" psxhr="true" method="GET" action="<?= $_SERVER['PHP_SELF']; ?>" psxhr-state="true" psxhr-event="submit">
        <input id="" type="text" name="test" value="Hello">
        <input id="" type="text" name="tes[]" value="ello">
        <input id="" type="text" name="tes[]" value="Hello">
        This block must be restart
        <input type="submit" value="send" name="test">
    </form>
</body>
<script src="public/PSXhr.min.js"></script>
<script>
PSXhr.init();

function testPromis(promise) {

promise.then( res => {
    return res.text();
}).then( text => {
console.log(text)
}).catch( e => {
console.log(e);
})

}

</script>
</html>
