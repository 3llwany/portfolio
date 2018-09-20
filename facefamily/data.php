<?php
    /*mysql_connect('localhost', 'root', '');
    mysql_select_db('gps_location');*/
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "gps_location";
    $conn = new mysqli($servername, $username, $password, $dbname);
    mysql_query("SET NAMES 'utf8'"); 
    mysql_query('SET CHARACTER SET utf8'); 
    //mysql_set_charset($conn, 'utf8');
    $sql ="SELECT * FROM direction";
    
    $id = 'id';
    $x  = 'x';
    $y  = 'y';
    $msg= 'msg';

    $result = $conn->query($sql);
    $rows =  $result->fetch_assoc();
    echo "X:" . $rows[$x]. '<br> Y:' .$rows[$y];
    
?> 