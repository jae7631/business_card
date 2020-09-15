$(document).ready(function(){
	/** Create Canvas */
	fabric.Object.prototype.transparentCorners = false;
//	fabric.Object.prototype.padding = 5;
	var grid = 50;   
	var canvas = this.__canvas = new fabric.Canvas('canvas-area');
		canvas.setHeight(300);
		canvas.setWidth(450);
	$('.canvas-container').addClass('yoko');

	
	  $('#add-text-btn').click(function() {
		  var new_text = new fabric.IText('Lorem ipsum', {
		  left: 20,
		  top: 20,
		  fontSize: 40,
		  lockUniScaling: true,
		  //fontFamily: txtfontfamily,
		  fill: '#000'
		});
		canvas.add(new_text);
		canvas.setActiveObject(new_text);
	  });
	  
	  
		/** change fontScale to fontSize */
		$('#text-font-size').keyup(function() {
			var val = $(this).val();
			if (isNaN(val)) {
			  alert('please enter number');
			  $(this).val('');
			}
			var activeObject = canvas.getActiveObject();
			activeObject.fontSize = val;
			canvas.renderAll();
		  });
	  
	  /*
		if ($('#text-font-size').val()) {
		  var txtfontsize = $('#text-font-size').val();
		} else {
		  var txtfontsize = 40;
		}
		var txtfontfamily = $('#font-family').val();
		
	
	  canvas.on('object:selected', function(options) {
		if (options.target) {
		 // $("textarea#add-text-value").val(options.target.text);
		  $("#text-font-size").val(options.target.fontSize);
		}
	  });
	
	  canvas.on('object:scaling', function(event) {
		if (event.target) {
		  $("#text-font-size").val((event.target.fontSize * event.target.scaleX).toFixed(0));
		}
	  });
	
	  canvas.on('object:modified', function(event) {
		if (event.target) {
		  event.target.fontSize *= event.target.scaleX;
		  event.target.fontSize = event.target.fontSize.toFixed(0);
		  event.target.scaleX = 1;
		  event.target.scaleY = 1;
		  //$("textarea#add-text-value").val(event.target.text);
		  $("#text-font-size").val(event.target.fontSize);
		  //event.target._clearCache();
		}
		
	  });
	  
	 
  
    /** Add Grid */
	$("#gridBtn").click(function() {
		if($('#gridBtn').text()=="gridOn"){
			$('#gridBtn').removeClass('grid-on');
			$('#gridBtn').addClass('grid-off');
			$('#gridBtn').text("gridOff");			
			for (var i = 0; i < (500 / grid); i++) {
				console.log(canvas.getObjects('line'));
				canvas.add(new fabric.Line([i * grid, 0, i * grid, 500], {
				stroke: '#ccc',
				selectable: false
				}));
				canvas.add(new fabric.Line([0, i * grid, 500, i * grid], {
				stroke: '#ccc',
				selectable: false
				}))
			}		
		  } else if($('#gridBtn').text()=="gridOff") {
			$('#gridBtn').removeClass('grid-off');
			$('#gridBtn').addClass('grid-on');
			$('#gridBtn').text("gridOn");
			var objects = canvas.getObjects('line');
			for (let i in objects) {
				canvas.remove(objects[i]);
			}
		  }	 
	});
	// snap to grid
	canvas.on('object:moving', function(options) {
		if (Math.round(options.target.left / grid * 4) % 4 == 0 &&
		  Math.round(options.target.top / grid * 4) % 4 == 0) {
		  options.target.set({
			left: Math.round(options.target.left / grid) * grid,
			top: Math.round(options.target.top / grid) * grid
		  }).setCoords();
		}
	  });

	/** Save Canvas to Png */
	$('#save').on("click",function(){
		if($('#gridBtn').text()=="gridOff") {
			$('#gridBtn').removeClass('grid-off');
			$('#gridBtn').addClass('grid-on');
			$('#gridBtn').text("gridOn");
			var objects = canvas.getObjects('line');
			for (let i in objects) {
				canvas.remove(objects[i]);
			}
		  }
		  canvas.renderAll();
		this.href =  canvas.toDataURL({
			format: 'png',
			multiplier: 4,
		});

		const link = document.createElement('a');
		link.download = 'image.png';
		//link.href = 'data:image/svg+xml;utf8,' + canvas.toSVG();
		link.href = this.href;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		/** Create Json */
		var svg = canvas.toSVG();
		var jsonData = JSON.stringify( canvas );
		console.log(jsonData);
		console.log(svg);
		$.ajax({ url: "/createBusinessCard", 
			data: {jsonData:jsonData},
			method: "POST", 
			dataType: "text",
			success:function(data){
				alert("success");				 
			},
		error:function(request, status, error){
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		});
	});

	/** Canvas Resizing*/
	  $('#size_modify').on("click",function(){
    if(confirm("サイズ変更時、内容は初期化されます。よろしいですか。")===true){
      
      if(canvas.getHeight()==300){
        canvas.clear();
        canvas.setHeight(450);
		canvas.setWidth(300);
		canvas.calcOffset();
        $('#size_modify').text("よこ");
        $('#size_modify').addClass("yokotxt");
        $('.canvas-container').removeClass('yoko');
        $('.canvas-container').addClass('tate');
      }else if(canvas.getHeight()==450){
        canvas.clear();
        canvas.setHeight(300);
        canvas.setWidth(450);
        canvas.calcOffset();
        $('#size_modify').text("たて");
        $('#size_modify').removeClass("yokotxt");
        $('.canvas-container').removeClass('tate');
        $('.canvas-container').addClass('yoko');
      }     
    }    
  });
	
	/** Load Templet */
	$('#load').on("click",function(){
		$.ajax({
		url: "/selectBusinessCard", 
		data: { idx: 1 }, 
		method: "POST", 
		dataType: "text",
		success:function(data){

			canvas.clear();
			canvas.loadFromJSON(data, function() {
				canvas.renderAll();
			});   		
		},
		error:function(request, status, error){
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		});	
	});

	
	/** Delete Object */
	$('html').keyup(function(e){			
		if (e.keyCode == 46) {
			var obj = canvas.getActiveObject();
			if(!obj.isEditing){
				deleteSelectedObjectsFromCanvas();	
			}		    
		}
	});    
	
	function deleteSelectedObjectsFromCanvas(){
			var selection = canvas.getActiveObject();
		if (selection.type === 'activeSelection') {
			selection.forEachObject(function(element) {
				console.log(element);
				canvas.remove(element);
			});
		}
		else{
			canvas.remove(selection);
		}
		canvas.discardActiveObject();
		canvas.requestRenderAll();
	}

	canvas.on('selection:updated', function (e) {
		$('#text-font-size').val(e.target.fontSize);
		//$('#text-color').spectrum("set", rgbToHex(e.target.fill));
		$('#text-cmd-underline').prop("checked",e.target.underline);
		$('#text-cmd-overline').prop("checked",e.target.overline);
		$('#text-cmd-linethrough').prop("checked",e.target.linethrough);
		$('#text-stroke-width').val(e.target.strokeWidth);
		$('#text-line-height').val(e.target.lineHeight);
		$('#font-family').val(e.target.fontFamily);
		
		if(e.target.fontWeight == "bold"){
			$('#text-cmd-bold').prop("checked", true);
		} else {
			$('#text-cmd-bold').prop("checked", false);
		}
		
		if(e.target.fontStyle == "italic"){
			$('#text-cmd-italic').prop("checked", true);
		} else {
			$('#text-cmd-italic').prop("checked", false);
		}
	});
	
	canvas.on('object:selected', function (e) {
		$('#text-font-size').val(e.target.fontSize);
		console.log(e.target.fill); //#000
		
		console.log(document.getElementById("text-color").value=e.target.fill+"000"); 
		$('#text-color').spectrum("set", e.target.fill);
		$('#text-cmd-underline').prop("checked",e.target.underline);
		$('#text-cmd-overline').prop("checked",e.target.overline);
		$('#text-cmd-linethrough').prop("checked",e.target.linethrough);
		$('#text-stroke-width').val(e.target.strokeWidth);
		$('#text-line-height').val(e.target.lineHeight);
		$('#font-family').val(e.target.fontFamily);
		
		if(e.target.fontWeight == "bold"){
			$('#text-cmd-bold').prop("checked", true);
		} else {
			$('#text-cmd-bold').prop("checked", false);
		}
		
		if(e.target.fontStyle == "italic"){
			$('#text-cmd-italic').prop("checked", true);
		} else {
			$('#text-cmd-italic').prop("checked", false);
		}
	});
	
	function hexToRgb(hex) {
		  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		  return result ? {
		    r: parseInt(result[1], 16),
		    g: parseInt(result[2], 16),
		    b: parseInt(result[3], 16)
		  } : null;
		}
	
	function a(){
		
	}
/*
	function rgbToHex ( rgbType ){ 
		var rgb = rgbType.replace( /[^%,.\d]/g, "" ); 
        rgb = rgb.split( "," ); 
        for ( var x = 0; x < 3; x++ ) { 
                if ( rgb[ x ].indexOf( "%" ) > -1 ) rgb[ x ] = Math.round( parseFloat( rgb[ x ] ) * 2.55 ); 
        } 
        var toHex = function( string ){ 
                string = parseInt( string, 10 ).toString( 16 ); 
                string = ( string.length === 1 ) ? "0" + string : string; 
                return string; 
        }; 
        var r = toHex( rgb[ 0 ] ); 
        var g = toHex( rgb[ 1 ] ); 
        var b = toHex( rgb[ 2 ] ); 
        var hexType = "#" + r + g + b; 
        return hexType; 
	}*/
	 
	/** Object Move in Canvas */
	canvas.on('object:moving', function (e) {
		var obj = e.target;
		// if object is too big ignore
		if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
			return;
		}
		obj.setCoords();
		// top-left  corner
		if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
			obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
			obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
		}
		// bot-right corner
		if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
			obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
			obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
		}
	});
	
	/** Add Image 
		document.getElementById('imgFile').addEventListener("change", function (e) {
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.onload = function (f) {
			var data = f.target.result;                    
			fabric.Image.fromURL(data, function (img) {
			var oImg = img.set({left: 0, top: 0})
			canvas.add(oImg).renderAll();
			var a = canvas.setActiveObject(oImg);
			var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
			});
		};
		reader.readAsDataURL(file);
	});*/
 

	/** add SVG */
		document.getElementById('imgFile').addEventListener("change",function(e){
			var fileType = e.target.files[0].type;
			var url = URL.createObjectURL(e.target.files[0]);
			
			switch(fileType){
			case 'image/png' :
				fabric.Image.fromURL(url, (img) => {
					 if(img.width > canvas.getWidth() || img.hieght > canvas.getHeight()){
						 img.scaleToWidth(img.width*0.4);
						 img.scaleToHeight(img.height*0.4);
					 }
					  canvas.add(img);
				   });
				break;
				
			case 'image/jpeg' :
				fabric.Image.fromURL(url, (img) => {
					if(img.width > canvas.getWidth() || img.hieght > canvas.getHeight()){
						img.scaleToWidth(img.width*0.4);
					    img.scaleToHeight(img.height*0.4);
					 }
					  canvas.add(img);
				   });
				break;
				
			case 'image/svg+xml' :
				fabric.loadSVGFromURL(url, function(objects, options) {
					canvas.add.apply(canvas, objects);
					canvas.renderAll();
			   });
				break;
			}
		})

	/** Add Background */
	document.getElementById('bgFile').addEventListener("change", function(e) {
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.onload = function(f) {
			var data = f.target.result;
			fabric.Image.fromURL(data, function(img) {
				// add background image
				canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
					scaleX: canvas.width / img.width,
					scaleY: canvas.height / img.height
				});
			});
		};
		reader.readAsDataURL(file);
	});
		/*
		
	$("#text-color").spectrum({
	    preferredFormat: "rgb",
	    showInput: true,
	    move : function(color) {
	    	canvas.getActiveObject().set('fill', color);
	    	canvas.renderAll();
	    },
	    change : function(color){
	    	console.log(canvas.getActiveObject());
	    	if(canvas.getActiveObject == null)
	    	canvas.getActiveObject().set('fill', color);
	    	canvas.renderAll();
	    },
	    hide : function(color){
	    	canvas.getActiveObject().set('fill', color);
	    	canvas.renderAll();
	    }
	});
	
	$("#text-bg-color").spectrum({
	    preferredFormat: "rgb",
	    showInput: true,
	    move : function(color) {
	    	canvas.getActiveObject().set('textBackgroundColor', color);
	    	canvas.renderAll();
	    },
	    change : function(color){
	    	canvas.getActiveObject().set('textBackgroundColor', color);
	    	canvas.renderAll();
	    },
	    hide : function(color){
	    	canvas.getActiveObject().set('textBackgroundColor', color);
	    	canvas.renderAll();
	    }
	});
	
	$("#text-stroke-color").spectrum({
	    preferredFormat: "rgb",
	    showInput: true,
	    move : function(color) {
	    	canvas.getActiveObject().set('stroke', color);
	    	canvas.renderAll();
	    },
	    change : function(color){
	    	canvas.getActiveObject().set('stroke', color);
	    	canvas.renderAll();
	    },
	    hide : function(color){
	    	canvas.getActiveObject().set('stroke', color);
	    	canvas.renderAll();
	    }
	});*/
	
	
	/** Add Property */
	addHandler('font-family', function(obj) {
			setStyle(obj, 'fontFamily', this.value);
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
		if(obj.fontWeight == 'bold'){
			setStyle(obj, 'fontWeight', 'normal');
		} else {
			setStyle(obj, 'fontWeight', this.value);
		}			
		}, 'onchange');
		
	addHandler('text-cmd-italic', function(obj) {
		if(obj.fontStyle == 'italic'){
			setStyle(obj, 'fontStyle', 'normal');
		} else {
			setStyle(obj, 'fontStyle', this.value);
		}
		}, 'onchange');   
		
	addHandler('text-cmd-underline', function(obj) {
		var isUnderline = (getStyle(obj, 'underline') || false);
		setStyle(obj, 'underline', isUnderline ? false : true);
		obj.dirty = true;
	});

	addHandler('text-cmd-linethrough', function(obj) {
		var islinethrough = (getStyle(obj, 'linethrough') || false);
		setStyle(obj, 'linethrough', islinethrough ? false : true);
		obj.dirty = true;
		});

	addHandler('text-cmd-overline', function(obj) {
		var isoverline = (getStyle(obj, 'overline') || false);
		setStyle(obj, 'overline', isoverline ? false : true);
		obj.dirty = true;
		});
		
	function setStyle(object, styleName, value) {
	if (object.setSelectionStyles && object.isEditing) {
		var style = { };
		style[styleName] = value;
		object.setSelectionStyles(style);
	}
	else {
		object[styleName] = value;
	}
	}
	function getStyle(object, styleName) {
	return (object.getSelectionStyles && object.isEditing)
		? object.getSelectionStyles()[styleName]
		: object[styleName];
	}
	function addHandler(id, fn, eventName) {
		document.getElementById(id)[eventName || "onclick"] = function() {
			var el = this;
			//alert(this.value);
			if (obj = canvas.getActiveObject()) {
				fn.call(el, obj);
				canvas.renderAll();
			}
		};
	}    	
	});