var lineBTN     = document.getElementById("line");
var circleBTN   = document.getElementById("circle");
var rectBTN     = document.getElementById("rect");
var fillStyle   = document.getElementById('FillStyle');
var strokeStyle = document.getElementById('StrokeStyle');
var eraseBtn    = document.getElementById('Erase');
var freeBtn     = document.getElementById('FreeHand');

var canvas = document.getElementById("my-canvas");
var paintaing= document.getElementById("container");
var paintstyle=getComputedStyle(paintaing);
canvas.width=  parseInt(paintstyle.getPropertyValue("width"));
canvas.height= parseInt(paintstyle.getPropertyValue("height"));
let newx, newy, width, heigh;
var cContext = canvas.getContext("2d");
let rect = { rectFlag : 0,
             rectX1:null,
             rectY1:null,
             rectX2:null,
             rectY2:null
           };

let line = { lineFlag : 0,
             lineX1:null,
             lineY1:null,
             lineX2:null,
             lineY2:null
          };
let circle = { circleFlag : 0,
               cx:null,
               cy:null,
               radius:null,
                startpointx:null,
                endpointx:null,
                startpointy:null,
                endpointy:null
             };

let freeFlag = 0
let eraseFlag = 0;
var mouse= {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e){
     mouse.x= e.pageX - this.offsetLeft;
     mouse.y = e.pageY - this.offsetTop;
     rect.rectX2= e.pageX - this.offsetLeft;
     rect.rectY2= e.pageY - this.offsetTop;
},false);
    
           
canvas.addEventListener('mousedown', function(e){            
    cContext.lineWidth=3;
    cContext.fillStyle =fillStyle.value;
   cContext.strokeStyle = strokeStyle.value; 
    if(rect.rectFlag === 1 ){
        rect.rectY1 = mouse.y;
        rect.rectX1 = mouse.x;
    }
    if(line.lineFlag === 1)
    {
        line.lineX1 = mouse.x;
        line.lineY1 = mouse.y;
    }
    if(freeFlag === 1){
        cContext.beginPath();
        cContext.moveTo(mouse.x, mouse.y);
    }
    if(circle.circleFlag === 1){
        circle.startpointx=mouse.x;
        circle.startpointy=mouse.y;
    }
    if (eraseFlag === 1){
        cContext.beginPath();
        cContext.moveTo(mouse.x, mouse.y);
    }
       canvas.addEventListener('mousemove', onPaint, false);           
    }, false);
           
           canvas.addEventListener('mouseup', function(){
               canvas.removeEventListener('mousemove', onPaint, false);
              if (eraseFlag===1){
                   eraseFlag=0;
                   cContext.stroke();
               }
               if(rect.rectFlag === 1)
               {
                rect.rectFlag =0;
               }
                   
                if(freeFlag === 1)
                    freeFlag =0;
               if(line.lineFlag === 1)
                 {
                    line.lineFlag =0;
                    cContext.beginPath();
                    cContext.moveTo(line.lineX1,line.lineY1);
                    line.lineX2 = mouse.x
                    line.lineY2 = mouse.y
                    cContext.lineTo(line.lineX2,line.lineY2);
                    cContext.stroke();
                 }
                if(circle.circleFlag === 1)
                {
                    circle.circleFlag = 0;
                    cContext.stroke();
                    cContext.fill();
                } 
           }, false);
           
           var onPaint= function()
           {
               if(freeFlag === 1)
               {
                cContext.lineTo(mouse.x, mouse.y);
                cContext.stroke();
               }
               if(eraseFlag === 1)
               {
                cContext.lineWidth=20;
                cContext.lineJoin="round";
                cContext.lineCap="round";
                cContext.strokeStyle = "rgb(255, 255, 255)";
                cContext.lineTo(mouse.x, mouse.y);
               }

               if(rect.rectFlag === 1)
               {
                rect.rectX2 = mouse.x;
                rect.rectY2 = mouse.y;
                // newx  = Math.min(rect.rectX1, rect.rectX2)
                // newy  = Math.min(rect.rectY1, rect.rectY2)
                width = Math.abs(rect.rectX2 - rect.rectX1)
                height = Math.abs(rect.rectY2 - rect.rectY1) 
                cContext.fillRect(rect.rectX1, rect.rectY1, width, height);
                cContext.strokeRect(rect.rectX1, rect.rectY1, width, height);

               }
   
               if(circle.circleFlag === 1 )
               {
                    circle.endpointy=mouse.y;
                    circle.endpointx=mouse.x;
                    let newx = Math.min(circle.startpointx, circle.endpointx)
                    let newy = Math.min(circle.startpointy,circle. endpointy)
                    let width = Math.abs(circle.startpointx - circle.endpointx)
                    let height = Math.abs(circle.startpointy -circle. endpointy)
                    var radius = Math.sqrt(width * width + height * height) / 2
                    cContext.beginPath();
                    cContext.arc(newx + (width / 2), newy + (height / 2), radius, 0, 2 * Math.PI)
               }

           };

rectBTN.addEventListener("click",()=>
{
    rect.rectFlag = 1;
})

lineBTN.addEventListener("click",()=>
{
    line.lineFlag = 1;
});

freeBtn.addEventListener("click",()=>
{
   freeFlag = 1;
});

circleBTN.addEventListener("click",()=>
{
   circle.circleFlag = 1;
});

eraseBtn.addEventListener("click",()=>
{
   eraseFlag = 1;
});

