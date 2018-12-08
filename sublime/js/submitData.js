
function submitData(){
    document.getElementById("success").style.visibility = "hidden";
    var name1 = document.getElementById("student_name1").value ;
    var class1 = document.getElementById("student_class1").value ;
    var mob1 = document.getElementById("student_mobile1").value ;

    var name2 = document.getElementById("student_name2").value ;
    var class2 = document.getElementById("student_class2").value ;
    var mob2 = document.getElementById("student_mobile2").value ;

    var name3 = document.getElementById("student_name3").value ;
    var class3 = document.getElementById("student_class3").value ;
    var mob3 = document.getElementById("student_mobile3").value ;

    

    if(name1==="" || class1==="" || mob1===""){
        alert("please fill all details!!");
        return;
    }
    else if( (name2==="" || class2==="" || mob2==="") && !(name2==="" && class2==="" && mob2==="")){
        alert("please fill all details at row 2nd !!");
        return;
    }
    else if( (name3==="" || class3==="" || mob3==="") && !(name3==="" && class3==="" && mob3==="")) {
        alert("please fill all details at row 3rd !!");
        return;
    }

    var database = firebase.database();
    var schoolName = sessionStorage.getItem('edarSCHOOL');

    if(schoolName==null){
        window.location.href = "index.html";
    }

    database.ref('Users/'+schoolName).once('value', function(snap){
        var user = snap.val();
        if(user.hasOwnProperty(mob1.trim())){
            alert("the mobile number at row 1st already exists!! \n if you want to update details\n go to update page");
            return;
        }
        else if(user.hasOwnProperty(mob2.trim())){
            alert("the mobile number at row 2nd already exists!! \n if you want to update details\n go to update page");
            return;
        }
        else if(user.hasOwnProperty(mob3.trim())){
            alert("the mobile number at row 3rd already exists!! \n if you want to update details\n go to update page");
            return;
        }
        
        if(name3==="" && class3==="" && mob3==="" && name2==="" && class2==="" && mob2===""){
            if(!checkPhone(mob1,"1")) return;
            var classVal = parseInt(class1.trim());
            database.ref('Users/'+schoolName+'/'+mob1).set({
                "name":name1.trim(),
                "Class":[classVal],
                "schoolClass":classVal,
                "SysID":"",
                "Model":"",
                "isLog":"",
                "test" : []
            });
        }
        else if(name2==="" && class2==="" && mob2===""){
            if(!checkPhone(mob1,"1")) return;
            if(!checkPhone(mob2,"2")) return;

            var classVal1 = parseInt(class1.trim());
            database.ref('Users/'+schoolName+'/'+mob1).set({
                "name":name1.trim(),
                "Class":[classVal1],
                "schoolClass":classVal1,
                "SysID":"",
                "Model":"",
                "isLog":"",
                "test" : []
            });

            var classVal2 = parseInt(class2.trim());
            database.ref('Users/'+schoolName+'/'+mob2).set({
                "name":name2.trim(),
                "Class":[classVal2],
                "schoolClass":classVal2,
                "SysID":"",
                "Model":"",
                "isLog":"",
                "test" : []
            }); 
        }
        else {
            if(!checkPhone(mob1,"1")) return;
            if(!checkPhone(mob2,"2")) return;
            if(!checkPhone(mob3,"3")) return;
            var classVal1 = parseInt(class1.trim());
            database.ref('Users/'+schoolName+'/'+mob1).set({
                "name":name1.trim(),
                "Class":[classVal1],
                "schoolClass":classVal1,
                "SysID":"",
                "Model":"",
                "isLog":"",
                "test" : []
            });

            var classVal2 = parseInt(class2.trim());
            database.ref('Users/'+schoolName+'/'+mob2).set({
                "name":name2.trim(),
                "Class":[classVal2],
                "schoolClass":classVal2,
                "SysID":"",
                "Model":"",
                "isLog":"",
                "test" : []
            }); 

            var classVal3 = parseInt(class3.trim());
            database.ref('Users/'+schoolName+'/'+mob3).set({
                "name":name3.trim(),
                "Class":[classVal3],
                "schoolClass":classVal3,
                "SysID":"",
                "Model":"",
                "isLog":"",
                "test" : []
            }); 

        }

        document.getElementById("success").style.visibility = "visible";
        
    });

}


function checkPhone(mob1,row){
    if(mob1.trim().length!=10 ){
        alert("Mobile number at row "+row+" is invalid!!");
        return false;
    }

    return true;
}

function addData(name,class1,mobile,row){

    var schoolName = sessionStorage.getItem('edarSCHOOL');
    var database = firebase.database();
    database.ref('Users/'+schoolName).once('value', function(snap){
        var user = snap.val();
        if(user.hasOwnProperty(mob1.trim())){
            alert("the mobile number already exists!! \n if you want to update details\n go to update page");
        }
        else{
            var classVal = parseInt(class1.trim());
            database.ref(+mob1).set({
                "name":name1.trim(),
                "Class":[classVal],
                "schoolClass":classVal,
                "SysID":"",
                "Model":"",
                "isLog":"",
                "test" : []
            });
        }
    
    });
}


function ViewData(){
    var class1 = document.getElementById("sel1").value ;
    var schoolName = sessionStorage.getItem('edarSCHOOL');
    
    var cval = parseInt(class1.trim());
    var database = firebase.database();
    database.ref('Users/'+schoolName).once('value', function(snap){
        var user = snap.val();
        document.getElementById("tableData").innerHTML = "<tr><th>Name</th><th>Mobile</th><th>Class</th></tr>";
       
        for (var key in user) {
            if (user.hasOwnProperty(key)) {
              var val = user[key];
              if(val.hasOwnProperty('schoolClass')){
                  if(val['schoolClass']==cval){
                      var str= "<tr>";
                      str+="<td> "+val['name']+"</td>";
                      str+="<td> "+key+"</td>";
                      str+="<td> "+cval+"</td> </tr>";
                      document.getElementById("tableData").innerHTML+=str;
                  }
              }
            }
        }
    
    });

}

function loadTopics(){
    var class1 = document.getElementById("sel1").value ;
    var database = firebase.database();
    document.getElementById("sel2").innerHTML="";
    

    database.ref('/').once('value', function(snap){
        var root = snap.val();
        
        if(root.hasOwnProperty(class1.trim())){
            
            var val = root[class1.trim()];
            for(var key in val){
                
                if(val.hasOwnProperty(key)){
                    var str= "<option>"+key+"</option>";
                    document.getElementById("sel2").innerHTML+=str;
                }
            }
        }
            
        
    });
}

function ViewScore(){
    var class1 = document.getElementById("sel1").value ;

    var cval = parseInt(class1.trim());

    var topic = document.getElementById("sel2").value ;

    var schoolName = sessionStorage.getItem('edarSCHOOL');

    var scores=[];

    firebase.database().ref('/Users/'+schoolName).once('value', function(snap){
        var root = snap.val();
        var user = root;
        document.getElementById("tableData").innerHTML = "<tr><th>Name</th><th>Mobile</th><th>Score</th></tr>";
        
        for (var key in user) {
            if (user.hasOwnProperty(key)) {
              var val = user[key];
              if(val.hasOwnProperty('schoolClass') && val.hasOwnProperty("test")){
                  var test = val["test"];
                  if(val['schoolClass']==cval && test.hasOwnProperty(topic.trim())){
                      var str= "<tr>";
                      str+="<td> "+val['name']+"</td>";
                      str+="<td> "+key+"</td>";
                      str+="<td> "+test[topic.trim()]+"</td> </tr>";
                      document.getElementById("tableData").innerHTML+=str;
                      scores.push(test[topic.trim()]);
                  }
              }
            }
        }
       // console.log(scores);

        var sum =0;
        for(var i=0;i<scores.length;i+=1){ sum+=scores[i]; }
        var mean = (sum*1.0)/(scores.length);
        var max = 0;
        for(var i=0;i<scores.length;i+=1){ if(scores[i]>max) max = scores[i]; }
        var min = 100;
        for(var i=0;i<scores.length;i+=1){ if(scores[i]<min) min = scores[i]; }
        
    
        ViewGraph(min,mean,max,scores);

    
    });
    
}

function ViewGraph(min,mean,max,scores){
    var ctx = document.getElementById("myChart").getContext('2d');

    var chart = new Chart(ctx, {
         type: 'bar',
    data: {
        labels: ["Min", "Median", "Max"],
        datasets: [{
            label: '# marks stats',
            data: [min, mean, max],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {

        responsive:false,
        
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
    
    });

}