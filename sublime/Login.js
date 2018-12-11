function LogIN(){

    var id = document.getElementById("username").value ;
    var pd = document.getElementById("password").value ;
  //  console.log(id+" "+pd);

    if( id==="" || pd === ""){
        alert("Please fill username and password !!");
    }
    
    firebase.database().ref('SchoolCred/').once('value', function(snap){
        var root = snap.val();

        console.log(typeof(root));
        for( var x in root){
           // console.log(x);
            var cid = root[x]['username'];
            var cpwd = root[x]['password'];
            console.log(cid+" "+cpwd);
            if(id===cid && pd == cpwd){
                sessionStorage.setItem('edarSCHOOL', root[x]['username']);
                sessionStorage.setItem('edarSCHOOLName', root[x]['name']);
                // localStorage.setItem('edarSCHOOL', root[x]['username']);
                // localStorage.setItem('edarSCHOOLName', root[x]['name']);
               // console.log("redirect");
                window.location.href = "ViewData.html";
            }
        }
    
    });


}