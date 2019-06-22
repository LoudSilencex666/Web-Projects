$(document).ready(function() {
	var sizeValue = $('#rozmiarNumber').val();


	$('#red').click(function() {
        col.r = 255;
        col.b = 0;
        col.g = 0;
    });
	
	$('#blue').click(function() {
        col.r = 0;
        col.b = 255;
        col.g = 0;
    });
	
	$('#green').click(function() {
        col.r = 0;
        col.b = 0;
        col.g = 255;
    });
	
	$('#black').click(function() {
        col.r = 0;
        col.b = 0;
        col.g = 0;
    });
	
	$('#white').click(function() {
        col.r = 255;
        col.b = 255;
        col.g = 255;
    });
	
	$('#purple').click(function() {
        col.r = 255;
        col.b = 255;
        col.g = 0;
    });
	
	$('#orange').click(function() {
        col.r = 255;
        col.b = 0;
        col.g = 165;
    });
	
	$('#yellow').click(function() {
        col.r = 255;
        col.b = 0;
        col.g = 255;
    });
	
	$('#rozmiarNumber').change(function() {
	sizeValue = $('#rozmiarNumber').val();

	
	sizeNumber = sizeValue;
	});
});