/*global $, console, firebase, const, jQuery*/
jQuery(function ($) {
    "use strict";
    

    /* =========== Start Firebase Script =========== */
    var config = {
        apiKey: "AIzaSyCA5PHY8IvNva4MlaHECyrLn50tK_ajYlg",
        authDomain: "gradproject-3ed00.firebaseapp.com",
        databaseURL: "https://gradproject-3ed00.firebaseio.com",
        projectId: "gradproject-3ed00",
        storageBucket: "gradproject-3ed00.appspot.com",
        messagingSenderId: "415227009754"
    };
    
    firebase.initializeApp(config);
  
    /* =========== End Firebase Script =========== */

    const db = firebase.database();
    //var storage = firebase.storage();
    /*==============================================================================================================*/



    
    var user;
    var userId;
    
    
   


    /*==============================================================================================================*/
    //Start Chick if user Sign in or No
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            
             
            $('.hdn-reg').fadeOut(100); //.css('display', 'none'); //
            $('.hdn').fadeIn(100);
            
                var userId = firebase.auth().currentUser.uid;
           
            // add post
            $('#btnAddPost').click(function () {
                var PostContent = $('#textPost').val();
                var PostNumber = $('#postNumber').val();
                //==================================================
                // Start function to get gender type
                var PostType = getPostType(document.getElementById('AddNewPostForm'), 'post-type');

                function getPostType(form, name) {
                    var PostType;
                    // get list of radio buttons with specified name
                    var radios = form.elements[name];
                    // loop through list of radio buttons
                    for (var i = 0, len = radios.length; i < len; i++) {
                        if (radios[i].checked) { // radio checked?
                            PostType = radios[i].value; // if so, hold its value in val
                            break; // and break out of for loop
                        }
                    }
                    return PostType; // return value of checked radio or undefined if none checked
                } //end getRadioVal function
                // End function to get gender type
                //======================================================
                // Start  Function Of Date
                function formatDate(date) {
                var monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ];
                    var day = date.getDate();
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();

                    return day + ' ' + monthNames[monthIndex] /* + ' ' + year*/ ;
                }
                var PostTime = formatDate(new Date()) + " at " + new Date().toLocaleTimeString();
                
                
                // End  Function Of Date
                
                var postAothur;
                var aothurImg;
                var pic;
                
                createPostData(PostContent, PostNumber, PostTime, PostType, postAothur, aothurImg, pic);
                // Start Function To set Post Data In Database
                function createPostData(PostContent, PostNumber, PostTime, PostType, postAuthor, authorImg, pic) {
                    var newPost = db.ref('Posts/' + userId).push().set({
                        PostContent: PostContent,
                        PostNumber: PostNumber,
                        PostTime: PostTime,
                        PostType: PostType,
                        postAothur: username,
                        aothurImg: profile_pic,
                        pic: posturl,
                    });
                }
                document.getElementById('AddNewPostForm').reset();
                // End Function To set Post Data In Database
                
                
                
                //db.ref('Posts/' + userId).child('Img').set(urlImgPost);
                alert("Posted");
            });
            // end post         
            
            
        
    //==============================================================================================================
    // Start function retrive User Profile posts Data from Databas
    
    var newPostKey = firebase.database().ref('Posts/' + userId).push().key;
    var retrPostData = db.ref('Posts/' + userId);
    retrPostData.on("child_added", snap => {
        var content = snap.child("PostContent").val();
        var number = snap.child("PostNumber").val();
        var time = snap.child("PostTime").val();
        var type = snap.child("PostType").val();
        var authorName = snap.child("postAothur").val();
        var authorImg = snap.child("aothurImg").val();
        var picture = snap.child("pic").val();
        

        $('.profile_posts').prepend('<div class="post"> <header><div class="person-info"> <a href="#"> <img class ="img-responsive" src=' + authorImg + ' title="image"> <p class="name">' + authorName + '</p></a><div class="timelocation"><span class="time">' + time + ", " + '</span><span class="location">  6 oct, Egypt </span></div></div> <div class="post-edit"><img src = "img/MESSAGE-post.png" alt="chat" title="chat" style="cursor:pointer"> <p>' + type + '</p> <i class="fa fa-angle-down btn-down fa-lg"> </i> </div></header> <div class="clear" > </div> <div class="post-content">' + content + '</div> <div class="post-info"> <p class="number">' + number + '</p> </div> <div class="post-img"> <img class="img-responsive" id="img-idd" src="'+ picture +'"> </div><div class="post-option clear"> <button class="comment"> <i class="fa fa-comment"> </i>Comment </button><button class="share"> <i class="fa fa-share"> </i> Share </button> </div> <div class="post-opti-down"> <ul class="dropdown-menu"> <li> <a href="#"> Edit Post </a></li><li> <a href="#"> Save Post </a></li><li role="separator" class="divider"> </li> <li> <a href ="#"> Delete Post</a></li></ul> </div> </div>');
    }); // End function retrive User Profile posts Data from Databas
    //==============================================================================================================
    
            
      
            

     //==============================================================================================================
     // Start function retrive TimeLine All posts Data from Databas
     var newPostKey = firebase.database().ref('Posts/' + userId).push().key;
     var retrPostData = db.ref('Posts/' + userId);
     retrPostData.on("child_added", snap => {
         var content = snap.child("PostContent").val();
         var number = snap.child("PostNumber").val();
         var time = snap.child("PostTime").val();
         var type = snap.child("PostType").val();
         var authorName = snap.child("postAothur").val();
         var authorImg = snap.child("aothurImg").val();
         var picture = snap.child("pic").val();


         $('.timeline_posts').prepend('<div class="post"> <header><div class="person-info"> <a href="#"> <img class ="img-responsive" src=' + authorImg + ' title="image"> <p class="name">' + authorName + '</p></a><div class="timelocation"> <span class="time">' + time + ", " + '</span><span class="location"> at  6 oct, Egypt </span></div> </div> <div class="post-edit"><img src = "img/MESSAGE-post.png" alt="chat" title="chat" style="cursor:pointer"> <p>' + type + '</p> <i class="fa fa-angle-down btn-down fa-lg"> </i> </div></header> <div class="clear" > </div> <div class="post-content">' + content + '</div> <div class="post-info"> <p class="number">' + number + '</p> </div> <div class="post-img"> <img class="img-responsive" id="img-idd" src="'+ picture +'"> </div><div class="post-option clear"> <button class="comment"> <i class="fa fa-comment"> </i>Comment </button><button class="share"> <i class="fa fa-share"> </i> Share </button> </div> <div class="post-opti-down"> <ul class="dropdown-menu"> <li> <a href="#"> Edit Post </a></li><li> <a href="#"> Save Post </a></li><li role="separator" class="divider"> </li> <li> <a href ="#"> Delete Post</a></li></ul> </div> </div>');
     });
    // End function retrive TimeLine All posts Data from Databas
     //==============================================================================================================


            
            
            
            var username, profile_pic;
            
            
            // Start Function Return User Profile
            return firebase.database().ref('/Users/' + userId).once('value').then(function (snapshot) {
                 
                username = (snapshot.val() && snapshot.val().fullName);
                
                profile_pic = (snapshot.val() && snapshot.val().Img);
                
                var userNumber = (snapshot.val() && snapshot.val().userphone);
                
                var userFirstName = (snapshot.val() && snapshot.val().firstName);
                
                var userLastName = (snapshot.val() && snapshot.val().lastName);
                
                var userEmail = (snapshot.val() && snapshot.val().email);
                
                var userPassword = (snapshot.val() && snapshot.val().pass);
                
                
                $("#userName").text(userFirstName + ' ' + userLastName );
                $("#userNumber").text(userNumber);
                
                
                // return Profile Pic To Links
                $('#userImg').attr('src', profile_pic);
                $('#uImgNav').attr('src', profile_pic);
                $('#uImgNavH').attr('src', profile_pic);
                $('#uImgNavCh').attr('src', profile_pic);
                $('#uImgNavTline').attr('src', profile_pic);
                $('#uImgNavLo').attr('src', profile_pic);
                
                // navbar Links
                $("title#profTitle").text(username);
                $("#NavProfUserName").text(userFirstName);
                $("#home_name").text(userFirstName);
                $("#navUserNameChat").text(userFirstName);
                $("#navUserNameLoca").text(userFirstName);
                $("#navUserNameTimeLine").text(userFirstName);
                
                
                // Return Data To EDIT Profile
                $('#editfirstName').attr('placeholder', userFirstName);
                $('#editlastName').attr('placeholder', userLastName);
                $('#editnumber').attr('placeholder', userNumber);
                $('#editemail').attr('placeholder', userEmail);
                
            });// End Function Return User Profile
            
            
           
            
           
            
            // Start Upload Post To Database
            
            // End Upload Post To Database

        } else {
            // No user is signed in.
            window.alert("You are not log in");
            $('.hdn').fadeOut(100); //.css('display', 'none ! important'); //.fadeOut();
            $('.hdn-reg').fadeIn(100); //.css('display', 'inline-block');
        }
    });
    //End Chick if user Sign in or No
    /*==============================================================================================================*/

    /*==============================================================================================================*/
    /*========================================
         ==== Start Creat Profile ===
    ==========================================*/
    
    
    
    $('#creatProfile').click(function () {
        //==============================================================================================================
        // Start function to get gender type

        var gender = getRadioVal(document.getElementById('userType'), 'person-type');

        function getRadioVal(form, name) {
            var gender;
            // get list of radio buttons with specified name
            var radios = form.elements[name];
            // loop through list of radio buttons
            for (var i = 0, len = radios.length; i < len; i++) {
                if (radios[i].checked) { // radio checked?
                    gender = radios[i].value; // if so, hold its value in val
                    break; // and break out of for loop
                }
            }
            return gender; // return value of checked radio or undefined if none checked
        } //end getRadioVal function
        // End function to get gender type
        //==============================================================================================================
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var email = document.getElementById('email').value;
        var userphone = document.getElementById('number').value;
        var pass = document.getElementById('password').value;
        var fullName = firstName + " " + lastName;

        //==============================================================================================================

        // Start Creat Auth
        const auth = firebase.auth();
        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("You Get Some Errors: " + errorMessage);
                // $('#emailerror').text(errorMessage).css('color','#d80a0a');

            })
            .then(

                function () {

                    user = firebase.auth().currentUser;
                    userId = firebase.auth().currentUser.uid;
                    writeUserData(fullName, email, userphone, pass, firstName, lastName, gender);
                    // Start Function To set Data In Database
                    function writeUserData(fullName, email, userphone, pass, firstName, lastName, gender) {
                        var newUser = db.ref('Users/' + userId).set({
                            email: email,
                            pass: pass,
                            firstName: firstName,
                            lastName: lastName,
                            fullName: firstName + " " + lastName,
                            userphone: userphone,
                            gender: gender
                        });
                    } //End Function To set Data In Database
                    
                    if (user) { window.location = "profile.html"; } 
                    
                    // Set User Profile Pic
                    db.ref('Users/' + userId).child('Img').set(url);

                    
                    document.getElementById('form-profile').reset();
                    $(".modal, .nicescroll-rails, .modal-backdrop").fadeOut();
                   
                }); //End Then
    }); // end Submit function // end createProfile Function
    /*========================================
            ==== End Creat Profile ===
    ==========================================*/
    /*==============================================================================================================*/

    
    
      
        //=============================================================
        // Function update Profile Data
           $('editprofile').click(function(){
                
                alert("Done");

                var EfirstName = document.getElementById('editfirstName').value;
                var ElastName = document.getElementById('editlastName').value;
                var Eemail = document.getElementById('editemail').value;
                var Euserphone = document.getElementById('editnumber').value;
                var Epass = document.getElementById('editpassword').value;
                var EfullName = EfirstName + " " + ElastName;
               
               
                user = firebase.auth().currentUser;
                userId = firebase.auth().currentUser.uid;
               
                updateProfile(EfirstName, ElastName,  Eemail, Euserphone, EfullName);        
                // Start Function To set Data In Database
                function updateProfile(EfirstName, ElastName, userphone, EfullName) {
                    var newUser = db.ref('Users/' + userId).set({
                        firstName: EfirstName,
                        lastName: ElastName,
                        fullName: EfullName,
                        userphone: Euserphone,
                    });
                } 

           });
        
        // Function update Profile Data
        //=============================================================
        
        
    
 


    /*==============================================================================================================*/
    /*========================================
            ==== Start Login ===
    ==========================================*/

    $('#btnLogin').click(function () {
        var emailLogin = document.getElementById('emailLog').value;
        var passLogin = document.getElementById('passLog').value;
        const auth = firebase.auth();

        // Start Function To Sign In From Firbase Websit
        firebase.auth().signInWithEmailAndPassword(emailLogin, passLogin).then(function() {
            var user = firebase.auth().currentUser;     
            if (user){window.location="profile.html";}
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Error Login: " + errorMessage);
        });

        
            
        
        //document.getElementById('form-profile').reset();
        $(".modal, .nicescroll-rails, .modal-backdrop").fadeOut();
    });
    /*========================================
            ==== End Login ===
    ==========================================*/
    /*==============================================================================================================*/





    /*==============================================================================================================*/
    /*========================================
            ==== Start Log Out ===
    ==========================================*/
    $('#logOut').click(function () {

        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
            alert("Error LogOut: " + error);
        });
        /*window.alert('You LogOut Now')*/
        
        if ( !user){
            window.location = 'index.html';
        }

    });
    /*========================================
            ==== End Log Out ===
    ==========================================*/
    /*==============================================================================================================*/





    /*==============================================================================================================*/
    /*========================================
            ==== Start Send message ===
       ==========================================*/
    $('#sendMsg').click(function () {

        var msgEmail = document.getElementById('msgEmail').value;
        var msgName = document.getElementById('msgName').value;
        var msgPhone = document.getElementById('msgPhone').value;
        var msg = document.getElementById('msg').value;
        sendMessage(msgEmail, msgName, msgPhone, msg);
        document.getElementById('message').reset();


        // Start Function To set Data In Database
        function sendMessage(msgEmail, msgName, msgPhone, msg) {
            var newMsg = db.ref('Suggestions').push();
            newMsg.set({
                msgEmail: msgEmail,
                msgName: msgName,
                msgPhone: msgPhone,
                msg: msg,
            }); // end NewMsg Set data
        } // End Function To set Data In Database
    }); // end Send message
    /*========================================
            ==== End Send message ===
    ==========================================*/
    /*==============================================================================================================*/



    
    
        
        
   
    
    
    


 //===================================================
       // Start Upload User Profile Picture 
 //=====================================================      
    
    var url, files, names;
    var input_file = $("#userImgUploader");
    input_file.on("change", function () {
        var files = input_file.prop("files");
        var names = $.map(files, function (val) {
            return val.name;
        });

        $.each(names, function (i, name) {


            var userstorage = firebase.storage().ref('Users_Imgs').child('profile_pic/' + name);

            userstorage.put(files[0]).then(


                function getImgURL(snap) {
                    url = snap.downloadURL;
                    //db.ref('Users').child('Img').set(url);
                });
        });
    });

//===================================================
    
    
    
 //===================================================
       // Start Upload Post  Picture 
 //=====================================================      
    
    var posturl, postfiles, postnames;
    var uploadPostImg = $("#uploadPostImg");
    uploadPostImg.on("change", function () {
        var postfiles = uploadPostImg.prop("files");
        var postnames = $.map(postfiles, function (val) {
            return val.name;
        });

        $.each(postnames, function (i, name) {


            var userstorage = firebase.storage().ref('Post').child('Img/' + name);

            userstorage.put(postfiles[0]).then(


                function getImgURL(snap) {
                    posturl = snap.downloadURL;
                    //db.ref('Users').child('Img').set(posturl);
                });
        });
    });

//===================================================
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  

    /* دي الل شغال بيها والله 
         var url, name, names;
    var input_file = $("#userImgUploader");
    input_file.on("change", function () {
        var files = input_file.prop("files");
        var names = $.map(files, function (val) {
            return val.name;
        });

        $.each(names, function (i, name) {
            
            
            var userstorage = firebase.storage().ref('Users_Imgs').child('profile_pic/' + name);
            
            userstorage.put(files[0]).then(
                
                
                function getImgURL(snap) {
                    url = snap.downloadURL;
                    //db.ref('Users').child('Img').set(url);
                });
        });
    });
    */
    
    
    
    
    
    
    /*
    
//Start Upload Post Picture  
    var uploader = document.getElementById('uploadPostImg');
    uploader.onchange = funUloadImgPost;
    
    var pfile, pfileName, purl; 
    
    function funUloadImgPost() {
        pfile = this.files[0];
        pfileName = pfile.name;
        // Storage
        var storagePostRef = firebase.storage().ref('Posts_Imgs/' + pfileName.name);
        storagePostRef.put(pfile).then(getPostImgURL);
    }

    function getPostImgURL(snap) {
        purl = snap.downloadURL;
        //db.ref('Users').child('Img').set(url);
    }

    
  var urlImgPost, name, names;
     var uploadPostImg = $("#uploadPostImg");
    uploadPostImg.on("change", function () {
        var files = uploadPostImg.prop("files");
        var names = $.map(files, function (val) {
            return val.name;
        });

        $.each(names, function (i, name) {
            
            
            var userstorage = firebase.storage().ref('Posts').child('imgs/' + name);
            
            userstorage.put(files[0]).then(
                
                
                function getImgURL(snap) {
                    urlImgPost = snap.downloadURL;
                    //db.ref('Posts/' + userId).child('Img').set(urlImgPost);
                });
        });
    });
    
  //End Upload Post Picture
 //===================================================

    // ===========================================
      // Upload File
       var file;
        var btnUpload = document.getElementById('userImgUploader');
        btnUpload.addEventListener('change', function(e){
            file = e.target.files[0]; 
        });
    
       $('#creatProfile').click(function(){
           
           var storageRef = firebase.storage().ref('Users').child('profile_pic/' + file.name);
           var url;
           var task = storageRef.put(file).then(
                    function (snap){url = snap.downloadURL;}
                );
           //task.on('state_changed', function error (err){}, function copmlete() {});
           db.ref('Imgs').child('Profile').set('Img' + url);
           
           //set('IMGURL/' + url);

        });
    
    // ====================================================
     
         // This Old Function
     var uploader = $('#uploadPostImg');
    uploader.onchange = funUload();
    
    var file, fileName, url; 
    
    
    function funUload() {
        var files = uploader.prop("files");
        //var name = $.map(files, function(val) { return val.name; });
        //file = uploader.files;
        file = uploader.files;
        
        // Storage
        var storageRef = firebase.storage().ref('Users_Imgs').child('profile_pic/' + file.name);
        storageRef.put(file).then(getImgURL);
    }
    var url;
    function getImgURL(snap) {
        url = snap.downloadURL;
        //db.ref('Users').child('Img').set(url);
    }
    
//End Upload User Profile Picture 
// ===========================================
    
    

            
    */        
    
    
    
             
           
    
    
    

});
/*End Doc ready*/