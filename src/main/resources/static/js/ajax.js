/** Create Templet */
function createBusinessCard(fileName, jsonData, imgData, widthFlag) {
	$.ajax({
		url: "/createBusinessCard",
		data: {
			jsonData: jsonData,
			fileName: fileName,
			imgData: imgData,
			widthFlag: widthFlag
		},
		method: "POST",
		dataType: "text",
		success: function(data) {
			alert("success");
			$('#modal2').modal('hide');
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
				+ request.responseText + "\n" + "error:" + error);
		}
	});
}

/** Load TempletList */
function loadBusinessCardList(canvas) {
	$.ajax({
		url: "/selectBusinessCardList",
		traditional: true,
		contentType: "application/json; charset=utf-8",
		method: "POST",
		dataType: "json",
		success: function(data) {
			var output = "";
			for (var i = 0 in data) {
				output += "<tr id= 'table_row" + data[i].idx + "'";
				output += "class='trow'" + ">";
				output += "<td class='align-middle txt_center del_chk'><input type='checkbox' name='chk'></td>"
				output += "<td class='align-middle txt_center idx'>";
				output += data[i].idx;
				output += "</td>";
				output += "<td class='align-middle'><div style='text-align:center; height:210px;'><img class='thumb' id ='thumb" + data[i].idx + "' style='height:100%; border:1px solid #d3d3d3' src='" + "/";
				output += data[i].thumbnailPath
					+ "'>" + "</div>"
					+ "</td>";
				output += "<td class='align-middle file_txt'>";
				output += data[i].id;
				output += "</td>";
				output += "</tr>";
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
				onPageClick: function(pageNumber) {
					var showFrom = perPage * (pageNumber - 1);
					var showTo = showFrom + perPage;
					items.hide().slice(showFrom, showTo).show();
				}
			});
			// load Namecard to canvas
			$(".file_txt").on("click", function() {
				var td = $(this).parent().children();
           		var val = td.eq(3).text();
            	var idx = td.eq(1).text();

				var imgSrc = td.eq(2).children().children().attr("src");
				var imgEle = new Image();
				imgEle.src = imgSrc;

				if (confirm(val + "を読み込みますか？")) {
					loadBusinessCard(idx, val, canvas);
				}
				imgEle.addEventListener("load",function(){
					var width = this.width;
					var height = this.height;
					console.log(width);
					if(width < height){
						$('.canvas-container').removeClass('yoko');
						$('.canvas-container').addClass('tate');
			       		$("#size_modify").text("よこ");
			       		canvas.setWidth(300);
			       		canvas.setHeight(450);
					}else{
						$('.canvas-container').addClass('yoko');
						$('.canvas-container').removeClass('tate');
			        	canvas.setWidth(450);
			        	canvas.setHeight(300);
						$("#size_modify").text("たて");
					}
				})
			})

		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
				+ request.responseText + "\n" + "error:" + error);
		}
	});
	
			
}

/** Load Templet */
function loadBusinessCard(idx, val, canvas) {
	$.ajax({
		url: "/selectBusinessCard",
		data: {
			idx: idx,
			id: val
		},
		method: "POST",
		dataType: "text",
		success: function(data) {
			$('#modal1').modal('hide');
			canvas.clear();
			canvas.loadFromJSON(data, function() {
				canvas.renderAll();
			});
			// Overwrite Namecard
			//updateBusinessCard(idx, val, canvas);
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
				+ request.responseText + "\n" + "error:" + error);
		}
	});
}

/** Delete Templet */
function deleteNamecard(checkList) {
	$.ajax({
		url: "/deleteBusinessCard",
		data: {
			"checkList": checkList
		},
		method: "POST",
		traditional: true,
		success: function(data) {
			alert("削除しました。");
			loadBusinessCardList();
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
				+ request.responseText + "\n" + "error:" + error);
		}
	})
}

/** update namecard */
function updateBusinessCard(idx, id, jsonData, imgData, widthFlag) {
	$.ajax({
		url: "/updateBusinessCard",
		method: "POST",
		data: { idx: idx, id: id, jsonData: jsonData, imgData: imgData, widthFlag: widthFlag },
		dataType: "text",
		success: function(data) {
			alert("success");
		},
		error: function(request, status, error) {
			alert("code:" + request.status + "\n" + "message:"
				+ request.responseText + "\n" + "error:" + error);
		}
	})
}

function searchBusinessCard(keyword, searchType, canvas) {
	$.ajax({
		url: "/searchBusinessCard",
		data: {
			keyword: keyword,
			searchType: searchType
		},
		method: "POST",
		dataType: "json",
		success: function(data) {

			console.log(data);
			var output = "";
			for (var i = 0 in data) {
				output += "<tr id= 'table_row" + data[i].idx + "'";
				output += "class='trow'" + ">";
				output += "<td class='align-middle txt_center del_chk'><input type='checkbox' name='chk'></td>"
				output += "<td class='align-middle txt_center idx'>";
				output += data[i].idx;
				output += "</td>";
				output += "<td class='align-middle'><img src='" + "/";
				output += data[i].thumbnailPath
					+ "' style='width:80%;height:45%; border:1px solid black;'>"
					+ "</td>";
				output += "<td class='align-middle file_txt'>";
				output += data[i].id;
				output += "</td>";
				output += "</tr>";
			}

			$("#listBody").html(output);

			// load Namecard to canvas
			$(".file_txt").on("click", function() {
				var tr = $(this).parent();
				var val = tr.children().eq(3).text();
				var idx = tr.children().eq(1).text();
				if (confirm(val + "を読み込みますか？")) {
					loadBusinessCard(idx, val, canvas);
				}
			})
		},
		error: function(request, status, error) {
		}
	})
}
