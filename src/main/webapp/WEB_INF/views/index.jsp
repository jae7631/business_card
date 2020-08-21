<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="http://code.jquery.com/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.6.3/fabric.min.js"></script>

    <script type="text/javascript">
    $(document).ready(function(){

	 fabric.Object.prototype.transparentCorners = false;
	 fabric.Object.prototype.padding = 5;
	    
	var canvas = this.__canvas = new fabric.Canvas('canvas-area');
	  	canvas.setHeight(300);
           canvas.setWidth(450);
    
	   
	$('#test').on("click",function() { 
		var text = new fabric.IText('Lorem ipsum',{
			fontSize:16,
			left:20,
			top:20
			});
		canvas.add(text).setActiveObject(text);
	});

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
	function getStyle(object, styleName) {
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
    <title>Main</title>
    <style>
    #canvas-area {
        width:400px;
        height:250px;
        border:1px solid red;
        background: #fff;
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        margin:auto;
    }
    </style>

</head>

<body>

    <!--content wrapper-->
    <div id="content-wrapper" class="d-flex flex-column">
      <!--header-->
      <nav class="navbar navbar-expand navbar-dark bg-dark topbar mb-4 static-top shadow">
        <ul class="navbar-nav">
          <li class="navbar-item"><a class="nav-link" href="#">Home</a></li>
          <li class="navbar-item"><a class="nav-link" href="#">List</a></li>
          <li class="navbar-item active"><a class="nav-link" href="#">Create</a></li>
          <li class="navbar-item"><a class="nav-link" href="#">ImageView</a></li>
        </ul>
      </nav>
      <!-- //header-->

      <!--container-->
      <div class="container">
        <!--Page header-->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Create Page</h1>
        </div>
        <!--//Page header-->

        <!-- row -->
        <div class="row my-1">
          <!-- main content-->
          <div class="col-sm-12">
            <!-- shadow-->
            <div class="card shadow mb-2 text-left" style="margin: 2vh auto auto;">
              <!-- main content Title-->
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">名刺</h6>
              </div>
              <!-- //main content Title-->

              <!-- main content body-->
              <div class="row card-body">
                <!-- input Form-->

                <!-- canvas Area-->
                <div class="col-sm-6">
                  <div class="card shadow mb-2 text-left" style="max-width:40rem; margin: 2vh auto auto;">
                    <div class="card-body" style="height: 450px; background: #f3f3f3;">
                        <canvas id="canvas-area"></canvas>
                    </div>
                  </div>
                </div>
                <!-- //canvas Area-->

                <!-- canvas attribute Area-->
                <div class="col-sm-6">
                  <div class="card shadow mb-2 text-left" style="max-width:40rem; margin: 2vh auto auto;">
                    <div class="card-body">
                      <div class="container-fluid">
                        <div class="row my-1 py-2"><button class="btn btn-outline-primary btn-block" id="test">テキスト追加</button></div>
                        <div class="row my-1 py-2">
                          <div class="col-sm-2"><label for="font">Font</label></div>
                          <div class="col-sm-4">
                             <select id="font-family" class="form-control">
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
                        </div>
                        <div class="col-sm-3"><label for="text-font-size">Font size:</label></div>
                        <div class="col-sm-3"><input type="range" value="" min="1" max="120" step="1" id="text-font-size" class="form-control-range"></div>
                        </div>
                        <div class="row my-1 py-2">
                          <div class="col-sm-3"><label for="text-align">Text-Align</label></div>
                          <div class="col-sm-3">
                            <select id="text-align" class="form-control">
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                                <option value="justify">Justify</option>
                            </select>
                          </div>
                          <div class="col-sm-3"><label for="text-bg-color">背景色</label></div>
                          <div class="col-sm-3"><input type="color" class="form-control form-control-sm"
                              id="text-bg-color"></div>
                        </div>

                        <div class="row my-1 py-2">
                            <div class="col-sm-3"><label for="text-stroke-width">Stroke width</label></div>
                            <div class="col-sm-3"><input type="range" class="form-control-range" id="text-stroke-width" value="1" min="1" max="5"></div>
                            <div class="col-sm-3"><label for="text-stroke-color">Stroke color</label></div>
                            <div class="col-sm-3"><input type="color" class="form-control form-control-sm" id="text-stroke-color"></div>
                        </div>
                          
                        <div class="row my-1 py-2">
                          <div class="col-sm-3"><label for="text-line-height">Line height:</label></div>
                          <div class="col-sm-9"><input type="range" value="" min="0" max="10" step="0.1" id="text-line-height"></div>
                        </div>
                        <div class="row my-1 py-2">
                          <div class="col-sm-1"><label for="text-cmd-bold">Bold</label></div>
                          <div class="col-sm-1"><input type="checkbox" class="form-control-checkbox" id="text-cmd-bold" name="fontType"></div>

                          <div class="col-sm-1"><label for="text-cmd-italic">Italic</label></div>
                          <div class="col-sm-1"><input type="checkbox" class="form-control-checkbox" id="text-cmd-italic" name="fontType"></div>

                          <div class="col-sm-2"><label for="text-cmd-underline">Underline</label></div>
                          <div class="col-sm-1"><input type="checkbox" class="form-control-checkbox" id="text-cmd-underline" name="fontType"></div>

                          <div class="col-sm-2"><label for="text-cmd-through">LineThrough</label></div>
                          <div class="col-sm-1"><input type="checkbox" class="form-control-checkbox" id="text-cmd-through" name="fontType"></div>
                        
                          <div class="col-sm-1"><label for="text-cmd-overline">overLine</label></div>
                          <div class="col-sm-1"><input type="checkbox" class="form-control-checkbox" id="text-cmd-overline" name="fontType"></div>
                        </div>
                        
                        <div class="row my-1 py-2" role="group">
                            <div class="col-sm-4"><button class="btn btn-outline-primary btn-block">gridOn</button>
                          </div>
                            <div class="col-sm-4"><input type="reset" class="btn btn-outline-primary btn-block"
                                value="リセット" onclick="return confirmReset();"></div>
                            <div class="col-sm-4"><button class="btn btn-outline-primary btn-block"
                                onclick="init();">保存</button></div>
                          <input type="hidden" id="jsonData" name="jsonData">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- //canvas attribute Area-->
              </div>
              <!-- //main content body-->
            </div>
            <!-- //shadow-->
          </div>
          <!-- //main content-->
        </div>
        <!-- //row-->
      </div>
      <!-- //container-->
    </div>
    <!-- //content wrapper-->

</body>
<script type="text/javascript">
    function save() {
        var dataArr = new Array();

        var length = $("#rightform input[type=text]").length;

        for (var i = 0; i < length; i++) {
            var dataObj = new Object();
            dataObj.text = $("#rightform input[type=text]:eq(" + i + ")").val();
            dataArr.push(dataObj);
        }

        var jsonData = JSON.stringify(dataArr);
        $("#jsonData").val(jsonData);
        var form = document.createBusinessCard;
        form.submit();
    }

    $('#reset').on('click', function(){
		if(confirm("入力データをリセットしますか？")){
			return true;
		}else{
			return false;
		}
    });
    

    $('#saveInput').on('click', function(){
	    $('input[type="text"]').each(function(){    
	        var id = $(this).attr('id');
	        var value = $(this).val();
	       localStorage.setItem(id, value);
	    });   
	});
    

   
</script>

</html>