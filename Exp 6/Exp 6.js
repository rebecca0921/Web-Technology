function change(){
    var div=document.getElementById('box');
    var bgcolor=document.getElementById('bgcolor').value;
    div.style.backgroundColor = bgcolor;

    var textcolor=document.getElementById('textcolor').value;
    div.style.color=textcolor;

    var tsize = document.getElementById('textsize').value;
    div.style.fontSize=tsize;

    var width=document.getElementById('width').value;
    div.style.width=width+"px";

    var height=document.getElementById('height').value;
    div.style.height=height+"px";

    var radius=document.getElementById('range').value;
    div.style.borderRadius=radius+"%";

}

var car=null;
var timer=null;

function init(){
    car= document.getElementById('car');
    car.style.position='relative';
    car.style.left='2px';        //initial position of the car
    clearTimeout(timer);
    document.getElementById('dang').innerHTML='';
}

function move(){
    car.style.left=parseInt(car.style.left)+2+"px";
    timer=setTimeout(move,10);
    if( parseInt(car.style.left) >= 900 )
    {
        halt();
        document.getElementById('dang').innerHTML='<div id="dang" style="text-align:center;position:absolute;border-color: red; background-color:red; color:black; right: 100px; bottom: 200px;width:80px; height:50px">Danger</div>';
    }
    
}

function halt(){
    clearTimeout(timer);
}

function reset(){
    car= document.getElementById('car');
    car.style.position='relative';
    car.style.left='2px';  
}