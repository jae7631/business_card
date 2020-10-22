$(document).ready(function () {
    /** Create Canvas */
    fabric.Object.prototype.transparentCorners = false;
    //fabric.Object.prototype.padding = 5;
    var grid = $("#gridSize").val();
    var canvas = this.__canvas = new fabric.Canvas('canvas-area');
    canvas.setHeight(300);
    canvas.setWidth(450);
    $('.canvas-container').addClass('yoko');



    /** change fontScale to fontSize */
    $('#text-font-size').keyup(function () {
        var val = $(this).val();
        if (isNaN(val)) {
            alert('please enter number');
            $(this).val('');
        }
        var activeObject = canvas.getActiveObject();
        activeObject.fontSize = val;
        canvas.renderAll();
    });

    /** add TextBox */
    $('#add-text-btn').click(function () {
        if ($('#text-font-size').val()) {
            var txtfontsize = $('#text-font-size').val();
        } else {
            txtfontsize = 45;
        }
        var new_text = new fabric.IText("Text", {
            left: 100,
            top: 100,
            fontSize: txtfontsize,
            lockUniScaling: true,
            fontFamily: "helvetica",
            fill: '#000000',
            stroke: '#000000',
            strokeWidth : 0,
            strokeUniform: true,
            lineHeight : 1
        });
        canvas.add(new_text);
        canvas.setActiveObject(new_text);
    });

    canvas.on('object:scaling', function (event) {
        if (event.target) {
            $('#text-color').spectrum("set", event.target.fill);
			$('#text-bg-color').spectrum("set", event.target.textBackgroundColor);
            $("#text-font-size").val((event.target.fontSize * event.target.scaleX).toFixed(0));
        }
    });

    canvas.on('object:modified', function (event) {
        if (event.target) {
            $('#text-color').spectrum("set", event.target.fill);
			$('#text-bg-color').spectrum("set", event.target.textBackgroundColor);
            event.target.fontSize *= event.target.scaleX;
            event.target.fontSize = event.target.fontSize.toFixed(0);
            event.target.scaleX = 1;
            event.target.scaleY = 1;
            $("#text-font-size").val(event.target.fontSize);
        }
    });
    
    /** add Rectangle */
    $("#add-rect-btn").on("click",function(){
    	var rect = new fabric.Rect({
    		  left: 100,
    		  top: 100,
    		  fill: 'blue',
    		  width: 50,
    		  height: 50,
    		  stroke : '',
    		  strokeWidth : 0
    		});
    	canvas.add(rect);
    	canvas.setActiveObject(rect);
    })
    /** add triangle */
    $("#add-tri-btn").on("click",function(){
    	var triangle = new fabric.Triangle({
    		  left: 100,
    		  top: 100,
    		  fill: 'blue',
    		  width: 50,
    		  height: 50,
    		  stroke : '',
    		  strokeWidth : 0
    		});
    	canvas.add(triangle);
    	canvas.setActiveObject(triangle);
    })
    
    /** add circle */
    $("#add-cir-btn").on("click",function(){
    	var Circle = new fabric.Circle({
    		radius: 20,
    		  left: 100,
    		  top: 100,
    		  fill: 'blue',
    		  width: 50,
    		  height: 50,
    		  stroke : '',
    		  strokeWidth : 0
    		});
    	canvas.add(Circle);
    	canvas.setActiveObject(Circle);
    })

    /** Object Move in Canvas */
    canvas.on('object:moving', function (event) {
        console.log("move");
        var obj = event.target;
        // if object is too big ignore
        if (obj.getBoundingRect().height > canvas.height || obj.getBoundingRect().width > obj.canvas.width) {
            return;
        }
        obj.setCoords();
        // top-left  corner
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
            obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
        }
        // bot-right corner
        if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
            obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
        }

        //snap to grid
        if (Math.round(event.target.left / grid * 4) % 4 == 0 && Math.round(event.target.top / grid * 4) % 4 == 0) {
            event.target.set({
                left: Math.round(event.target.left / grid) * grid,
                top: Math.round(event.target.top / grid) * grid
            }).setCoords();
        }
    });

  	/** object property */
    canvas.on('object:selected', function (event) {
        console.log("sel");
        console.log(event.target);
        console.log(event.target.text);
        $('#text-align').val(event.target.textAlign);
        $('#text-font-size').val(event.target.fontSize);
        if (event.target) {
            $('#text-color').spectrum("set", event.target.fill);
            $('#text-bg-color').spectrum("set", event.target.textBackgroundColor);
            $('#text-stroke-color').spectrum("set", event.target.stroke)
        }
        $('#text-cmd-underline').prop("checked", event.target.underline);
        $('#text-stroke-width').val(event.target.strokeWidth);
        $('#text-line-height').val(event.target.lineHeight);
        $('#font-family').val(event.target.fontFamily);

        if (event.target.fontWeight == "bold") {
            $('#text-cmd-bold').prop("checked", true);
        } else {
            $('#text-cmd-bold').prop("checked", false);
        }

        if (event.target.fontStyle == "italic") {
            $('#text-cmd-italic').prop("checked", true);
        } else {
            $('#text-cmd-italic').prop("checked", false);
        }

        if (event.target) {
            $("#text-font-size").val(event.target.fontSize);
        }
    });

    /** Click other Object */
    canvas.on('selection:updated', function (event) {
        $('#text-align').val(event.target.textAlign);
        $('#text-font-size').val(event.target.fontSize);
        if (event.target) {
        	console.log(event.target.text);
            $('#text-color').spectrum("set", event.target.fill);
            $('#text-bg-color').spectrum("set", event.target.textBackgroundColor);
            $('#text-stroke-color').spectrum("set", event.target.stroke);
        }
        $('#text-cmd-underline').prop("checked", event.target.underline);
		$('#text-stroke-width').val(event.target.strokeWidth);
        $('#text-line-height').val(event.target.lineHeight);
        $('#font-family').val(event.target.fontFamily);

        if (event.target.fontWeight == "bold") {
            $('#text-cmd-bold').prop("checked", true);
        } else {
            $('#text-cmd-bold').prop("checked", false);
        }

        if (event.target.fontStyle == "italic") {
            $('#text-cmd-italic').prop("checked", true);
        } else {
            $('#text-cmd-italic').prop("checked", false);
        }
    });

    /** Add & Remove Grid */
    $("#gridBtn").click(function () {
        if ($('#gridBtn').text() == "gridOn") {
            $('#gridBtn').removeClass('grid-on');
            $('#gridBtn').addClass('grid-off');
            $('#gridBtn').text("gridOff");
            
            for (var i = 0; i < (500 / grid); i++) {
                canvas.add(new fabric.Line([i * grid, 0, i * grid, 500], {
                    stroke: '#ccc',
                    selectable: false
                }));
                canvas.add(new fabric.Line([0, i * grid, 500, i * grid], {
                    stroke: '#ccc',
                    selectable: false
                }))
            } 
        } else if ($('#gridBtn').text() == "gridOff") {
            $('#gridBtn').removeClass('grid-off');
            $('#gridBtn').addClass('grid-on');
            $('#gridBtn').text("gridOn");
            var objects = canvas.getObjects('line');
            for (let i in objects) {
                canvas.remove(objects[i]);
            }
        }
    });

    /**Grid Resizing */   
    $('#gridSize').change(function(){
        var objects = canvas.getObjects('line');
        var cur_grid = parseInt($(this).val());
        grid = cur_grid;
        if ($('#gridBtn').text() == "gridOff" && fabric.Line) {
            for (let i in objects) {
                canvas.remove(objects[i]);
            }
            for (var i = 0; i < (500 / grid); i++) {
                canvas.add(new fabric.Line([i * grid, 0, i * grid, 500], {
                    stroke: '#ccc',
                    selectable: false
                }));
                canvas.add(new fabric.Line([0, i * grid, 500, i * grid], {
                    stroke: '#ccc',
                    selectable: false
                }))
            } 
        }
    })
   
    /** canvas save */
    $('#createBusinessCard').on("click", function(){
    	var fileName = $('#fileName').val();
    	var jsonData = JSON.stringify(canvas);
    	var reg = /^[A-Za-z0-9+]*$/; 
    	var pattern1 = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){4,}$/;

    	
    	if(fileName === "" || null){
    		alert("ファイル名を入力してください");
    		return false;
    	}else if(pattern1.test(fileName)){
    		alert("半角英数字だけ可能です");
    		return false;
    	}
    	createBusinessCard(fileName, jsonData);    	
    });
    
    function createBusinessCard(fileName, jsonData) {
    	$.ajax({
    		url: "/createBusinessCard",
    		data: {jsonData: jsonData, fileName: fileName},
    		method: "POST",
            dataType: "text",
            success: function (data) {
                this.href = canvas.toDataURL({
                    format: 'png',
                    multiplier: 4,
                });
                const link = document.createElement('a');
                link.download = fileName+'.png';
                link.href = this.href;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                document.getElementById('fileName').value = ''
                alert("success");
                $('#modal2').modal('hide');
            },
            error: function (request, status, error) {
                alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
    }

    
    /** call Save Modal */
    $('#save').on("click", function () {
    	//remove grid
        if ($('#gridBtn').text() == "gridOff") {
            $('#gridBtn').removeClass('grid-off');
            $('#gridBtn').addClass('grid-on');
            $('#gridBtn').text("gridOn");
            var objects = canvas.getObjects('line');
            for (let i in objects) {
                canvas.remove(objects[i]);
            }
        }
        canvas.renderAll();
        $('#modal2').modal('show');          
    });

    /** Canvas Resizing*/
    $('#size_modify').on("click", function () {
        if (confirm("サイズ変更時、内容は初期化されます。よろしいですか。") === true) {
            if (canvas.getHeight() == 300) {
                canvas.clear();
                canvas.setHeight(450);
                canvas.setWidth(300);
                canvas.calcOffset();
                $('#size_modify').text("よこ");
                $('#size_modify').addClass("yokotxt");
                $('.canvas-container').removeClass('yoko');
                $('.canvas-container').addClass('tate');
            } else if (canvas.getHeight() == 450) {
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
        
	/** close NamecardList Modal*/
	$("#btn_back").on("click",function(){
		$('#modal1').modal('hide'); 
	});
   
    /** call NamecardList Modal */
    $('#load').on("click", function () {
        $('#modal1').modal('show'); 
        loadNamecardList();
    });
    
    /** load List*/
    function loadNamecardList(){
        $.ajax({
            url: "/selectBusinessCardList",
            traditional:true,
            contentType: "application/json; charset=utf-8",
            method: "POST",
            dataType: "json",
            success: function (data) {
            	var container = $("#pagination");
            	var output = "";

            	$.each(data, function(idx, val) {
        			output += "<tr id= 'table_row" + idx + "'";
        			output += "class='trow'"+">";
					output += "<td class='align-middle txt_center del_chk'><input type='checkbox' name='chk'></td>"
    				output += "<td class='align-middle txt_center idx'>";
    				output += idx;
    				output += "</td>";
    				output += "<td class='align-middle'>" + "<canvas class='thumbnailCanvas' id = thumbnail-area";
					output += idx + ">" + "</canvas>" + "</td>";
					output += "<td class='align-middle file_txt'>";
					output += val;
					output += "</td>";
					output +="</tr>";				
            	});
            		   

            	$("#listBody").html(output);
            	
            	var items = $("#listBody .trow");
            	var numItems = items.length;
            	var perPage = 4;
            	
            	items.slice(perPage).hide();
            	
            	$("#pagination-container").pagination({
                    items: numItems,
                    itemsOnPage: perPage,
                    prevText: "&laquo;",
                    nextText: "&raquo;",
                    cssStyle: "light-theme",
                    onPageClick: function (pageNumber) {
                        var showFrom = perPage * (pageNumber - 1);
                        var showTo = showFrom + perPage;
                        items.hide().slice(showFrom, showTo).show();
                    }
                });
            	         
            	// Set Namecard thumbnails Size
				$.each(data, function(idx, val){
			    var thumbnail = new fabric.Canvas('thumbnail-area' + idx);
			    	fabric.Object.prototype.transparentCorners = false;
				    thumbnail.setHeight(300);
    				thumbnail.setWidth(450);
    		  		thumbnail.setZoom(0.4);
            		thumbnail.setWidth(thumbnail.getWidth() * thumbnail.getZoom());
            		thumbnail.setHeight(thumbnail.getHeight() * thumbnail.getZoom());
					//call thumbnails function
					loadThumbnail(idx,val,thumbnail);
				})
				
				// load Namecard to canvas
				$(".file_txt").on("click",function(){
					var tr = $(this).parent();
					var val = tr.children().eq(3).text();
					var idx = tr.children().eq(1).text();
					if(confirm(val + "を読み込みますか？")){
					loadBusinessCard(idx,val);	
					}
					
				})
			
          },
            error: function (request, status, error) {
                alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }	
        });
    }
    
    /** All check namecardList*/
	$("#checkAll").on("click",function(){
		if($("#checkAll").prop("checked")){
			$("input[name=chk]").prop("checked",true);
		}else{
			$("input[name=chk]").prop("checked",false);
		}
	})	
				
	/** delete namecardList */
	$("#btn_del").on("click",function(){
		var check = $("input:checkbox[name=chk]:checked");
		var checkList = new Array();
		var a;
		if($("input:checkbox[name=chk]:checked").length === 0){
			alert("リストを選択してください")
		}else if(confirm("選択した名刺を削除しますか？")===true){
			check.each(function(){
				a = $(this).parent().next().text();
				checkList.push(a);
			})
				$.ajax({
					url : "/deleteBusinessCard",
					data : {"checkList" : checkList},
					method : "POST",
					traditional : true,
					success : function(data){
						alert("削除しました。");
						loadNamecardList();
					},
					error : function (request, status, error) {
		                alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		            }
				})
			
		}
	})
	

	/** load Thumbnail*/
	function loadThumbnail(idx, val, thumbnail){
		$.ajax({
			url : "/selectBusinessCard",
			data : {id: val, idx:idx},
			 method : "POST",
			success : function(data){
				thumbnail.loadFromJSON(data, thumbnail.renderAll.bind(thumbnail),function(o,object){
					object.set('selectable', false);
				})
			},
			error : function(request,status, error){
				 alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
			}
		});	
	}
		
	/** Load Templet */
	function loadBusinessCard(idx,val){
	      $.ajax({
            url: "/selectBusinessCard",
            data: { idx: idx, id:val },
            method: "POST",
            dataType: "text",
            success: function (data) {
            	$('#modal1').modal('hide'); 
                canvas.clear();
                canvas.loadFromJSON(data, function () {
                	canvas.renderAll();
                });
                // Overwrite Namecard
                updateBusinessCard(idx, val);
            },
            error: function (request, status, error) {
                alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            }
        });
	}
	
	/** search namecard */
		$("#namecardSearch").on("click",function(){
			var keyword = $("#keyword").val();
			var searchType = $("#searchType").val();
			if(keyword === ""||null){
				alert("キーワードを入力してください。");
				return false;
			}
			$.ajax({
				url : "/searchBusinessCard",
				data : {keyword : keyword, searchType : searchType},
				method : "POST",
				dataType: "json",
				success : function(data){
					alert("success");
					console.log(data);
					var output = "";
        			$.each(data, function(idx, val) {
        			output += "<tr id= 'table_row" + idx + "'";
        			output += "class='trow'"+">";
					output += "<td class='align-middle txt_center del_chk'><input type='checkbox' name='chk'></td>"
    				output += "<td class='align-middle txt_center idx'>";
    				output += idx;
    				output += "</td>";
    				output += "<td class='align-middle'>" + "<canvas class='thumbnailCanvas' id = thumbnail-area";
					output += idx + ">" + "</canvas>" + "</td>";
					output += "<td class='align-middle file_txt'>";
					output += val;
					output += "</td>";
					output +="</tr>";
            	});
            	$("#listBody").html(output);

				// Set Namecard thumbnails Size
				$.each(data, function(idx, val){
			    var thumbnail = new fabric.Canvas('thumbnail-area' + idx);
			    	fabric.Object.prototype.transparentCorners = false;
				    thumbnail.setHeight(300);
    				thumbnail.setWidth(450);
    		  		thumbnail.setZoom(0.4);
            		thumbnail.setWidth(thumbnail.getWidth() * thumbnail.getZoom());
            		thumbnail.setHeight(thumbnail.getHeight() * thumbnail.getZoom());
					//call thumbnails function
					loadThumbnail(idx,val,thumbnail);
				})
				
				// load Namecard to canvas
				$(".file_txt").on("click",function(){
					var tr = $(this).parent();
					var val = tr.children().eq(3).text();
					var idx = tr.children().eq(1).text();
					if(confirm(val + "を読み込みますか？")){
					loadBusinessCard(idx,val);	
					}
					})
				},
				error: function (request, status, error) {
              }
			})
		});
	
			
	/** update namecard */
	function updateBusinessCard(idx, val){
		$("#update").on("click",function(){
			var newData = JSON.stringify(canvas);
			if(confirm("名刺を修正しますか？")===true){
				$.ajax({
					url : "/updateBusinessCard",
					data : {idx:idx, id:val, jsonData : newData},
					method : "POST",
					dataType: "json",
					success : function(data) {
						alert("success");
					},
					error : function (request, status, error) {
						alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
					}
				});
			}	
		});
	}
	
    /** Delete Object */
    $('html').keyup(function (event) {
        if (event.keyCode == 46) {
            var obj = canvas.getActiveObject();
            if (!obj.isEditing) {
                deleteSelectedObjectsFromCanvas();
            }
        }
    });

    function deleteSelectedObjectsFromCanvas() {
        var selection = canvas.getActiveObject();
        if (selection.type === 'activeSelection') {
            selection.forEachObject(function (element) {
                console.log(element);
                canvas.remove(element);
            });
        }
        else {
            canvas.remove(selection);
        }
        canvas.discardActiveObject();
        canvas.requestRenderAll();
    }

    /** add image */
    document.getElementById('imgFile').addEventListener("change", function (e) {
    	  var file = e.target.files[0];
    	  var reader = new FileReader();
    	  reader.onload = function (f) {
    	    var data = f.target.result;                    
    	    fabric.Image.fromURL(data, function (img) {
    	      var oImg = img.set({left: 0, top: 0, angle: 0}).scale(0.8);
    	      canvas.add(oImg).renderAll();
    	      //var a = canvas.setActiveObject(oImg);
    	      //var dataURL = canvas.toDataURL({format: 'svg', quality: 0.8});
    	    });
    	  };
    	  reader.readAsDataURL(file);
    	  $('input[type="file"]').val(null);
    	});
    /*
    document.getElementById('imgFile').onchange = function handleImage(e) {
    	var reader = new FileReader();
    	  reader.onload = function (event){
    	    var imgObj = new Image();
    	    imgObj.src = event.target.result;
    	    imgObj.onload = function () {
    	      var image = new fabric.Image(imgObj);
    	      image.set({
    	            angle: 0,
    	            padding: 10,
    	            cornersize:10,
    	            height:110,
    	            width:110,
    	      });
    	      canvas.centerObject(image);
    	      canvas.add(image);
    	      canvas.renderAll();
    	    }
    	  }
    	  reader.readAsDataURL(e.target.files[0]);
    	}*/
    /*
    document.getElementById('imgFile').addEventListener("change", function (event) {
        var fileType = event.target.files[0].type;
        var url = URL.createObjectURL(event.target.files[0]);
        
        switch (fileType) {
            case 'image/png':
                fabric.Image.fromURL(url, (img) => {
                    img.objectCaching = false;
                    if (img.width > canvas.getWidth() || img.hieght > canvas.getHeight()) {
                        img.scaleToWidth(img.width * 0.4);
                        img.scaleToHeight(img.height * 0.4);
                    }
                    canvas.add(img);
                    $('input[type="file"]').val(null);
                });
                break;

            case 'image/jpeg':
                fabric.Image.fromURL(url, (img) => {
                    img.objectCaching = false;
                    if (img.width > canvas.getWidth() || img.hieght > canvas.getHeight()) {
                        img.scaleToWidth(img.width * 0.4);
                        img.scaleToHeight(img.height * 0.4);
                    }
                    canvas.add(img);
                    $('input[type="file"]').val(null);
                });
                break;
                
            case 'image/gif':
                fabric.Image.fromURL(url, (img) => {
                    img.objectCaching = false;
                    if (img.width > canvas.getWidth() || img.hieght > canvas.getHeight()) {
                        img.scaleToWidth(img.width * 0.4);
                        img.scaleToHeight(img.height * 0.4);
                    }
                    canvas.add(img);
                    $('input[type="file"]').val(null);
                });
                break;
                
                

            case 'image/svg+xml':
                fabric.loadSVGFromURL(url, function (objects, options) {
                    canvas.add.apply(canvas, objects);
                    canvas.renderAll();
                    $('input[type="file"]').val(null);
                });
                break;
                
        }
       
    })*/


    /** Add Background */
    document.getElementById('bgFile').addEventListener("change", function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
            var data = f.target.result;
            fabric.Image.fromURL(data, function (img) {
                // add background image
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height
                });
            });
        };
        reader.readAsDataURL(file);
    });

    /** Remove Background */
    $('#bgDel').on("click",function(){
        if(confirm("背景を削除しますか？") === true)
            changeToColor();        
    })

    function changeToColor() {
        canvas.backgroundImage = 0;
        canvas.backgroundColor = '';
        canvas.renderAll();
    }

    var previousColor;
    var isCancel = false;
    $("#text-color").spectrum({
        preferredFormat: "hex",
        allowEmpty: true,
        showInitial: true,
        showInput: true,
        clickoutFiresChange: false,

        show: function (color) {
            console.log("show");
            isCancel = false;
            previousColor = color.toHexString();
			console.log(previousColor);
        },
        move: function (color) {
            console.log("move");
            canvas.getActiveObject().set('fill', color.toHexString());
            canvas.renderAll();
        },
        change: function (color) {
            console.log("change");
            isCancel = true;
            canvas.getActiveObject().set('fill', color.toHexString());
            canvas.renderAll();

        },
        hide: function (color) {
            console.log("hide");
            if (!isCancel && previousColor) {
                isCancel = true;
                canvas.getActiveObject().set('fill', previousColor.toHexString())
                canvas.renderAll();
            }
        }
    });
    
    $("#text-bg-color").spectrum({
        preferredFormat: "hex",
        allowEmpty: true,
        showInitial: true,
        showInput: true,
        clickoutFiresChange: false,
        show: function (color) {
            console.log("show");
            isCancel = false;
            previousColor = color;
            console.log(previousColor.toHexString());
        },
        move: function (color) {
            canvas.getActiveObject().set('textBackgroundColor', color.toHexString());
            canvas.renderAll();
        },
        change: function (color) {
            isCancel = true;
            canvas.getActiveObject().set('textBackgroundColor', color.toHexString());
            canvas.renderAll();
        },
        hide: function (color) {
			console.log("hide");
            if (!isCancel && previousColor) {
                isCancel = true;
                console.log(previousColor.toHexString());
                if (previousColor.toHexString() == "#000000") {
                    previousColor = "";
                }
                canvas.getActiveObject().set('textBackgroundColor', previousColor.toHexString());
                canvas.renderAll();
            }
        }
    });

	var strokePrevious;
	var strokeCancel;
	
    $("#text-stroke-color").spectrum({
        preferredFormat: "hex",
        allowEmpty: true,
        showInitial: true,
        showInput: true,
        clickoutFiresChange: false,

        show: function (color) {
            strokeCancel = false;
            strokePrevious = color;
        },
        move: function (color) {
            canvas.getActiveObject().set('stroke', color.toHexString());
            canvas.renderAll();
        },
        change: function (color) {
			strokeCancel = true;
                canvas.getActiveObject().set('stroke', color.toHexString());
                canvas.renderAll();
            
        },
        hide: function (color) {
			console.log("hide");
            if (!strokeCancel && strokePrevious) {
                strokeCancel = true;
                canvas.getActiveObject().set('stroke', strokePrevious.toHexString());
                canvas.renderAll();
            }
        }
    });
  

	addHandler('text-cmd-bold', function(obj) {
		  var isUnderline = (getStyle(obj, 'textDecoration') || '').indexOf('text-cmd-bold') > -1;
		  setStyle(obj, 'textDecoration', isUnderline ? '' : 'text-cmd-bold');
		});


    /** Add Property */
    addHandler('font-family', function (obj) {
        setStyle(obj, 'fontFamily', this.value);
    }, 'onchange');

    addHandler('text-font-size', function (obj) {
        setStyle(obj, 'fontSize', this.value);
    }, 'onchange');

    addHandler('text-line-height', function (obj) {
        setStyle(obj, 'lineHeight', this.value);
    }, 'onchange');

    addHandler('text-align', function (obj) {
        setStyle(obj, 'textAlign', this.value);
    },'onchange');
    
    addHandler('text-cmd-bold', function (obj) {
        if (obj.fontWeight == 'bold') {
            setStyle(obj, 'fontWeight', 'normal');
        } else {
            setStyle(obj, 'fontWeight', this.value);
        }
    }, 'onchange');

    addHandler('text-cmd-italic', function (obj) {
        if (obj.fontStyle == 'italic') {
            setStyle(obj, 'fontStyle', 'normal');
        } else {
            setStyle(obj, 'fontStyle', this.value);
        }
    }, 'onchange');

    addHandler('text-cmd-underline', function (obj) {
        var isUnderline = (getStyle(obj, 'underline') || false);
        setStyle(obj, 'underline', isUnderline ? false : true);
        obj.dirty = true;
    });

    $('#text-stroke-width').change(function(){
        var cur_val = parseInt($(this).val());
        var activeObj = canvas.getActiveObject();
        if(activeObj === undefined){
            alert('Please select the Object');
            return false;
        }
        activeObj.set({
            strokeWidth: cur_val
        });
        canvas.renderAll();
    })

    function setStyle(object, styleName, value) {
        if (object.setSelectionStyles && object.isEditing) {
            var style = {};
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
	  document.getElementById(id)[eventName || 'onclick'] = function() {
	    var el = this;
	    if (obj = canvas.getActiveObject()) {
	      fn.call(el, obj);
	      canvas.renderAll();
	    }
	  };
	}
});