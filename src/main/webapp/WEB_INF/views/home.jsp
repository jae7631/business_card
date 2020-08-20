<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- jQuery  -->
<link rel="stylesheet"
	href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.6.3/fabric.min.js"></script>
<style>
 #c{
     border:1px solid red;
     top:22px;
     left:0px;
     height: 100%;
     width: 99%;
 }

.box {
  float: left;
  margin: 1em;
}
.after-box {
  clear: left;
}
</style>
<script type="text/javascript">
$(document).ready(function(){

	 fabric.Object.prototype.transparentCorners = false;
	 fabric.Object.prototype.padding = 5;
	    
	var canvas = this.__canvas = new fabric.Canvas('c');
	  	canvas.setHeight(300);
			canvas.setWidth(500);
	   
	$('#test').on("click",function() { 
		var text = new fabric.IText('Left Aligned: Lorem ipsum.',{
			fontSize:16,
			left:20,
			top:20
			});
		canvas.add(text).setActiveObject(text);
	});
	
	function test1(){
		alert("test");
	}

	addHandler('color', function(obj) {
	      setStyle(obj, 'fill', this.value);
	    }, 'onchange');

	addHandler('opacity', function(obj) {
	      setStyle(obj, 'opacity', this.value);
	    }, 'onchange');	    
	
	addHandler('font-family', function(obj) {
	      setStyle(obj, 'fontFamily', this.value);
	    }, 'onchange');
	
	addHandler('text-align', function(obj) {
	      setStyle(obj, 'textAlign', this.value);
	    }, 'onchange');
	
	addHandler('text-bg-color', function(obj) {
	      setStyle(obj, 'textBackgroundColor', this.value);
	    }, 'onchange');
	
	addHandler('text-lines-bg-color', function(obj) {
	      setStyle(obj, 'backgroundColor', this.value);
	    }, 'onchange');
	    
	addHandler('text-stroke-color', function(obj) {
	      setStyle(obj, 'stroke', this.value);
	    }, 'onchange');
	    
	addHandler('text-stroke-width', function(obj) {
	      setStyle(obj, 'strokeWidth', this.value);
	    }, 'onchange');
	    
	addHandler('text-font-size', function(obj) {
	      setStyle(obj, 'fontSize', this.value);
	    }, 'onchange');
	    
	addHandler('text-line-height', function(obj) {
	      setStyle(obj, 'lineHeight', this.value);
	    }, 'onchange');
	    
	addHandler('text-cmd-bold', function(obj) {
	      setStyle(obj, 'fontWeight', this.value);
	    }, 'onchange');
	    
	addHandler('text-cmd-italic', function(obj) {
	      setStyle(obj, 'italic', this.value);
	    }, 'onchange');
	    	
	addHandler('text-cmd-underline', function(obj) {
	      setStyle(obj, 'underline', this.value);
	    }, 'onchange');
	    
	addHandler('text-cmd-linethrough', function(obj) {
	      setStyle(obj, 'line-through', this.value);
	    }, 'onchange');
	    	
	addHandler('text-cmd-overline', function(obj) {
	      setStyle(obj, 'overline', this.value);
	    }, 'onchange');
	    
	function setStyle(object, styleName, value) {
	    if (object.setSelectionStyles && object.isEditing) {
	        var style = { };
	        style[styleName] = value;
	        object.setSelectionStyles(style).setCoords();
	    }
	    else {
	        object[styleName] = value;
	    }
	    canvas.renderAll();
	}
	function  getStyle(object, styleName) {
	    return (object.getSelectionStyles && object.isEditing)
	    ? object.getSelectionStyles()[styleName]
	    : object[styleName];
	}
	function addHandler(id, fn, eventName) {
	    document.getElementById(id)[eventName || 'onclick'] = function() {
	        var el = this;
	        if (obj = canvas.getActiveObject()) {
	            fn.call(el, obj);
	            canvas.renderAll();
	        }
	    };
	}    
		
});

</script>
</head>

<body>

		 
 <input type="button" id="test" value="add text">
<div  class="box">

    <canvas id="c"></canvas>
</div>

    <div id="text-controls">
    	 <label for="opacity">Opacity: </label>
    <input value="100" type="range" id="opacity">
	  <input type="color" value="" id="color" size="10">
      <label for="font-family" style="display:inline-block">Font family:</label>
      <select id="font-family">
        <option value="arial">Arial</option>
        <option value="helvetica" selected>Helvetica</option>
        <option value="myriad pro">Myriad Pro</option>
        <option value="delicious">Delicious</option>
        <option value="verdana">Verdana</option>
        <option value="georgia">Georgia</option>
        <option value="courier">Courier</option>
        <option value="comic sans ms">Comic Sans MS</option>
        <option value="impact">Impact</option>
        <option value="monaco">Monaco</option>
        <option value="optima">Optima</option>
        <option value="hoefler text">Hoefler Text</option>
        <option value="plaster">Plaster</option>
        <option value="engagement">Engagement</option>
      </select>
      <br>
      <label for="text-align" style="display:inline-block">Text align:</label>
      <select id="text-align">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
        <option value="justify">Justify</option>
      </select>
      <div>
        <label for="text-bg-color">Background color:</label>
        <input type="color" value="" id="text-bg-color" size="10">
      </div>
      <div>
        <label for="text-lines-bg-color">Background text color:</label>
        <input type="color" value="" id="text-lines-bg-color" size="10">
      </div>
      <div>
        <label for="text-stroke-color">Stroke color:</label>
        <input type="color" value="" id="text-stroke-color">
      </div>
      <div>
	  

        <label for="text-stroke-width">Stroke width:</label>
        <input type="range" value="1" min="1" max="5" id="text-stroke-width">
      </div>
      <div>
        <label for="text-font-size">Font size:</label>
        <input type="range" value="" min="1" max="120" step="1" id="text-font-size">
      </div>
      <div>
        <label for="text-line-height">Line height:</label>
        <input type="range" value="" min="0" max="10" step="0.1" id="text-line-height">
      </div>
      
      <div id="text-controls-additional">
      <input type='checkbox' name='fonttype' id="text-cmd-bold">
        Bold
    
      <input type='checkbox' name='fonttype' id="text-cmd-italic">
        Italic
     
      <input type='checkbox' name='fonttype' id="text-cmd-underline" >
        Underline
      
      <input type='checkbox' name='fonttype'  id="text-cmd-linethrough">
        Linethrough
     
      <input type='checkbox' name='fonttype'  id="text-cmd-overline" >
        Overline
		</div>
	
    </div>
    
    </body>
</html>