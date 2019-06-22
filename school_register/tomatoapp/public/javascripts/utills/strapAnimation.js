function strapAnimation(className) {
    let strap = document.querySelectorAll('.' + className);
    let iterator = 0;
    let direction = 1;
    let windowWidth = window.innerWidth;
    
    setInterval(function(){
        strap[0].style.left = iterator + 'px';
        strap[1].style.left = iterator + 'px';
        
        if(iterator > windowWidth - 1 -windowWidth * 15 / 100) {
            direction = -direction; 
        } else if (iterator < - windowWidth * 15 / 100) {
            direction = -direction;
        }
        iterator += direction;
        
    }, 5);
     
    
};

strapAnimation('straperino');