
function fillQnA(){
    var text1 = document.getElementById("textVal").value ;
    var class1 = document.getElementById("sel1").value ;
    var topic1 = document.getElementById("topicN").value ;

    if(topic1===""){
        alert("topic is empty !!")
        return;
    }
    
    var arr = text1.trim().split('\n')
    
    if(arr.length==0){
        alert("please enter valid text !!")
        return;
    }

    if(arr.length%6!=0){
        alert("incorrect format check number of lines!!")
        return;
    }

    ly=[]
    for( var i=0;i<arr.length;i+=6){
        var que = arr[i];
        var op1 = arr[i+1];
        var op2 = arr[i+2];
        var op3 = arr[i+3];
        var op4 = arr[i+4];
        var cor = parseInt(arr[i+5].trim());
        opt=[]
        opt.push(op1.trim());opt.push(op2.trim());opt.push(op3.trim());opt.push(op4.trim());
        d = { "correct" : cor,"options":opt ,"que": que }
        ly.push(d)
    }
    

    firebase.database().ref('/'+class1.trim()+'/'+topic1.trim()).set(ly);
    alert("data submitted !!");
}

function loadTopicsQnA(){
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

function ViewQnA(){

    var class1 = document.getElementById("sel1").value ;
    var database = firebase.database();
    var topic1 = document.getElementById("sel2").value ;
    document.getElementById("tableData").innerHTML = "<tr><th>Question</th><th>Option1</th> <th>Option2</th> <th>Option3</th> <th>Option4</th> <th>Correct</th></tr>";

    database.ref('/'+class1.trim()+'/'+topic1+'/').once('value', function(snap){
        var root = snap.val();
        for(var i=0;i<root.length;i++){
            var opt = root[i]["options"];
            var cor = root[i]["correct"];
            var que =  root[i]["que"];
            var str="<tr>"
            str+="<td>"+que+"</td>"
            str+="<td>"+opt[0]+"</td>"
            str+="<td>"+opt[1]+"</td>"
            str+="<td>"+opt[2]+"</td>"
            str+="<td>"+opt[3]+"</td>"
            str+="<td>"+cor+"</td></tr>"

            document.getElementById("tableData").innerHTML+=str;

        }     
        
    });
}