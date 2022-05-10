/*global $, console, firebase, const, jQuery*/
// jQuery(function ($) {
   // "use strict";


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
    var storage = firebase.storage();
    /*==============================================================================================================*/


    var user;
    var userId;
    /*==============================================================================================================*/
    //Start Chick if user Sign in or No
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            var id;

            $('.hdn-reg').fadeOut(100); //.css('display', 'none'); //
            $('.hdn').fadeIn(100);

            var userId = firebase.auth().currentUser.uid;

            // Start Update Currunt User Pic
            $('#updataPic').click(function () {

                db.ref('Users/' + userId).child('Img').set(UpdateUrl).then(function () {
                    alert('Picture Updated successful.');
                }).catch(function (error) {
                    // An error happened.
                    alert('An error happened.')
                });
                location.reload();

            }); // End Update Currunt User Pic          

// ==========================================================================================================================
            // Start add post
            $('#btnAddPost').click(function () {
                var PostContent = $('#textPost').val();
                var PostNumber = $('#postNumber').val();
                //==================================================
                // Start function to get Post type
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
                // End function to get Post type
                //============================
                // Start  Function Of Date
                function formatDate(date) {
                    var monthNames = [
                    "Jan", "Feb", "Mar",
                    "Apr", "May", "Jun", "Jul",
                    "Aug", "Sep", "Oct",
                    "Nov", "Dec"
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
                var aothurid;
                var postId;
                var newPostKey;
                var PostLocatio = $('#location').find(":selected").text();

                // Start Function To set Post In database 
                function createPostData(PostContent, PostNumber, PostTime, PostType, postAuthor, authorImg, pic, aothurid, postId, PostLocatio) {
                    var newPost = db.ref('user_posts').push();
                    newPostKey = newPost.key;
                    newPost.set({
                        PostContent: PostContent,
                        PostNumber: PostNumber,
                        PostTime: PostTime,
                        PostType: PostType,
                        postAothur: username,
                        aothurImg: profile_pic,
                        pic: posturl,
                        aothurid: userId,
                        postId: newPostKey,
                        PostLocatio: PostLocatio,
                    });
                } //End funFunction To set Post In database 
                createPostData(PostContent, PostNumber, PostTime, PostType, postAothur, aothurImg, pic, aothurid, postId, PostLocatio);
                
                if (location == "Location") {
                    $('#btnAddPost').attr('disabled', 'disabled');
                } else {
                    $('#btnAddPost').attr('disabled', false);
                }
                //newPostKey = db.ref('user_posts').push().key; 
                document.getElementById('AddNewPostForm').reset();
                // End Function To set Post Data In Database
                //db.ref('Posts/' + userId).child('Img').set(urlImgPost);
                alert('Posted');
            });
            // end post        

//===========================================================================================================================

            // Start function retrive User Profile posts Data from Databas
            var retrPostData = db.ref('user_posts').orderByChild('aothurid').equalTo(userId);
            retrPostData.on("child_added", snap => {
                var content = snap.child("PostContent").val();
                var number = snap.child("PostNumber").val();
                var time = snap.child("PostTime").val();
                var type = snap.child("PostType").val();
                var authorName = snap.child("postAothur").val();
                var authorImg = snap.child("aothurImg").val();
                var picture = snap.child("pic").val();
                var id = snap.child("postId").val();
                var PostLoc = snap.child("PostLocatio").val();
                // Start Function Return Post author Name and Pic
                var returnUserPicAndName = db.ref('/Users/' + userId).once('value').then(function (snapshot) {
                    authorName = (snapshot.val() && snapshot.val().fullName);
                    authorImg = (snapshot.val() && snapshot.val().Img);
                });
                $('.profile_posts').prepend('<div class="post" id=_' + id + '> <header><div class="person-info"> <a href="#"> <img class ="img-responsive" src=' + authorImg + ' title="image"> <p class="name">' + authorName + '</p></a><div class="timelocation"><span class="time">' + time + ", " + PostLoc + '</span></div></div> <div class="post-edit"><img src = "img/MESSAGE-post.png" alt="chat" title="chat" style="cursor:pointer"> <p>' + type + '</p> <div class="dropdown"><!--<span class="caret"></span>--><i class="fa fa-angle-down btn-down dropdown-toggle fa-lg" data-target="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" id=' + id + ' data-target =.' + id + '></i><ul class="dropdown-menu  ' + id + '" id="dropdownMenu1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"><li> <a href="#" id="editPostBtn" data-toggle="modal" data-target="#updatPost" data-value="' + id + '"> Edit Report </a></li><li> <a id="del_pos" data-value="' + id + '"  data-toggle="modal" data-target="#delete-post"> Delete Report</a></li> </ul> </div> </div></header> <div class="clear" > </div> <div class="post-content">' + content + '</div> <div class="post-info"> <p class="number">' + number + '</p> </div> <div class="post-img"> <img class="img-responsive" id="img-idd" src="' + picture + '"> </div> <!--<div class="post-option clear"> <button class="comment"> <i class="fa fa-comment"> </i>Comment </button><button class="share"> <i class="fa fa-share"> </i> Share </button> </div>-->  </div>');
                // End Function Return Post author Name and Pic
       
                // Start Function Delet Post
                $('#del_pos').click(function () {
                    var post_Id = $(this).attr("data-value");
                    // Delete Post
                    $('#deletPost').click(function () {
                        var delet_Post = db.ref('user_posts/' + post_Id); //.orderByChild('postId').equalTo(post_Id);
                        delet_Post.remove();
                        $('#_' + id).remove();
                        $(".modal, .nicescroll-rails, .modal-backdrop").fadeOut();
                        $('body').css('overflow', 'auto');

                    }); ///end delete Post
                }); //end Function Post

                // ========== Start Update Post =============================
                var curr_post_Id;
                $('#editPostBtn').click(function () {
                    curr_post_Id = $(this).attr("data-value");
                    var PostData = db.ref('user_posts/' + curr_post_Id); //.orderByChild('postId').equalTo(post_Id);

                    PostData.once("value", snap => {
                        var content = snap.child("PostContent").val();
                        var number = snap.child("PostNumber").val();
                        var PostLoc = snap.child("PostLocatio").val();

                        $('#editContent').val(content);
                        $('#editPostNumber').val(number);
                        $('#updateLocation').val(PostLoc);
                    }); // End PostData
                });
                ///end Update Post Btn

                //Updata Main Post Data (Content, Location, Number) 
                $('#editMainData').click(function () {
                    var editContent = document.getElementById('editContent').value;
                    var editPostNumber = document.getElementById('editPostNumber').value;
                    var updateLocation = $('#updateLocation').find(":selected").text();
                    
                    var updatePostData = db.ref('/user_posts/' + curr_post_Id).update({
                        PostContent: editContent,
                        PostNumber: editPostNumber,
                        PostLocatio: updateLocation,
                    }).then(function () {
                        alert('Updated successful.');
                         db.ref('/user_posts').child('undefined').remove();
                    }).catch(function (error) {
                        // An error happened.
                        alert('An error happened.')
                    });
                    location.reload();
                }); //End Update Name and Phone

                // Start Update Post Type
                $('#updateType').click(function () {
                    var newType = getRadioVal(document.getElementById('updatePostType'), 'update-type');
                    function getRadioVal(form, name) {
                        var newType;
                        // get list of radio buttons with specified name
                        var radios = form.elements[name];
                        // loop through list of radio buttons
                        for (var i = 0, len = radios.length; i < len; i++) {
                            if (radios[i].checked) { // radio checked?
                                newType = radios[i].value; // if so, hold its value in val
                                break; // and break out of for loop
                            }
                        }
                        return newType; // return value of checked radio or undefined if none checked
                    } //end getRadioVal function
                    var newPostType = db.ref('user_posts/' + curr_post_Id).update({
                        PostType: newType,
                    }).then(function () {
                        alert('Report Type Updated successful.');
                    }).catch(function (error) {
                        // An error happened.
                        alert(error);
                    });
                    location.reload();
                });
                // End Update Post Type

                // Start Update Post Pic
                $('#updataPostPic').click(function () {
                    db.ref('user_posts/' + curr_post_Id).child('pic').set(UpdatePostUrl).then(function () {
                        alert('Picture Updated successful.');
                    }).catch(function (error) {
                        // An error happened.
                        alert(error)
                    });
                    location.reload();
                });
                // End Update Post Pic
                // End Update Post 
            }); // End function retrive User Profile posts Data from Databas
//===========================================================================================================================
            // Start function retrive TimeLine All posts Data from Databas
            var newPostKey = firebase.database().ref('Posts/' + userId).push().key;
            var retrPostData = db.ref('user_posts');
            retrPostData.on("child_added", snap => {
                var content = snap.child("PostContent").val();
                var number = snap.child("PostNumber").val();
                var time = snap.child("PostTime").val();
                var type = snap.child("PostType").val();
                var authorName = snap.child("postAothur").val();
                var authorImg = snap.child("aothurImg").val();
                var picture = snap.child("pic").val();
                var id = snap.child("postId").val();
                var PostLoc = snap.child("PostLocatio").val();
                var user_ID = snap.child("aothurid").val();

                if(authorImg == null && authorName==null){
                    
                } else {
                    $('.timeline_posts').prepend('<div class="post" id=_' + id + '> <header><div class="person-info"> <a href="users_profile.html" id="viewProfile" data-value="' + user_ID + '" data-toggle="modal" data-target="#showOther_Users"> <img class ="img-responsive" src=' + authorImg + ' title="image"> <p class="name">' + authorName + '</p></a><div class="timelocation"><span class="time">' + time + ", " + PostLoc + '</span></div></div> <div class="post-edit"><img src = "img/MESSAGE-post.png" alt="chat" title="chat" style="cursor:pointer"> <p>' + type + '</p> <div class="dropdown"><!--<span class="caret"></span>--><i class="fa fa-angle-down btn-down dropdown-toggle fa-lg" data-target="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" id=' + id + ' data-target =.' + id + '></i><ul class="dropdown-menu  ' + id + '" id="dropdownMenu1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"><li> <a href="#" id="hidePost" data-value="' + id + '"> Hide Report </a></li></ul></div> </div></header> <div class="clear" > </div> <div class="post-content">' + content + '</div> <div class="post-info"> <p class="number">' + number + '</p> </div> <div class="post-img"> <img class="img-responsive" id="img-idd" src="' + picture + '"> </div> <!--<div class="post-option clear"> <button class="comment"> <i class="fa fa-comment"> </i>Comment </button><button class="share"> <i class="fa fa-share"> </i> Share </button> </div>-->  </div>');
                }

                $('#_' + id).click(function () {
                    $($(this).data("target")).fadeToggle();
                });

                // Hide Time line Post ]
                $('#hidePost').click(function () {
                    $('#_' + id).fadeOut(900);

                }); // Hide Time line  Post

            });
            // End function retrive TimeLine All posts Data from Databas
            
//===========================================================================================================================
            // Start function To Show All USers
            //Return All users
            var AllUser = db.ref('Users');
            AllUser.on("child_added", snap => {
                        var name = snap.child("fullName").val();
                        var picture = snap.child("Img").val();
                        var gender = snap.child("gender").val();
                        var country = snap.child("country").val();
                        var user_id = snap.child("userId").val();

                        $('.allusers .usersList').prepend('<div class="person-info" id=' + user_id + '><a href="#" id="" data-value="' + user_id + '" data-toggle="modal" data-target="editProfile" class="show_profile"> <img class = "img-responsive"src =' + picture + '" ><p class = "name" >' + name + '</p></a> <button class="show_profile" id="show_profile" data-value="' + user_id + '" data-toggle="modal" data-target="#editProfile">Show Profile</button> <button class="add_member" id="addFriend' + user_id + '" data-value="' + user_id + '" data-friend-type=" ">Add Friend</button> </div>');

                        if (user_id == firebase.auth().currentUser.uid){
                            $('#' +firebase.auth().currentUser.uid).remove();
                        }

                        // Function Show Other User Profile
                        $('#show_profile').click(function () {

                            var ID = $(this).data('value');

                            //====================================================================
                            // Show Other User Data 
                            $('#user_prof_model .prof_info').prepend('<div class="col-xs-12 col-data"><div class="member-info text-center"> <div class="img"><img class="img-responsive" id="" src=" ' + picture + ' "> </div><div class="member-name"><h2 id="otheruserName">' + name + '</h2></div><div class="member-location"><i class="fa fa-map-marker"></i><span id="">' + country + '</span><br><i class="fa fa-transgender"></i><span id="">' + gender + '</span></div></div> </div>');
                            $('#user_prof_model .col-data:nth(1)').remove();
                            /*$('#user_prof_model .col-post:nth(1)').remove();*/

                            //====================================================================
                            //Return Others Posts
                            var content, number, time, PostLoc, id, postpic, authorImg, authorName, type;
                            //.orderByChild('aothurid').equalTo('BWRJ8SZE5VTrR640QspmexqRzrD3').on("child_added", snap => {
                            var othersPosts = db.ref('user_posts').orderByChild('aothurid').equalTo(ID).on("child_added", snap => {
                                content = snap.child("PostContent").val();
                                number = snap.child("PostNumber").val();
                                time = snap.child("PostTime").val();
                                type = snap.child("PostType").val();
                                authorName = snap.child("postAothur").val();
                                authorImg = snap.child("aothurImg").val();
                                postpic = snap.child("pic").val();
                                id = snap.child("postId").val();
                                PostLoc = snap.child("PostLocatio").val();
                                // Show Other User Posts 
                                if (content != null && authorName != null && authorImg) {
                                    $('#user_prof_model .other_profile_posts').prepend('<div class="post col-post" id=_' + ID + '> <header><div class="person-info"> <a href="users_profile.html" id="viewProfile" data-value="" data-toggle="modal" data-target="#showOther_Users"> <img class ="img-responsive" src=' + authorImg + ' title="image"> <p class="name">' + authorName + '</p></a><div class="timelocation"><span class="time">' + time + ", " + PostLoc + '</span></div></div> <div class="post-edit"><img src = "img/MESSAGE-post.png" alt="chat" title="chat" style="cursor:pointer"> <p>' + type + '</p> <div class="dropdown"><!--<span class="caret"></span>--><i class="fa fa-angle-down btn-down dropdown-toggle fa-lg" data-target="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" id=' + ID + ' data-target =.' + ID + '></i><ul class="dropdown-menu  ' + ID + '" id="dropdownMenu1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"><li> <a href="#" id="hidePost" data-value="' + ID + '"> Hide Report </a></li></ul></div> </div></header> <div class="clear" > </div> <div class="post-content">' + content + '</div> <div class="post-info"> <p class="number">' + number + '</p> </div> <div class="post-img"> <img class="img-responsive" id="img-idd" src="' + postpic + '"> </div> <!--<div class="post-option clear"> <button class="comment"> <i class="fa fa-comment"> </i>Comment </button><button class="share"> <i class="fa fa-share"> </i> Share </button> </div>-->  </div>');

                                    $('#user_prof_model .other_profile_posts .no_posts').remove();
                                    //$('#user_prof_model .col-post:nth()').remove(); 
                                } else {
                                    //$('#user_prof_model .other_profile_posts').remove(); 
                                    $('#user_prof_model .other_profile_posts').prepend('<div class="no_posts">No Posts Yet</div>');
                                    $('#user_prof_model .other_profile_posts .no_posts:nth(1)').remove();
                                    $('#user_prof_model .other_profile_posts .post').remove();
                                    // $('#_' + ID).remove();
                                } //End if

                                $('#close_profile').click(function(){
                                    $('#user_prof_model .other_profile_posts > div').remove();
                                });
                                
                                 $('.closeProf').click(function(){
                                    $('#user_prof_model .other_profile_posts > div').remove();
                                });
                                
                            }); //end Return Others Posts

                            if ($('#user_prof_model .other_profile_posts > div').attr('id') === "_" + ID) {

                            } else {
                                $("#user_prof_model .other_profile_posts div").remove();
                            }
                        }); // End Show Other User Profile

                        //====================================================================

                        //Start Function Add Frind 
                        var curr_state, other_id, curr_user_id, recievedRif, sentRif, req_type;
                        $('#addFriend' + user_id).click(function () {

                            var other_id = $(this).data('value');
                            var user = firebase.auth().currentUser;
                            var curr_user_id = user.uid;
                            var req_type;
                            
                // ======= Btn Click ============
                            
                            // Send request btn
                            if ($(this).attr('data-friend-type') == ' ') {
                                //var curr_btn = $(this);
                               
                                var recievedRif = db.ref('Friend_req/' + curr_user_id + '/' + other_id);

                                recievedRif.child('request_type').set('recieved');

                               var sentRif = db.ref('Friend_req/' + other_id + '/' + curr_user_id);

                                sentRif.child('request_type').set('sent');
                                
                                
                                $(this).attr('data-friend-type', 'req_sent');
                                
                                
                                
                            // Cancel request btn
                            } else if ($(this).attr('data-friend-type') == 'req_sent') {
                                
                                db.ref('Friend_req/' + curr_user_id + '/' + other_id).remove();
                                //.child('request_type').set('cancelled');
                                
                                db.ref('Friend_req/' + other_id + '/' + curr_user_id).remove();
                                    //.child('request_type').set('cancelled');
                                
                                
                                $(this).attr('data-friend-type', ' ');
                               
                            // Accept Request btn
                            } else if ($(this).attr('data-friend-type') == 'req_recieved') {
                                
                                var friendsListRif = db.ref('Friends/' + curr_user_id + '/' + other_id);
                                
                                friendsListRif.child('friendType').set('friend');
                                
                                var friendRif= db.ref('Friends/' + other_id + '/' + curr_user_id);
                                
                                friendRif.child('friendType').set('friend');
                                
                                // remove friend request
                                //db.ref('Friend_req/' + curr_user_id + '/' + other_id).child('request_type').set(' ');
                                //db.ref('Friend_req/' + other_id + '/' + curr_user_id).child('request_type').set('');
                                
                                db.ref('Friend_req/' + curr_user_id + '/' + other_id).remove();
                                db.ref('Friend_req/' + other_id + '/' + curr_user_id).remove();

                                
                                
                                $(this).attr('data-friend-type', 'friend');
                                $('#addFriend' + other_id).attr('data-friend-type', 'friend');
                                
                                
                            // Unfriend btn
                            } else if ($(this).attr('data-friend-type') == 'friend') {
                                db.ref('Friends/' + curr_user_id + '/' + other_id).remove();
                                db.ref('Friends/' + other_id + '/' + curr_user_id).remove();
                                db.ref('Friend_req/' + curr_user_id + '/' + other_id).remove();
                                db.ref('Friend_req/' + other_id + '/' + curr_user_id).remove();
                            }




                        });//End Btn Click
                
                //===== Get Other Users id Ref ==================//

                        var user = firebase.auth().currentUser;
                        var curr_user_id = user.uid;

                        //  get other users id from Request Ref
                        var users_id = db.ref('Friend_req/' + curr_user_id).on("child_added", function (snapshot) {

                            var otherUsers_id = snapshot.key;
                            
        //========= Friend_req Ref =============//
                            
                            // Start Sent and Cancel req
                            db.ref('Friend_req/').child(otherUsers_id + '/' + curr_user_id).on("value", snap => {

                                var req_type = snap.child("request_type").val();

                                // Request sent
                                if (req_type == 'sent') {
                                    
                                    curr_state = 'req-sent';
                                    
                                    if ($('#addFriend' + user_id).attr('data-value') == otherUsers_id) {
                                        $('#addFriend' + user_id).text('Cancel Request');
                                        $('#addFriend' + user_id).css('background', '#c93b2a');
                                        $('#addFriend' + user_id).attr('data-friend-type', 'req_sent');
                                    }
                                    
                                // Request recieved
                                } else if (req_type == "recieved") {

                                    curr_state = 'req-recieved';
                                    
                                    if ($('#addFriend' + user_id).attr('data-value') == otherUsers_id) {
                                        $('#addFriend' + user_id).text('Accept Request');
                                        $('#addFriend' + user_id).css('background', '#27ab7b');
                                        $('#addFriend' + user_id).attr('data-friend-type', 'req_recieved');
                                    } 
                                     
                                    
                                 
                                // Cansel request
                                } else /* if (req_type == null)*/ {

                                    
                                    
                                    curr_state= 'not-friend';
                                    
                                    if ($('#addFriend' + user_id).attr('data-value') == otherUsers_id) {
                                        $('#addFriend' + user_id).text('Add Friend');
                                        $('#addFriend' + user_id).css('background', '#6464ac');
                                        $('#addFriend' + user_id).attr('data-friend-type', ' ');
                                    }
                                }
                            }); // End Sent and recieved req
                            
                        }); // end get other users id from Request Ref


                    // ========= Friends Ref ==========
            
                    //get Other user id from Friends Ref
                             var users_id = db.ref('Friends/' + curr_user_id).on("child_added", function (snapshot) {

                            var otherUsers_id = snapshot.key;
                                 
                                 
                               // Accsept Request
                            db.ref('Friends/').child(otherUsers_id + '/' + curr_user_id).on("value", snap => {
                                var friendType = snap.child("friendType").val();
                                
                                if (friendType == 'friend') {
                                    
                                    curr_state = 'friend';
                                    
                                    if ( $('#addFriend' + user_id).attr('data-value') == otherUsers_id ) {
                                        $('#addFriend' + user_id).text('Unfriend');
                                        $('#addFriend' + user_id).css('background', '#27ab7b');
                                        $('#addFriend' + user_id).attr('data-friend-type', 'friend');
                                        
                                    }  
                                    
                                // UnFriend
                                } else {
                                    if ( $('#addFriend' + user_id).attr('data-value') == otherUsers_id ) {
                                        $('#addFriend' + user_id).text('Add friend');
                                        $('#addFriend' + user_id).css('background', '#6464ac');
                                        $('#addFriend' + user_id).attr('data-friend-type', ' ');
                                        
                                    } 
                                }
                                    
                            }); // end Accept Friend
                                 
                             });// End get Other user id from Friends Ref

                //End Function Add Frind
                //==============================================================
            }); //end retrurnAllUsers      
            
            // End function To Show All USers 
// ========================================================================================================================= 
            
    // Start Return My Friends List
            var user = firebase.auth().currentUser;
            var curr_user_id = user.uid;
            var users_id = db.ref('Friends/' + curr_user_id).on("child_added", function (snapshot) {

                var myFrindsIDs = snapshot.key;

                var searchUsers = db.ref('Users').orderByChild('userId').equalTo(myFrindsIDs);
                searchUsers.on("child_added", snap => {
                    var name = snap.child("fullName").val();
                    var firstname = snap.child("firstName").val();
                    var picture = snap.child("Img").val();
                    var user_id = snap.child("userId").val();
                    if (name !== null) {
                        $('.allusers .friends-list .no-frinds').remove();
                        $('.allusers .friends-list').prepend('<div class="person-info" id="' + user_id + '"> <a> <img class="img-responsive" src="' + picture + '"> <p class="name">' + name + '</p></a><button data-value="' + user_id + '" class="add_member" data-friend-type="friend" id=unFriend' + user_id + '>UnFriend</button></div>');
                    }
                    
                    $('#unFriend' +user_id).click(function(){
                        var unfriendUserId = $(this).data('value');
                        db.ref('Friends/' + curr_user_id + '/' + myFrindsIDs).remove();
                        db.ref('Friends/' + myFrindsIDs + '/' + curr_user_id).remove();
                        db.ref('Friend_req/' + curr_user_id + '/' + myFrindsIDs).remove();
                        db.ref('Friend_req/' + myFrindsIDs + '/' + curr_user_id).remove();
                        $('.allusers .friends-list #' + myFrindsIDs).remove();
                    });
                });
            });
    // End Return My Friends List 
            
// ========================================================================================================================= 
            
    //Start Saerch About Users
            // [1] Search Btn    
            $('#btnSearch').click(function () {
                var search_val = $('.show_result').val();
                $('.search .search_result').fadeIn();
                //Return All users
                var searchUsers = db.ref('Users').orderByChild('firstName').equalTo(search_val);
                searchUsers.on("child_added", snap => {
                    var name = snap.child("fullName").val();
                    var firstname = snap.child("firstName").val();
                    var picture = snap.child("Img").val();
                    var user_id = snap.child("userId").val();


                    if (typeof (name) == 'string') {
                        $('.search_result .body').prepend('<div class="person-info"> <a href="profile.html"> <img class="img-responsive" src="' + picture + '"> <p class="name">' + name + '</p></a><button class="add_member" data-value=" ' + user_id + '" id="addFriend' + user_id + '"data-friend-type=" ">Add Friend</button></div>');

                    } else {
                        $('.search_result .body').prepend('<div class="person-info">No Result for <strong><i> "' + search_val + '"</strong></i></div>');
                    }

                    //Start Function Add Frind 
                    var curr_state, other_id, curr_user_id, recievedRif, sentRif, req_type;
                    $('#addFriend' + user_id).click(function () {

                        var other_id = $(this).data('value');
                        var user = firebase.auth().currentUser;
                        var curr_user_id = user.uid;
                        var req_type;

                        // ======= Btn Click ============

                        // Send request btn
                        if ($(this).attr('data-friend-type') == ' ') {
                            //var curr_btn = $(this);

                            var recievedRif = db.ref('Friend_req/' + curr_user_id + '/' + other_id);

                            recievedRif.child('request_type').set('recieved');

                            var sentRif = db.ref('Friend_req/' + other_id + '/' + curr_user_id);

                            sentRif.child('request_type').set('sent');


                            $(this).attr('data-friend-type', 'req_sent');



                            // Cancel request btn
                        } else if ($(this).attr('data-friend-type') == 'req_sent') {

                            db.ref('Friend_req/' + curr_user_id + '/' + other_id).remove();
                            //.child('request_type').set('cancelled');

                            db.ref('Friend_req/' + other_id + '/' + curr_user_id).remove();
                            //.child('request_type').set('cancelled');


                            $(this).attr('data-friend-type', ' ');

                            // Accept Request btn
                        } else if ($(this).attr('data-friend-type') == 'req_recieved') {

                            var friendsListRif = db.ref('Friends/' + curr_user_id + '/' + other_id);

                            friendsListRif.child('friendType').set('friend');

                            var friendRif = db.ref('Friends/' + other_id + '/' + curr_user_id);

                            friendRif.child('friendType').set('friend');

                            // remove friend request
                            //db.ref('Friend_req/' + curr_user_id + '/' + other_id).child('request_type').set(' ');
                            //db.ref('Friend_req/' + other_id + '/' + curr_user_id).child('request_type').set('');

                            db.ref('Friend_req/' + curr_user_id + '/' + other_id).remove();
                            db.ref('Friend_req/' + other_id + '/' + curr_user_id).remove();



                            $(this).attr('data-friend-type', 'friend');
                            $('#addFriend' + other_id).attr('data-friend-type', 'friend');


                            // Unfriend btn
                        } else if ($(this).attr('data-friend-type') == 'friend') {
                            db.ref('Friends/' + curr_user_id + '/' + other_id).remove();
                            db.ref('Friends/' + other_id + '/' + curr_user_id).remove();
                            db.ref('Friend_req/' + curr_user_id + '/' + other_id).remove();
                            db.ref('Friend_req/' + other_id + '/' + curr_user_id).remove();
                        }

                    });
                }); // End searchUsers
            }); // End Btn Search    
            
           
            // Stsrt Search By Enter Key
          /*  $(".show_result").on("keydown", function (e) {
                if (e.which === 13) { // enter key
                    e.preventDefault(); // prevents linebreak

                    var search_val = $('.show_result').val();

                    $('.search .search_result').fadeToggle();
                    //Return All users
                    var searchUsers = db.ref('Users').orderByChild('firstName').equalTo(search_val);

                    searchUsers.on("child_added", snap => {
                        var name = snap.child("fullName").val();
                        var firstname = snap.child("firstName").val();
                        var picture = snap.child("Img").val();
                        var this_userid = snap.child("userId").val();
                        

                        if (name == null)
                        {
                            $('.search_result .body').prepend('<div class="person-info">No User "' + search_val + '"</div>');
                        } else 
                            {
                                 $('.search_result .body').prepend('<div class="person-info"> <a href="profile.html"> <img class="img-responsive" src="' + picture + '"> <p class="name">' + name + '</p></a><button class="add_member" data-value=" '+ this_userid +'">Add Friend</button></div>');
                           }

                    });
                }
            }); */// End Search By Ener Key
            // ------------------------------------- 
            // End function To Saarch About Users

//========================================================================================================================   
            // Start Function Return currunt User Profile Data

            var username, profile_pic;
            var returnCurrUserData = db.ref('/Users/' + userId).once('value').then(function (snapshot) {

                username = (snapshot.val() && snapshot.val().fullName);

                profile_pic = (snapshot.val() && snapshot.val().Img);

                var userid = (snapshot.val() && snapshot.val().userId);
                
                var userNumber = (snapshot.val() && snapshot.val().userphone);

                var userFirstName = (snapshot.val() && snapshot.val().firstName);

                var userLastName = (snapshot.val() && snapshot.val().lastName);

                var userEmail = (snapshot.val() && snapshot.val().email);

                var userPassword = (snapshot.val() && snapshot.val().pass);
                var userCountry = (snapshot.val() && snapshot.val().country);

                $("#userName").text(userFirstName + ' ' + userLastName);
                $("#userNumber").text(userNumber);
                $("#user_country").text(userCountry);
                $('#updateCountry').val(userCountry);
                $('.btnFriendType').attr('data-value', userId);
                $('.btnFriendType').attr('id', 'reciFriendReq' + userId);


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
                $('#editfirstName').val(userFirstName);
                $('#editlastName').val(userLastName);
                $('#editnumber').val(userNumber);
                //$('#editemail').val(userEmail);
                $('#updateCountry').find(userCountry)

            }); // End Function Return User Profile


//===========================================================================================================================

            // ========= Start Update Currunt User Profile Pic ==========    
            var UpdateUrl, files, names;
            var fileUpdate = $("#updateUserPic");
            fileUpdate.on("change", function () {
                var files = fileUpdate.prop("files");
                var names = $.map(files, function (val) {
                    return val.name;
                });
                $.each(names, function (i, name) {
                    var userstorage = firebase.storage().ref('UsersPics/' + userId).child(name);
                    userstorage.put(files[0]).then(
                        function getImgURL(snap) {
                            UpdateUrl = snap.downloadURL;
                            //db.ref('Users').child('Img').set(url);
                        });
                });
            });
            // ========= End Update Currunt User Profile Pic ==========
//=========================================================================================================================


        } else {

            // No user is signed in.
            //window.alert("You are not log in");
            $('.hdn').fadeOut(100); //.css('display', 'none ! important'); //.fadeOut();
            $('.hdn-reg').fadeIn(100); //.css('display', 'inline-block');
        }
    });
    //End (onAuthStateChanged) Chick if user Sign in or No
//=========================================================================================================================
    //======== Start Creat Profile =========
    
    

   
    
    $('#creatProfile').click(function () {
                //AddNewUser();



                // Start function to get gender type
                // function AddNewUser() {
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
                //=======================================
                var firstName = document.getElementById('firstName').value;
                var lastName = document.getElementById('lastName').value;
                var email = document.getElementById('email').value;
                var userphone = document.getElementById('number').value;
                var pass = document.getElementById('password').value;
                var fullName = firstName + " " + lastName;
                var country = $('#country').find(":selected").text();
                //======================================
                // Start Creat Auth
                const auth = firebase.auth();
                auth.createUserWithEmailAndPassword(email, pass).catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorMessage);
                        // $('#emailerror').text(errorMessage).css('color','#d80a0a');
                    }).then( function() {
                    
                    user = firebase.auth().currentUser;
                    userId = firebase.auth().currentUser.uid;
              
                    writeUserData(fullName, email, userphone, pass, firstName, lastName, gender, userId, country);
                    // Start Function To set Data In Database
                    function writeUserData(fullName, email, userphone, pass, firstName, lastName, gender, userId, country) {
                        var newUser = db.ref('Users/' + userId).set({
                            email: email,
                            pass: pass,
                            firstName: firstName,
                            lastName: lastName,
                            fullName: firstName + " " + lastName,
                            userphone: userphone,
                            gender: gender,
                            userId: userId,
                            country: country
                        }); // End NewUser
                    
                    } //End Function To set Data In Database
                    
                    
                      
/*
                        // Start Upload User Profile Picture 
                        //=====================================================      
                        var url, files, names;
                        var input_file = $("#userImgUploader");
                        var files = input_file.prop("files");
                        var names = $.map(files, function (val) {
                            return val.name;
                        });
                        $.each(names, function (i, name) {
                            var userstorage = firebase.storage().ref('pics').child(name);
                            userstorage.put(files[0]).then(
                                function getImgURL(snap) {
                                    url = snap.downloadURL;
                                    //db.ref('Users').child('Img').set(url);
                                });
                        });
                        //===================================================

                    */
             
             /*       //=====================================================      
                            // Start Upload User Profile Picture 
                            var url, files, names;
                            var input_file = $("#userImgUploader");
                            //input_file.click(function () {
                            var files = input_file.prop("files");
                            var names = $.map(files, function (val) {
                                return val.name;
                            });
                            $.each(names, function (i, name) {
                
                            var userstorage = firebase.storage().ref('pics/' + userId).child( name);
                            userstorage.put(files[0]).then(
                                function getImgURL(snap) {
                                    url = snap.downloadURL;
                                    db.ref('Users/' + userId).child('Img').set(url);
                                    //db.ref('Users').child('Img').set(url);
                                });
                        });
                        // End Upload User Profile Picture 
                    //=================================================== 
                            
                      */
                            
                    // Set User Profile Pic
                    db.ref('Users/' + userId).child('Img').set(url);
                    
                    //document.getElementById('form-profile').reset();
                    $(".modal, .nicescroll-rails, .modal-backdrop").fadeOut();
                    
                    var user = firebase.auth().currentUser; 
                    user.sendEmailVerification().then(function () {
                        // Email sent.
                        alert('Please Review Your Email To Verify it.')
                    }).catch(function (error) {
                        // An error happened.
                    });// end Verification
                            
                    if (user) {
                        window.location = "timeline.html";
                    }
                            
                }); //End Then
      
            
        
        //} // End Function Add New User
}); //End Create Profile btn click
//=================================================================================================================
    
    //=== == === Function update Profile Data === === === === === === ===

    // Start Update Currunt User Name and Phone
    $('#updataName').click(function () {

        var EfirstName = document.getElementById('editfirstName').value;
        var ElastName = document.getElementById('editlastName').value;
        var Euserphone = document.getElementById('editnumber').value;
        var EfullName = EfirstName + " " + ElastName;
        var updateCountry = $('#updateCountry').find(":selected").text();

        var user = firebase.auth().currentUser;
        var userId = user.uid;

        var updateUserName = db.ref('Users/' + userId).update({
            firstName: EfirstName,
            lastName: ElastName,
            userphone: Euserphone,
            fullName: EfirstName + ' ' + ElastName,
            country: updateCountry,

        }).then(function () {
            alert('Updated successful.');
        }).catch(function (error) {
            // An error happened.
            alert(error)
        });
        location.reload();
    }); //End Update Currunt User Name and Phone

    // Start Update Currunt User Email
    $('#updataEmail').click(function () {

        var Eemail = document.getElementById('editemail').value;
        var user = firebase.auth().currentUser;
        var userId = user.uid;

        //Update Email in Auth
        user.updateEmail(Eemail).then(function () {
            // Email Changed 
            // Then Verification

            // Start Verification New Email
            var user = firebase.auth().currentUser;
            user.sendEmailVerification().then(function () {
                // Email sent.
                // then update in DB

                // update Email In Database
                var updateUseremail = db.ref('Users/' + userId).update({

                    email: Eemail,

                }).then(function () {
                    $('.mail-err').text('Email Updated successful, Please Review Your Email To Verify it.');
                    $('.mail-err').css("color", '#3c763d');


                }).catch(function (error) { //updateUseremail
                    // An error happened.
                    $('.mail-err').text(error);
                    $('.mail-err').css("color", '#ec3823');
                });
            }).catch(function (error) { //sendEmailVerification
                // An error happened.
                $('.mail-err').text(error);
                $('.mail-err').css("color", '#ec3823');
            });

        }).catch(function (error) { //updateEmail
            // An error happened.
            $('.mail-err').text(error);
            $('.mail-err').css("color", '#ec3823');
        });
    }); // End Update Currunt User Email   

    // Disable Btn Update Email If Input Empty
    $('#updataEmail').prop('disabled', true);
    $('#editemail').keyup(function () {
        $('#updataEmail').prop('disabled', this.value == "" ? true : false);
    });


    // Start Update Currunt User Password
    $('#updataPass').click(function () {

        var Epass = document.getElementById('editpassword').value;
        var Eemail = document.getElementById('editemail').value;
        var user = firebase.auth().currentUser;
        var userId = user.uid;
        var newPassword = Epass;

        user.updatePassword(newPassword).then(function () {
            var updateUserPass = db.ref('Users/' + userId).update({
                pass: Epass,
            }).then(function () {
                $('#editpassword').val('');
                /*$('#oldPass').val('');
                $('#oldPass').css("border-color", '#ccc')*/
                ;
                $('.error-pass').text('Password Updated successful.');
                $('.error-pass').css("color", '#3c763d');
            }).catch(function (error) {

                $('.error-pass').text(error)

            });
        }).catch(function (error) {
            $('.error-pass').text(error)
        });
    }); //End Update Password

    // Start Forget User Password 
    $('#resetPass').click(function () {
        var auth = firebase.auth();
        var emailAddress = document.getElementById('emailSentReq').value;
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent
            $('.error-pass').css("color", '#3c763d');
            $('.error-pass').text('Email Sent. Review Your Email Now');
        }).catch(function (error) {
            // Error happend
            $('.error-pass').css({
                "color": '#ec3823'
            });
            $('.error-pass').text(error)
        });
    });

    // Disable Btn Reset Password If New Pass Is Empty
    $('#resetPass').prop('disabled', true);
    $('#emailSentReq').keyup(function () {
        $('#resetPass').prop('disabled', this.value == "" ? true : false);
    });

    //End Forget Password By Email

    // ckick Old Password is correct To Reset pass
    /*
    $('#oldPass').blur(function () {
        var inptOldPassword = $('#oldPass').val();

        var user = firebase.auth().currentUser;
        var userId = user.uid;
        firebase.database().ref('Users/' + userId).on("value", snap => {
            var oldPassword = snap.child("pass").val();
            if (inptOldPassword.length == 0) {
                return true;
            } else if (inptOldPassword == oldPassword) {
                $('#editpassword').attr('disabled', false);
                $('#editpassword').focus();
                $('.error-pass').text(' ');
                $('#oldPass').css({
                    "border-color": '#ccc',
                });
            } else {
                $('#editpassword').attr('disabled', true);
                $('#oldPass').focus();
                $('#oldPass').css({
                    "border-color": '#fb0c17',
                });
                $('.error-pass').text('Please Enter Correct Password');
            }
        });

    }); // End ckick Old Password is correct To change pass
    */

    // Disable Btn Reset Password If New Pass Is Empty
    $('#updataPass').prop('disabled', true);
    $('#editpassword').keyup(function () {
        $('#updataPass').prop('disabled', this.value == "" ? true : false);
    });

    //======>> Update Pic In onAuthStateChanged    

    // Start Update Currunt User Gender
    $('#updataGender').click(function () {

        var user = firebase.auth().currentUser;
        var userId = user.uid;
        // Start function to get gender type
        var UpGender = getRadioVal(document.getElementById('updateUserType'), 'update-gender');

        function getRadioVal(form, name) {
            var UpGender;
            // get list of radio buttons with specified name
            var radios = form.elements[name];
            // loop through list of radio buttons
            for (var i = 0, len = radios.length; i < len; i++) {
                if (radios[i].checked) { // radio checked?
                    UpGender = radios[i].value; // if so, hold its value in val
                    break; // and break out of for loop
                }
            }
            return UpGender; // return value of checked radio or undefined if none checked
        } //end getRadioVal function
        // End function to get gender type
        var newGender = db.ref('Users/' + userId).update({
            gender: UpGender
        }).then(function () {
            alert('Gender Updated successful.');
        }).catch(function (error) {
            // An error happened.
            alert('An error happened.')
        });
        location.reload();
    }); // End Update Currunt User Gender
    //= End Function update Profile Data ========

//===========================================================================================================================


    //==== Start Delete Currunt User Account ===
    $('#deleteUser').click(function () {
        var user = firebase.auth().currentUser;
        var userId = user.uid;
        user.delete().then(function () {
            var delCurrUser = db.ref('Users/' + userId);
            delCurrUser.remove();
            alert("Accound Deleted");
            window.location = 'index.html';
            // User deleted.
        }).catch(function (error) {
            // An error happened.
            alert(error);
        });
    });
    //==== End Delete Currunt User Account ===
//===========================================================================================================================


    //==== Start Login ===
    $('#btnLogin').click(function () {
        var emailLogin = document.getElementById('emailLog').value;
        var passLogin = document.getElementById('passLog').value;
        const auth = firebase.auth();

        // Start Function To Sign In From Firbase Websit
        firebase.auth().signInWithEmailAndPassword(emailLogin, passLogin).then(function () {
            var user = firebase.auth().currentUser;
            if (user) {
                window.location = "profile.html";
            }
            $(".modal, .nicescroll-rails, .modal-backdrop").fadeOut();
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
        //document.getElementById('form-profile').reset();
    });
    //==== End Login ===

//==========================================================================================================================

    //==== Start Log Out ===
    $('#logOut').click(function () {

        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
            alert(error);
        });
        /*window.alert('You LogOut Now')*/

        if (!user) {
            window.location = 'index.html';
        }

    });
    //=== End Log Out ===

//===========================================================================================================================


    //==== Start Send Suggestions ===
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
            }); // end Suggestions Set data
        } // End Function To set Data In Database
    }); // end Send Suggestions
    //==== End Send Suggestions ===
//==========================================================================================================================

    
    //$('#click').click(function () {
            
                // Start Upload User Profile Picture 
                //=====================================================      
                var url, files, names;
                var input_file = $("#userImgUploader");
                input_file.on('change',function () {
                        var files = input_file.prop("files");
                        var names = $.map(files, function (val) {
                            return val.name;
                        });
                        $.each(names, function (i, name) {
                            var userstorage = firebase.storage().ref('user_profile_pic').child(name);
                            userstorage.put(files[0]).then(
                                function getImgURL(snap) {
                                    url = snap.downloadURL;
                                    //db.ref('Users').child('Img').set(url);
                                });
                        });
                   });//end on change
                
                    //===================================================
                
       // });
    

    
    //var x = $("#userImgUploader").val().replace('C:\\fakepath\\', '');
 
    
//==========================================================================================================================


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

//========================================================================================================================== 
 
  // Function moved to auth

      // ========= Start Update Currunt User Profile Pic ==========    
        var UpdateUrl, files, names;
        var fileUpdate = $("#updateUserPic");
        fileUpdate.on("change", function () {
            var files = fileUpdate.prop("files");
            var names = $.map(files, function (val) {
                return val.name;
            });
            $.each(names, function (i, name) {
                var userstorage = firebase.storage().ref('Users_Imgs').child('profile_pic/' + name);
                userstorage.put(files[0]).then(
                    function getImgURL(snap) {
                        UpdateUrl = snap.downloadURL;
                        //db.ref('Users').child('Img').set(url);
                    });
            });
        });
      // ========= Start Update Currunt User Profile Pic ==========
      

//========================================================================================================================
    // ========= Start Update Post Pic ==========    
    var UpdatePostUrl, files, names;
    var FileUpdatePostPic = $("#fileUpditPostPic");
    FileUpdatePostPic.on("change", function () {
        var files = FileUpdatePostPic.prop("files");
        var names = $.map(files, function (val) {
            return val.name;
        });
        $.each(names, function (i, name) {
            var postStorage = firebase.storage().ref('Post').child('Img/' + name);
            postStorage.put(files[0]).then(
                function getImgURL(snap) {
                    UpdatePostUrl = snap.downloadURL;
                    //db.ref('Users').child('Img').set(url);
                });
        });
    });
    // ========= End Update Post Pic ==========

//========================================================================================================================

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
    
    var X, Y;
    var retrnGPSLocation = db.ref('GPS_location/').on("value", snap => {
        
         var lat = snap.child("Latitude").val();
         var long = snap.child("Longitude").val();
        X = lat;
        Y = long;
        //alert ("Lat: " + X + ' -- Long: ' + Y);
     });


//});
/*End Doc ready*/

/* Google Maps
------------------------------------------------*/

/*var X = attitude;
var Y = amputee;*/
// Initialize and add the map
function initMap() {
    
     /*$.get('https://ipinfo.io', function(response){
            alert(response.loc);
        }, 'jsonp');*/
    
  // The location of Uluru
  var uluru = {lat: 30.0355, lng: 31.2230};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 8, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}  

       