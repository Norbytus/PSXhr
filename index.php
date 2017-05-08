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
    <div pjax-container="true" pjax-href="<?= $_SERVER['PHP_SELF']; ?>?get-date=true" pjax-event="click" pjax-state="true">
        This block must be restart
    </div>
    <form pjax-container="true" pjax-href="<?= $_SERVER['PHP_SELF']; ?>" pjax-event="submit" pjax-method="POST">
        <input id="" type="text" name="test" value="Hello">
        This block must be restart
        <input type="submit" value="send">
    </form>
</body>
<script src="src/pjax.js"></script>
<script>
let t = new PjaxContainer();
console.log(t);
</script>
</html>
