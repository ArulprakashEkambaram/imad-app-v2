console.log('Loaded!');

//change the text of the main-text div
var element = document.getElementById('main-text'
);

Element.innerHTML = "I have changed the content" ;

// move the image
var img = document.getElementByID('prakash'
);
var marginleft=0;
function moveright() {
    marginleft= marginleft+10;
    img.style.marginleft+'px';
}
img.onclick= function(){
    var interval= setinterval(moveright,100);
}