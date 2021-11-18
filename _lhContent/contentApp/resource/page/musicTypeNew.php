<html>
<head><title>Test</title></head>
<body>
<h1>Musical Type</h1>
<div class="label">Name:</div>
<div class="content" id="musicTypeName">
  <?php echo htmlspecialchars($_POST['musicTypeName']); ?>
</div>
<div class="label">Comment:</div>
<div class="content" id="musicTypeComment">
<?php echo htmlspecialchars($_POST['musicTypeComment']); ?>
</div>
</body>
</html>