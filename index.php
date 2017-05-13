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
    <div psxhr="true" psxhr-href="<?= $_SERVER['PHP_SELF']; ?>?get-date=true" psxhr-time="1000" psxhr-response="text" psxhr-event="click">
        This block must be restart
    </div>
    <form psxhr="true" method="GET" action="<?= $_SERVER['PHP_SELF']; ?>" psxhr-state="true" psxhr-event="submit">
        <input id="" type="text" name="test" value="Hello">
        <input id="" type="text" name="tes[]" value="ello">
        <input id="" type="text" name="tes[]" value="Hello">
        This block must be restart
        <input type="submit" value="send" name="test">
    </form>
</body>
<script src="pjax/src/PSXhr.js"></script>
<script>
PSXhr.init();
</script>
</html>
