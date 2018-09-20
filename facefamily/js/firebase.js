//====================================================================================/    
// Start: Import Firebase Database 
// Initialize 

var config = {
    apiKey: "AIzaSyCA5PHY8IvNva4MlaHECyrLn50tK_ajYlg",
    authDomain: "gradproject-3ed00.firebaseapp.com",
    databaseURL: "https://gradproject-3ed00.firebaseio.com",
    projectId: "gradproject-3ed00",
    storageBucket: "gradproject-3ed00.appspot.com",
    messagingSenderId: "415227009754"
};
firebase.initializeApp(config);
// End: Import Firebase Database
//====================================================================================/

const db = firebase.database();


/*=====================================
    Start Sign Up And Creat Profile
=====================================*/
var creatProfile = document.getElementById('creatProfile');

creatProfile.addEventListener('click', e => {
    var email = document.getElementById('email').value,
        pass = document.getElementById('password').value;
        /*firstName = document.getElementById('firstName').value,
        lastName = document.getElementById('lastName').value,
        phoneNum = document.getElementById('phoneNum').value,
        fullName = firstName + " " + lastName;*/
    
    // SignUp
    const auth = firebase.auth();
    const promis = auth.createUserWithEmailAndPassword(email, pass);
    promis.cache(e=>e.message); 
});
/*=====================================
    End Sign Up And Creat Profile
=====================================*/

/*=====================================
    Start Signin
=====================================*/
var btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', e => {
    
    var emailLogin = document.getElementById('emailLog').value,
        passLogin = document.getElementById('passLog').value;
   
    // SignIn
    const auth = firebase.auth();
    const promis = auth.signInWithEmailAndPassword(emailLogin, passLogin);
    promis.cache(e=>e.message);
    document.getElementById('form-profile').reset();
});
/*=====================================
    End Signin
=====================================*/



/*=====================================
    Start SignOut
=====================================*/
var logOut = document.getElementById('logOut');

logOut.addEventListener('click', e => {
    
    var emailLogin = document.getElementById('emailLog').value,
        passLogin = document.getElementById('passLog').value;
   
    // SignIn
    const auth = firebase.auth();
    const promis = auth.signInWithEmailAndPassword(emailLogin, passLogin);
    promis.cache(e=>e.message);
});
/*=====================================
    End SignOut
=====================================*/

/*=====================================
    Start Chick if user Sign in or No
=====================================*/
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            // User is signed in.
                alert("Signed In");
                document.getElementById("hdn-reg").classList.add("hide");
        } else {
            // No user is signed in.
            alert("You are not log in");
            /*document.getElementsByClassName("hdn").classList.add("hide");*/
            document.getElementById("hdn-reg").classList.remove("hide");
        }
    });
/*=====================================
    End chick if user Sign in or No
=====================================*/


