function createSlider(vesselId, imagesPaths, animationEffect, timeCounter) {

// główne zmienne 

    let vessel = document.getElementById(vesselId);

    let imageCounter = 0;
    let imageCounterRepeater = imagesPaths.length - 2;
    let imageCurrentPath = '';

// główna funkcja iterowania obrazów i wywoływania efektu

    function sliderAnimation() {
        imageCurrentPath = imagesPaths[imageCounter];
        
        if (imageCounter <= imageCounterRepeater && imageCounter >= 0) {
            imageCounter++;
        } else {
            imageCounter = 0;
        }

        if (animationEffect == 1) {
            firstDefaultEffect();
        } else if (animationEffect == 2) {
            secondEffect();
        } else if (animationEffect == 3) {
            thirdEffect();
        }
        
    };

 // funkcja tworząca statyczne tło slidera
    
    function staticVesselImage() {
        vessel.insertAdjacentHTML('afterbegin', '<div id="staticVesselImage"></div>');
            
        if(animationEffect != 1) {
            imageCurrentPath = imagesPaths[imageCounter];
            imageCounter++;
        }

        Object.assign(document.getElementById('staticVesselImage').style, {width:"100%", height:"100%",
        background:"url(" + imageCurrentPath +") no-repeat center", borderRadius:"10px", backgroundSize: "cover"});
    }

// Pierwszy efekt defaultowy

    function firstDefaultEffect() {
        let vesselFirstEffect = document.getElementById('staticVesselImage');
        
        Object.assign(vesselFirstEffect.style, {transitionDuration:"1s", background:"url(" + imageCurrentPath + ") no-repeat center",
        backgroundSize:"cover" });
    }

// Drugi efekt przechodzenia od lewej

    function secondEffect() {
        let vesselSecondEffect = document.getElementById('staticVesselImage');

        vessel.style.position = "relative";
        vesselSecondEffect.style.position = "absolute";

        vessel.insertAdjacentHTML('beforeend', '<div id="approachingVesselImage"></div>');
        
        Object.assign(document.getElementById('approachingVesselImage').style, {position: "absolute", width:"0%", height:"100%",
        background:"url(" + imageCurrentPath +") no-repeat center", backgroundSize:"cover", borderRadius:"10px", zIndex:"999"});
        
        setTimeout(function(){
            let percentCounter = 0;
            let animation = setInterval(frame, 10);
            function frame() {
                if(document.getElementById('approachingVesselImage').style.width == '100%') {
                    clearInterval(animation);
                    Object.assign(vesselSecondEffect.style, {background:"url(" + imageCurrentPath + ") no-repeat center", backgroundSize:"cover" });
                    document.getElementById('approachingVesselImage').parentNode.removeChild(document.getElementById('approachingVesselImage'));
                } else {
                    percentCounter++
                    document.getElementById('approachingVesselImage').style.width = percentCounter + '%';    
                }

            }
        }, 1000);        
    }
    
  // Trzeci efekt tradycyjne przechodzenie od prawej

    function thirdEffect() {
        let vesselThirdEffect = document.getElementById('staticVesselImage');
        vesselThirdEffect.style.position = "absolute";

        vessel.style.position = "relative";
        vessel.style.overflow = "hidden";

        vessel.insertAdjacentHTML('beforeend', '<div id="approachingVesselImage"></div>');
        
        Object.assign(document.getElementById('approachingVesselImage').style, {position: "absolute", width:"100%", height:"100%", 
        top: "0%", left: "100%", background:"url(" + imageCurrentPath +") no-repeat center", backgroundSize:"cover", borderRadius:"10px", 
        zIndex:"999"});
        
        setTimeout(function(){
            let percentCounter = 0;
            let animation = setInterval(frame, 10);
            function frame() {
                if(document.getElementById('approachingVesselImage').style.left == '0%') {
                    clearInterval(animation);
                    Object.assign(vesselThirdEffect.style, {background:"url(" + imageCurrentPath + ") no-repeat center", left: "0%", backgroundSize:"cover" });
                    document.getElementById('approachingVesselImage').parentNode.removeChild(document.getElementById('approachingVesselImage'));
                } else {
                    percentCounter++
                    vesselThirdEffect.style.left = -percentCounter + "%";
                    document.getElementById('approachingVesselImage').style.left = (110 - percentCounter) + '%';    
                }

            }
        }, 1000);
    }




  // rozruch slidera

    staticVesselImage();
    
    sliderAnimation();

    setInterval(function(){
        sliderAnimation();
    }, timeCounter);  

    
};

createSlider('slaider', ['1.jpeg', '2.jpg', '3.jpeg'], 3, 3000);

