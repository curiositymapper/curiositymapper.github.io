////////////////////////////////////////////////////////////////////////
//                    JS-CODE FOR MASTERMIND GAME                     //
//                       AUTHOR: ERIC SCHULZ                          //
////////////////////////////////////////////////////////////////////////

//Intialize variables
var index = 0;
var myDataRef = new Firebase("https://causalstudy.firebaseio.com/");
var cols=["#FFFFFF", "#FF0000", "#0000FF", "#008000", "#000000"];
var colpos=[0,0,0,0];
var truth=["#FF0000", "#FF0000", "#008000", "#008000"];
var insert='';
var chosen=[];
var colortracker=[];
var correcttracker=[];
var positiontracker=[];
var chosen;
var name=3.14;
//Function to randomly shuffle an array:
function shuffle(o)
{ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//changes from one page to another
function clickStart(hide, show)
{
        document.getElementById(hide).style.display="none";
        document.getElementById(show).style.display = "block";
        window.scrollTo(0,0);        
}

function startExperiment()
{
  
       document.getElementById('contact').style.display="none";
       document.getElementById('about').style.display="none";
       document.getElementById('portfolio').style.display="none";
       document.getElementById('maincontent').style.display="none";
       document.getElementById('mainNav').style.display="none";
       document.getElementById('consent').style.display="block";

}

function mainpage()
{
       insert='';
       index = 0;
       cols=["#FFFFFF", "#FF0000", "#0000FF", "#008000", "#000000"];
       colpos=[0,0,0,0];
       truth=["#FF0000", "#FF0000", "#008000", "#008000"];
       chosen=[];
       colortracker=[];
       correcttracker=[];
       positiontracker=[];
       chosen=[];
       update("remaining",'Number of guesses left: ' +(10-index));
       update("insert", insert);
       colpos=[-1,-1,-1,-1];
       change(0);change(1);change(2);change(3);
       sampletruth();
       document.getElementById('contact').style.display="block";
       document.getElementById('about').style.display="block";
       document.getElementById('portfolio').style.display="block";
       document.getElementById('maincontent').style.display="block";
       document.getElementById('mainNav').style.display="block";
       document.getElementById('page5').style.display="none";

}


//update page
function update(x,y)
{
    document.getElementById(x).innerHTML=y;
}


function checkstart()
{
  var age=90;
  if (document.getElementById('age1').checked) {age = 20}
  if (document.getElementById('age2').checked) {age = 30}
  if (document.getElementById('age3').checked) {age = 40}
  if (document.getElementById('age4').checked) {age = 50}
  if (age===90){alert("Please enter your age.")}
  var gender=3;
  if (document.getElementById('gender1').checked) {gender = 1}
  if (document.getElementById('gender2').checked) {gender = 2}
  if (gender===3){alert("Please enter your gender.")}  
  name=document.getElementById("nickname").value;
  if (name.length < 4){alert("Your nickname should have at least 4 characters.")}
  if (name.length >= 4 && age != 90 && gender != 3){clickStart('page3', 'page4')}
}


//sample a truth with different entropies
function sampletruth()
{
  var balls=[[5,2,1,0],[4,2,1,1],[3,2,2,1], [2,2,2,2]]
  chosen=shuffle(balls)[0];
  chosen=shuffle(chosen);
  var options=[];
  for(var j=0; j<chosen[0]; j++) 
  {
    options.push("#FF0000")
  }
  for(var j=0; j<chosen[1]; j++) 
  {
    options.push("#0000FF")
  }
  for(var j=0; j<chosen[2]; j++) 
  {
    options.push("#008000")
  }
  for(var j=0; j<chosen[3]; j++) 
  {
    options.push("#000000")
  }
  ind1 = Math.floor(Math.random()*options.length);
  ind2 = Math.floor(Math.random()*options.length);
  ind3 = Math.floor(Math.random()*options.length);
  ind4 = Math.floor(Math.random()*options.length);
  truth=[options[ind1],options[ind2],options[ind3],options[ind4]];
  var insertscoops='<font color="red">Red: '+chosen[0]+'</font>&nbsp&nbsp&nbsp<font color="blue"> Blue: '+chosen[1]+'</font>&nbsp&nbsp&nbsp<font color="green"> Green: '+chosen[2]+'</font>&nbsp&nbsp&nbsp<font color="#000000"> Black: ';
  insertscoops=insertscoops+chosen[3]+'</font>';
  update('scoops', insertscoops);
}
//do this once at start;
sampletruth();


//function that makes the circles for appending them after submission
function makecircle(input)
{
  var output;
  if(input=="#FF0000")
  {
    output='<div class="circlered"></div>';
  }
  if(input=="#0000FF")
  {
    output='<div class="circleblue"></div>';
  }
  if(input=="#008000")
  {
    output='<div class="circlegreen"></div>';
  }
  if(input=="#000000")
  {
    output='<div class="circleblack"></div>';
  }
  return(output)
}

//function that loops through colors on clicking buttons
function change(n)
{
  colpos[n]=colpos[n]+1;
  if (colpos[n]>4)
  {
   colpos[n]=1;
  }
  var id="peg"+n;
  var property = document.getElementById(id);
  property.style.backgroundColor = cols[colpos[n]];

}


function submit()
{
  var allcols=[cols[colpos[0]],cols[colpos[1]],cols[colpos[2]],cols[colpos[3]]];
  if (allcols.indexOf("#FFFFFF") < 0)
  {

    var correct=0;
    for(var j=0; j<4; j++) 
    {
      if (truth[j]==cols[colpos[j]]){correct++;}
    }
    var position=0;
    var lookup=[truth[0],truth[1],truth[2],truth[3]];
    for(var j=0; j<4; j++) 
    {
     if (lookup.indexOf(cols[colpos[j]]) >= 0) 
     {
      position++;
      lookup[lookup.indexOf(cols[colpos[j]])]="done";
     }
    }
    position=position-correct;
    if (position<0){position=0};
    var rest=4-correct-position;
    var showpng=["low.png","low.png","low.png","low.png"];
    for(var j=0; j<0+correct; j++) 
    {
      showpng[j]="top.png";
    } 
    for(var j=0+correct; j<0+correct+position; j++) 
    {
      showpng[j]="medium.png"
    }
    insert=insert+makecircle(cols[colpos[0]]);
    insert=insert+makecircle(cols[colpos[1]]);
    insert=insert+makecircle(cols[colpos[2]]);
    insert=insert+makecircle(cols[colpos[3]]);
    insert=insert+'<input type="image" src="pics/' + showpng[0]+'" width="30" height="27">';
    insert=insert+'<input type="image" src="pics/' + showpng[1]+'" width="30" height="27">'+'<br>';
    insert=insert+'<input type="image" src="pics/' + showpng[2]+'" width="30" height="27">';
    insert=insert+'<input type="image" src="pics/' + showpng[3]+'" width="30" height="27">'+'<br><br>';
    update("insert", insert);
    
    colpos=[-1,-1,-1,-1];
    change(0);change(1);change(2);change(3);
    colortracker[index]=allcols;
    correcttracker[index]=correct;
    positiontracker[index]=position;
    if (correct===4)
    {
      alert("Congratulations! You have found the secret code.");
      senddata();
    }
    index=index+1;
    if (index<=9)
    {
      update("remaining",'Number of guesses left: ' +(10-index))
    }
    if (index>9)
    {
      alert("GAME OVER. Unfortunately you did not manage to find the code.");
      senddata();
    }
  }else
  {
    alert("Please enter colors for all positions of the code.");
  }
}


//sending data
function senddata()
{
  var age=90;
    if (document.getElementById('age1').checked) {var  age = 20}
    if (document.getElementById('age2').checked) {var  age = 30}
    if (document.getElementById('age3').checked) {var  age = 40}
    if (document.getElementById('age4').checked) {var  age = 50}

    var gender=3;
    if (document.getElementById('gender1').checked) {var  gender = 1}
    if (document.getElementById('gender2').checked) {var  gender = 2}
    myDataRef.push({colortracker: colortracker, correcttracker: correcttracker, positiontracker: positiontracker, truth: truth, chosen: chosen, age: age, gender: gender});
    clickStart('page4','page5');

}

function playagain()
{
  insert='';
  index = 0;
  cols=["#FFFFFF", "#FF0000", "#0000FF", "#008000", "#000000"];
  colpos=[0,0,0,0];
  truth=["#FF0000", "#FF0000", "#008000", "#008000"];
  chosen=[];
  colortracker=[];
  correcttracker=[];
  positiontracker=[];
  chosen=[];
  update("remaining",'Number of guesses left: ' +(10-index));
  update("insert", insert);
  colpos=[-1,-1,-1,-1];
  change(0);change(1);change(2);change(3);
  sampletruth();
  clickStart('page5','page4');
}