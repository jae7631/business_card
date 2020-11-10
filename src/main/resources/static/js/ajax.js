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
			//loadBusinessCardList();
		},
		error : function (request, status, error) {
            alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
	})
}



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
/*
function searchBusinessCard(keyword, searchType){
	$.ajax({
			url : "/searchBusinessCard",
			data : {keyword : keyword, searchType : searchType},
			method : "POST",
			dataType: "json",
			success : function(data){
				alert("success");
				console.log(data);
				
        	});
        	//$("#listBody").html(output);
			
			
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
		})*/
/**
function searchBusinessCard(keyword,searchType){
	$.ajax({
		url : "/searchBusinessCard",
		data : {keyword : keyword, searchType : searchType},
		type : "GET",
		dataType:"html",
		success : function(fragment){
			console.log(fragment);
			//test(data);
			$("#listBody").html(fragment);
			console.log("done");
			
		},
		error : function(request, status, error){
			alert("error");
		}
	})
}
*/
function test(data){
	$.get("/searchBusinessCard", {keyword: $('#keyword').val(),searchType: $('#searchType').val()}).done(function(data){
		$("#a").replaceWith(data);
	});
};
