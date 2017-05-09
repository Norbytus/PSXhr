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
    <div pjax="true" pjax-href="<?= $_SERVER['PHP_SELF']; ?>?get-date=true" pjax-time="1000" pjax-response="text" pjax-event="click">
        This block must be restart
    </div>
    <form pjax="true" method="POST" pjax-method="POST" pjax-href="<?= $_server['php_self']; ?>" action="<?= $_server['php_self']; ?>" pjax-event="submit">
        <input id="" type="text" name="test" value="Hello">
        This block must be restart
        <input type="submit" value="send">
    </form>
</body>
<script src="src/pjax.js"></script>
<script>
PjaxElement.setPjax();
</script>
</html>
