/*global $, console, firebase, const, jQuery*/
/*jQuery(function ($) {
    "use strict";*/
/* =========== Start Firebase Script =========== */

var config = {
    apiKey: "AIzaSyDEF5c4VV3dnK83rowpJ0_kOqwBP5LXpRk",
    authDomain: "face2-second-mail.firebaseapp.com",
    databaseURL: "https://face2-second-mail.firebaseio.com",
    projectId: "face2-second-mail",
    storageBucket: "face2-second-mail.appspot.com",
    messagingSenderId: "747460706809"
};
firebase.initializeApp(config);
/* =========== End Firebase Script =========== */

const db = firebase.database();









/*
    set(data). Edit Data;
    push(newdata) Put New Data
    on() get data
*/

//Start Chick if user Sign in or No
firebase.auth().onAuthStateChanged(function (user) {


    if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        if (user != null) {
            $('.hdn-reg').fadeOut(100); //.css('display', 'none'); // 
            $('.hdn').fadeIn(100); //.css('display', 'inline ! important'); //.fadeIn();

            var userEmail = user.email;
            //alert('You are login and Your Email is: ' + userEmail);
        }
    } else {
        // No user is signed in.
        window.alert("You are not log in");
        $('.hdn').fadeOut(100); //.css('display', 'none ! important'); //.fadeOut();
        $('.hdn-reg').fadeIn(100); //.css('display', 'inline-block');
    }
});
//End Chick if user Sign in or No





/*========================================
     ==== Start Creat Profile ===
==========================================*/
$('#creatProfile').click(function () {

    // Start function to get gender type
    var gender = getRadioVal(document.getElementById('form-profile'), 'post-type');

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

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var phoneNum = document.getElementById('phoneNum').value;
    var pass = document.getElementById('password').value;
    var fullName = firstName + " " + lastName;
    createProfile(fullName, email, phoneNum, pass, gender);
    document.getElementById('form-profile').reset();
    $(".modal, .nicescroll-rails, .modal-backdrop").fadeOut();

    // Start Creat Auth
    const auth = firebase.auth();
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error Create Profile: " + errorMessage);
    });
    // End Creat Auth
}); // end Submit function 

// Start Function To set Data In Database
function createProfile(fullName, email, phoneNum, pass, gender) {
    var newUser = db.ref('users').push();
    newUser.set({
        /*firstName: firstName,
        lastName: lastName,*/
        email: email,
        phoneNum: phoneNum,
        pass: pass,
        gender: gender,
        fullName: fullName
    });
    // End Function To set Data In Database

} // end createProfile Function
/*========================================
        ==== End Creat Profile ===
==========================================*/









/*========================================
        ==== Start Login ===
==========================================*/

$('#btnLogin').click(function () {
    var emailLogin = document.getElementById('emailLog').value;
    var passLogin = document.getElementById('passLog').value;
    const auth = firebase.auth();

    // Start Function To Sign In From Firbase Websit
    firebase.auth().signInWithEmailAndPassword(emailLogin, passLogin).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error Login: " + errorMessage);
    });

    /*   // Start chick if signed in or no
        var user = firebase.auth().currentUser;
        if (user) {
            // User is signed in.
            window.alert("signed In");
        } else {
            // No user is signed in.
            window.alert("Not signed In");
        }    
        // End chick if signed in or no
        
        // End Function To Sign In From Firbase Websit
*/

    document.getElementById('form-profile').reset();
    $(".modal, .nicescroll-rails, .modal-backdrop").fadeOut();
});
/*========================================
        ==== End Login ===
==========================================*/









/*========================================
        ==== Start Log Out ===
==========================================*/
$('.logOut').click(function () {

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
        alert("Error LogOut: " + error);
    });
    /*window.alert('You LogOut Now')*/

});
/*========================================
        ==== End Log Out ===
==========================================*/








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
        var newMsg = db.ref('Messages').push();
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








/*    //Start Add Post 
        $('#btnAddPost').click(function () {
            var textPost = document.getElementById('textPost').value;
            var postNumber = document.getElementById('postNumber').value;
            var bap = document.getElementById('btnAddPost').value;
            window.alert(textPost);
        });
        // End Add Post */


/*
});
*/
/*End Doc ready*/
