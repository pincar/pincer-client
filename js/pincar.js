//refer http://www.cnblogs.com/hyl8218/archive/2013/06/27/3159178.html
var CarStatus={};
CarStatus.wait={v:1,desc:'等待中'};
CarStatus.full={v:2,desc:'满员'};
CarStatus.cancel={v:3, desc:'取消'};

CarStatus.getStatus=function (stat) {
	var desc='';
	if(stat==CarStatus.wait.v){
		desc=CarStatus.wait.desc;
	} else if(stat==CarStatus.full.v){
		desc=CarStatus.full.desc;
	} else if(stat==CarStatus.cancel.v){
		desc=CarStatus.cancel.desc;
	} else{
		desc=CarStatus.cancel.desc;
	}
	return desc;
};


(function($){  
		$.fn.serializeJson=function(){  
			var serializeObj={};  
			var array=this.serializeArray();  
			var str=this.serialize();  
			$(array).each(function(){  
				if(serializeObj[this.name]){  
					if($.isArray(serializeObj[this.name])){  
						serializeObj[this.name].push(this.value);  
					}else{  
						serializeObj[this.name]=[serializeObj[this.name],this.value];  
					}  
				}else{  
					serializeObj[this.name]=this.value;   
				}  
			});  
			return serializeObj;  
		};  
	})(jQuery);

function goToFindCar() {
	changeCase("#findCarBox");
}

function goToFindPassenger() {
	changeCase("#publishCarServiceBox");
}

function findChar() {
   //changeCase('#publishCarServiceBox');
   var zhaoCheReq = $("#findCarForm").serializeJson();
    //var zhaoCheReq = {};
    zhaoCheReq.userId=$("body").data("userToken").userId;
	/*zhaoCheReq.startPoint=$("#findCarBox input[name='startPoint']").val();
	zhaoCheReq.destination=$("#findCarBox input[name='destination']").val();
	zhaoCheReq.time=$("#findCarBox input[name='time']").val();*/
	
	
	
	//var servDetail={driver:$("#findCarBox input[name='driver']").val()};
	
	/*$.ajax({
		url:"/zhaoche",
		data:zhaoCheReq,
		type:"POST",
		dataType:"json",
		success: function(json) {
			
		}
	});*/
	
	var carList={data:[{userId: 111,nickname:'小王',mobileNo:13575600911, startPoint:"丽都",destination:'金科路',time:'2016-03-04 7:50',
	      carInfo:
		      {id:123,brand:'大众',verticallicense:'沪E 6***7',
		      color:'白色',totalSeatNum:4,
			  remainderSeatNum:2,status:1}}]};
	successFindCar(carList);
}

function successFindCar(carList) {
			 
	changeCase("#carListMsgBox");	
	var listHtmlTxt = [];
	for (var i=0; i<carList.data.length; i++) {
        var m = carList.data[i];		
		var line = "<tr><td>"+m.nickname+"</td><td>"+m.startPoint+"</td><td>"+m.destination+"</td><td>";
		line=line+m.time+"</td><td>"+m.mobileNo+"</td><td>";
		line=line+m.carInfo.brand+"</td><td>"+m.carInfo.verticallicense+"</td><td>"+m.carInfo.color+"</td><td>"
		line=line+m.carInfo.totalSeatNum+"</td><td>"+m.carInfo.remainderSeatNum+"</td><td>";
		line=line+CarStatus.getStatus(m.carInfo.status)+"</td>"+"</tr>"
		listHtmlTxt.push(line);
	}
	$("#carListMsgBox tbody").html(listHtmlTxt.join("\n"));		   
}

function whenPageLoad(){
	//changeCase("#findCarBox");
	 
	changeCase("#home");
	$("body").data("userToken",{userId:"xiaozhu"});//todo userAccountSystem
}

function changeCase(caseBox) {
	//alert(caseBox);
	//$('#publishCarServiceBox').hide();
	$(".pincarBox").each(function (){$(this).hide()});
	$(caseBox).show();
}


function publishCarService() {
	//alert($("#publishCarServiceBox input[name='driver']").val());
	//var pubCarServReq = {};//publishCarServiceForm
	
	/*pubCarServReq.startPoint=;
	pubCarServReq.destination=;
	pubCarServReq.time=;
	pubCarServReq.sex=;
	pubCarServReq.remainderSeatNum=;*/
	//var servDetail={driver:$("#publishCarServiceBox input[name='driver']").val()};
	//alert(string(servDetail.driver));
	//var pubCarServReq = $("#publishCarServiceForm").serializeJson();
	var pubCarServReq =$("#publishCarServiceForm").serializeJson();
	//$("#publishCarServiceForm select[name='cartype']").val();
	/*pubCarServReq.userId = $("body").data("userToken").userId;
	$.ajax({
		url:"/zhaoren",
		data:pubCarServReq,
		type:"POST",
		dataType:"json",
		success: pubSuccess
	});*/
	var d = {data:[{userId:111,nickname:'张三',startPoint: '龙阳路',
                destination : '东港',
                time : '晚7点',
				mobileNo : '138xxxx1234'},
				{userId:123,nickname:'李三',startPoint: '龙阳路',
                destination : '东港',
                time : '晚6点',
				mobileNo : '138xxxx1234'}]};
	pubSuccess(d);
}

function pubSuccess(msg) {
	changeCase("#driverPublishedMsgBox");
	var listHtmlTxt = [];
	for (var i=0; i<msg.data.length; i++) {
        var m = msg.data[i];		
		var line = "<tr><td>"+m.nickname+"</td><td>"+m.startPoint+"</td><td>"+m.destination+"</td><td>";
		line=line+m.time+"</td><td>"+m.mobileNo+"</td>";
		line=line+"<td><input id=\"editMsgBtn\" type=\"button\" value=\"修改\" class=\"btn\" onclick=\"editMsg()\"></input></td>"
		line=line+"<td><input id=\"cacelMsgBtn\" type=\"button\" value=\"取消\" class=\"btn\" onclick=\"cancelMsg()\"></input></td>"
		line=line+"</tr>"
		listHtmlTxt.push(line);
	}
	$("#driverPublishedMsgBox tbody").html(listHtmlTxt.join("\n"));
	
}
