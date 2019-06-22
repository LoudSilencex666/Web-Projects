var sizeNumber = 30;

var opacity = 0;

var col = {
	 r : 203,
	 b : 130,
	 g : 130
}


function setup() {
	createCanvas( windowWidth-20, windowHeight-120);
	background(120, 240, 250);
	
}

function draw() {
	noStroke();
	fill(col.r, col.g, col.b, opacity);
   ellipse(mouseX, mouseY,-sizeNumber,-sizeNumber );
}

function mousePressed() {
	if (mouseY > 1 && mouseY < windowHeight-100) {
		if (opacity === 0) {
		opacity = opacity + 500;
		} else {
		opacity = opacity - 500;
		}
	}
}

