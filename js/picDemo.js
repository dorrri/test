window.onload=function () {
    imgLocation("container","box");

    var imgData={"Data":[{"src":"20091220152311c2a.jpg"},{"src":"090205223344828.jpg"},{"src":"090205223601656.jpg"},{"src":"090205223800609.jpg"},]}
    window.onscroll=function () {
        if(checkFlag()){
            var parent=document.getElementById("container");
            for(var i=0;i<imgData.Data.length;i++){
                var box=document.createElement("div");
                box.className="box";
                parent.appendChild(box);
                var boxImg=document.createElement("div");
                boxImg.className="boxImg";
                box.appendChild(boxImg);
                var img=document.createElement("img");
                img.src="img/"+imgData.Data[i].src;
                boxImg.appendChild(img);
            }
            imgLocation("container","box");
        }

    }
}

function checkFlag(){
    var parent=document.getElementById("container");
    var content=getChildElement(parent,"box");
    var lastHeight=content[content.length-1].offsetTop;
    var scorllTop=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    console.log(lastHeight+"  "+scorllTop+"  "+pageHeight);
    if(lastHeight<scorllTop+pageHeight){
        return true;
    }
}

function imgLocation(parent,content) {
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    var imgWidth=ccontent[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/imgWidth);
    cparent.style.cssText="width:"+imgWidth*cols+"px;margin:10px auto";

    var boxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<cols){
            boxHeightArr[i]=ccontent[i].offsetHeight;
        }else{
            var minHeight=Math.min.apply(null,boxHeightArr);
            var minIndex=getMinHeightIndex(boxHeightArr,minHeight);
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minHeight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            boxHeightArr[minIndex]=minHeight+ccontent[i].offsetHeight;
        }

    }
}


function getMinHeightIndex(boxHeightArr,minHeight) {
    for(var i in boxHeightArr){
        if(boxHeightArr[i]===minHeight){
            return i ;
        }
    }

}
function getChildElement(parent,content) {
    var contentArr=parent.getElementsByClassName(content);
    return contentArr;
}
