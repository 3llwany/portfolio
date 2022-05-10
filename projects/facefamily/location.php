<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- For Enternet Expoloer -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- For Mopile -->
    <title>Location</title>
    <link href="https://fonts.googleapis.com/css?family=Comfortaa" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/media.css">
    <link rel="icon" href="img/lOCATION.png">
    <!--[if lt IE 9]>
      <script src="js/html5shiv.min.js"></script>
      <script src="js/respond.min.js"></script>
    <![endif]-->
</head>

<body class="time-line-bdy">




    <!--=== Start NavBar ===-->
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <!--=== Start NavBar Top ===-->
        <section class="nav-top">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-6">
                        <div class="search hdn">
                            <form id="form_search">
                                <div class="input-group">
                                    <input type="text" class="form-control show_result"  placeholder="Search for...">
                                    <span class="input-group-btn">
                                    <button class="btn btn-default" id="btnSearch" type="button">
                                         <i class="fa fa-search fa-lg"></i>  
                                    </button>
                                  </span>
                                </div>
                                <!-- /input-group -->

                                <!--<div class="form-group">
                                    <input type="text" class="form-control" placeholder="Search">
                                   
                                </div>-->
                            </form>
                            
                                <!-- ================= Start Search Result Section ==================== -->
                            <div class="search_result col-xs-11 col-md-8" style="display: none">
                                <header>
                                    <div class="search_type">
                                       <!-- <button class="member active">Member</button>
                                        <button class="post">Post</button>                            
                                        <button class="edit">Edit</button> -->  
                                        <i class="fa fa-window-close fa-lg close_search_bdy" title="Close"></i>
                                    </div>                                    
                                   
                                </header>
                                <div class="body">
                                   <!-- <div class="person-info">
                                        <a href="profile.html">
                                            <img class="img-responsive" src="img/team/nav.png">
                                            <p class="name">Sayed Elwany</p>
                                        </a>
                                        <button class="add_member">Add</button>
                                    </div>

                                     <div class="person-info">
                                        <a href="profile.html">
                                            <img class="img-responsive" src="img/team/nav.png">
                                            <p class="name">Sayed Elwany</p>
                                        </a>
                                         <button class="add_member">Add</button>
                                    </div>
-->
                                </div>
                            </div>
                            <!-- ================= End Search Result Section ==================== -->
    
                        </div>
                    </div> 
                    <div class="col-xs-6 col-sm-6 txxt-center-xs">
                        <!--<div class="registration">
                            <a href="login">
                                <button class="login">LOG IN</button>
                           </a>
                            <a href="sinin">
                                <button class="signin">SIGN IN</button>
                           </a>
                        </div>-->
                        <div class="social hidden-xs">
                            <a href="https://www.facebook.com" target="_blank" class="facebook">
                            <i class="fa fa-facebook "></i>
                        </a>
                            <a href="https://www.twitter.com" target="_blank" class="twitter">
                            <i class="fa fa-twitter"></i>
                        </a>
                            <a href="https://www.gmail.com" target="_blank" class="plus">
                             <i class="fa fa-google-plus"></i>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--=== End NavBar Top ===-->

        <div class="container">
            <!-- =========  For Mobile Design and Logo  =======================  -->
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#xs-screen-navbar" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Face <span>Family</span></a>
            </div>
            <!--  =================    Start Links    ============================   -->
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="xs-screen-navbar">
                <ul class="nav navbar-nav navbar-">
                    <li><a href="index.html" class="link"> Home <span class="sr-only">(current)</span></a></li>

                    <li><a href="index.html#features" class="link">Features </a></li>
                    <li><a href="index.html#team" class="link">Team </a></li>
                    <li><a href="index.html#contact-us" class="link">Contact US </a></li>
                    <li class="profile hdn">
                        <a href="profile.html">
                            <img class="img-responsive" id="uImgNavLo" src="img/team/avatar.png">
                            <p class="name" id="navUserNameLoca">User</p>
                        </a>
                    </li>
                    <!-- ======  Start Dropdown  =============  -->
                    <li class="dropdown" hdn>
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> 
                            <i class="fa fa-chevron-circle-down"></i>    
                            <!--<span class="caret"></span>-->
                        </a>
                        <ul class="dropdown-menu">
                            <li id="logOut" class="logOut"><a>Log Out</a></li>
                        </ul>
                    </li>
                    <!-- ======  End Dropdown  =============  -->
                </ul>

                <ul class="nav navbar-nav navbar-right nav-icon hdn">
                    <li data-placement="top" data-toggle="tooltip" title="Time Line">
                        <a href="timeLine.html">
                            <img class="img-responsive" src="img/TIMELINE.png">
                        </a>
                    </li>
                    
                    <li class="active" data-placement="top" data-toggle="tooltip" title="Location">
                        <a href="location.php" class="location">
                            <img class="img-responsivelocation" src="img/lOCATION-nav.png">
                        </a>
                    </li>
                    <li data-placement="top" data-toggle="tooltip" title="Friends">
                        <a href="users.html">
                            <img class="img-responsive" src="img/members-btn.png">
                        </a>
                    </li>
                </ul>

                <!--<a class="login" href="#Login">Log In</a>
                <a class="signup" href="#Signup">Sign Up</a>
-->
                <!--  <form class="navbar-form navbar-left">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>             
-->
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <!--=== End NavBar =====-->
    
    
<!--=== Start Map =====--> 
<section class="map-section">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">

                <div id="map"></div>

            </div>

            <div class="col-md-4">
                <div class="msgAlert" id="msgAlert">
                    
                </div>
            </div>
        </div>
    </div>
</section>
<!--=== Start Map =====--> 


    <!--=== Start Footer ===-->
<footer class="text-center">
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <div class="copyright padding">
                        <a class="home" href="index.html">Face <span>Family</span></a>
                        <a href="#">Privacy |</a>
                        <a href="#">Terms&amp;Conditions</a>
                        <p>CopyRight&copy;2018 FaceFamily</p>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="sitemap padding">
                        <ul>
                            <li><a href="index.html" class="link">Home</a></li>
                            <li> <a href="index.html#features" class="link">Fetures</a></li>
                            <li><a href="index.html#team" class="link">Team</a></li>
                            <li><a href="index.html#contact-us" class="link">Countact Us</a></li>
                            <li><a href="timeLine.html" class="link hdn">Time line</a></li>
                            <li><a href="profile.html" class="link hdn">Profile</a></li>
                            
                        </ul>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="social">
                        <a href="#facebook" class="facebook">
                            <i class="fa fa-facebook"></i>
                            <p>Facebook</p>
                        </a>
                        <a href="#twitter" class="twitter">
                            <i class="fa fa-twitter"></i>
                            <p>Twitter</p>
                        </a>
                        <a href="#google-plus" class="plus">
                            <i class="fa fa-google-plus"></i>
                            <p>Gmail</p>
                        </a>
                        <p class="copyright">CopyRight&copy;2018 FaceFamily</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="designed_by text-center">
            Designed and Developed By <a href="https://www.facebook.com/3llwaNy" target="_blank" data-placement="top" data-toggle="tooltip" title="visit my facebook account">3llwaNy</a>
        </div>
    </footer>
    <!--=== End Footer ===-->



    <!--=== Start Button Scroll Top === -->

    <section class="scroll-top">
        <i class="fa fa-chevron-up fa-3x"></i>
    </section>

    <!--==== End Button Scroll Top ===-->

 <!--   <script>
        
        var ajax = new XMLHttpRequest();
        var method = "GET";
        var url = "php.php";
        var asynchronous = true;
        
        ajax.open(method, url, asynchronous);
        
        ajax.send();
    
        ajax.onreadystatechange = function() 
        {
            
            if (this.readyState == 4 && this.state == 200)
            {
                alert(this.responseText); 
            }
        }
        
    </script>-->
    
    
    
    
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.nicescroll.min.js"></script>
    <script src="js/main.js"></script>
    <!-- Start Firebase Database -->
    <!-- <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>--> 
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-database.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-functions.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-storage.js"></script>
    <script src="js/database.js"></script>
    <script async defer 
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5KWd_G-Rq5LscLbyE8GnrE26oVNNkJoI&callback=initMap"
        type="text/javascript">
    </script>
    <!--AIzaSyA5KWd_G-Rq5LscLbyE8GnrE26oVNNkJoI-->


    
    
    
    
    
<!--Start Get GPS Location From Database -->
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
    //echo "X:" . $rows[$x]. '<br> Y:' .$rows[$y];
    
?> 
<!--End Get GPS Location From Database -->

    
<!--Start Put Location In Map  -->
<script>
           
    
     var lat = parseFloat("<?php echo  $rows[$x] ?>");
    var lng = parseFloat("<?php echo  $rows[$y] ?>");
    var msg = "<?php echo  $rows[$msg] ?>";
    if (msg == false){
         $('.map-section .msgAlert').prepend('<div class="msg-content"> No Messages Yet.</div>')
    } else {
         $('.map-section .msgAlert').prepend('<div class="msg-content"> ' + msg + '</div>')
    }
   
    function initMap() {
        // The location of Uluru
        var uluru = {
            lat: lat,
            lng: lng
        };
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 17,
                center: uluru
            });
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
</script>

<!--Start Put Location In Map  -->
     
    <!-- End Firebase Database -->
 
</body>

</html>
