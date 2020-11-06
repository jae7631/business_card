
/** Create Templet */
function createBusinessCard(fileName, jsonData, imgData) {
	$.ajax({
		url: "/createBusinessCard",
		data: {jsonData: jsonData, fileName: fileName, imgData: imgData},
		method: "POST",
        dataType: "text",
        success: function (data) {
            alert("success");
            $('#modal2').modal('hide');
        },
        error: function (request, status, error) {
            alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}

/** load List */
function loadBusinessCardList(canvas){
    $.ajax({
        url: "/selectBusinessCardList",
        traditional:true,
        contentType: "application/json; charset=utf-8",
        method: "POST",
        dataType: "json",
        success: function (data) {
			console.log(data);
        	var output = "";
			for(var i = 0 in data){
				output += "<tr id= 'table_row" + data[i].idx + "'";
    			output += "class='trow'"+">";
				output += "<td class='align-middle txt_center del_chk'><input type='checkbox' name='chk'></td>"
				output += "<td class='align-middle txt_center idx'>";
				output += data[i].idx;
				output += "</td>";
				output += "<td class='align-middle'><img src='";
				output += data[i].thumbnailPath + "' style='width:80%;height:45%; border:1px solid black;'>" + "</td>";
				output += "<td class='align-middle file_txt'>";
				output += data[i].id;
				output += "</td>";
				output +="</tr>";
			}     	
        	$("#listBody").html(output);
        	
			// Set Pagnation
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
        	         
			
			
			// load Namecard to canvas
			$(".file_txt").on("click",function(){
				var tr = $(this).parent();
				var val = tr.children().eq(3).text();
				var idx = tr.children().eq(1).text();
				if(confirm(val + "を読み込みますか？")){
				loadBusinessCard(idx,val,canvas);	
				}					
			})			
      },
        error: function (request, status, error) {
            alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }	
    });
}

/** Load Templet */
function loadBusinessCard(idx,val,canvas){
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
            updateBusinessCard(idx, val,canvas);
        },
        error: function (request, status, error) {
            alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}


/** Delete Templet */
function deleteNamecard(checkList){
	$.ajax({
		url : "/deleteBusinessCard",
		data : {"checkList" : checkList},
		method : "POST",
		traditional : true,
		success : function(data){
			alert("削除しました。");
			loadBusinessCardList();
		},
		error : function (request, status, error) {
            alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
	})
}

/** load Thumbnail*/
/*
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
*/


/** update namecard */
function updateBusinessCard(idx, val,canvas){
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

function searchBusinessCard(keyword, searchType){
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
			/*
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
			})*/
			
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
}