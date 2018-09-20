<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
</head>
<body>
    
    <div id='show'></div>

    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.nicescroll.min.js"></script>
    <script>
           setInterval(function(){
               $('html').load('data.php');
           }, 3000) 
    </script>
</body>
</html>