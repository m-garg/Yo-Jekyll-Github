	$("input[name='inlineRadioOptions']").click(function () {
    $('.dropdownOption').css('display', ($(this).val() === 'Website') ? 'none':'block');
     $('.textBox').css('display', ($(this).val() === 'Tool') ? 'none':'block');
});
	function validateManifestFileByUpload(){

		var validateFileElem=$("#validatorFiles");
		 			$(validateFileElem).empty();
		var formData = new FormData();
		var fileArray=document.getElementById('exampleInputFile').files;
		for (var i = 0; i < fileArray.length; i++) {
  			var file = fileArray[i];
  			// Add the file to the request.
	  		formData.append('files[]', file, file.name);
		}
		
		$.ajax( {
		    url: "http://www.boxupp.com/boxupp-services/validate/uploadFiles",
		    type: "POST",
		    data: formData,
		    processData: false,
		    contentType: false,
		    async: true,
		   	success: function(data) {
		   		$("#validateOutput").modal("show");
		   			for(var i=0; i<data.length; i++){
	
		 				if(data[i].exitCode === 1){
		 					if(data[i].puppetErrorResponse){
								var liErrorTemplate = '<li class="validatorErrorMsg">'+fileArray[i].name+' : '+data[i].puppetErrorResponse+'</li>';
								$(validateFileElem).append(liErrorTemplate);
							}
							if(data[i].puppetOutputResponse){
		 						var liOutputTemplate = '<li class="validatorOutputMsg">'+fileArray[i].name+' : '+data[i].puppetOutputResponse+'</li>';
		 						$(validateFileElem).append(liOutputTemplate);
		 					}
		 				}else{
							var liOutputTemplate = '<li class="validatorOutputMsg">'+fileArray[i].name+' : '+'"type":"normal","output":"Things look good !!"'+'</li>';
							$(validateFileElem).append(liOutputTemplate);
						}
					}
		 		
		    	},
		    	error: function(errorThrown ){
			 	console.log( errorThrown ); 
			}
						
		});
	}
	function validateManifestFileByCopyPast(){
		var validateFileElem=$("#validatorFiles");
		$(validateFileElem).empty();
		var mappings = {"manifestCode": $("#description").val(),"file":"content.pp"};
		$.ajax({
			type: 'POST',
			url: 'http://www.boxupp.com/boxupp-services/validate/checkPuppet',
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			data:mappings,
			async: true,
			success: function(data,status){
				if(data.exitCode === 1){
					if(data.puppetErrorResponse){
						var liErrorTemplate = '<li class="validatorErrorMsg">'+data.puppetErrorResponse+'</li>';
						$(validateFileElem).append(liErrorTemplate);
					}
					if(data.puppetOutputResponse){
		 				var liOutputTemplate = '<li class="validatorOutputMsg">'+data.puppetOutputResponse+'</li>';
		 				$(validateFileElem).append(liOutputTemplate);
		 			}
					
				}else{
					var liOutputTemplate = '<li class="validatorOutputMsg">'+'"type":"normal","output":"Things look good !!"'+'</li>';
					$(validateFileElem).append(liOutputTemplate);
				}
			},
			error: function(errorThrown ){
			 	console.log( errorThrown ); 
			}
		});
	}
	function requestForPuppetAPI(event){

		var mappings ={"userName": $("#userName").val(),"userEmail":$("#userEmail").val(), "linkedInProfile":$("#linkedInProfile").val(),"usingIn":$("#usingIn").val()};
		if((mappings.userName && mappings.userEmail && mappings.linkedInProfile && mappings.usingIn) === (undefined || "")){
			alert("All fields are mandatory");
			return false;
		}	
		$.ajax({
			type: "POST",
			url: "http://www.boxupp.com/boxupp-services/validate/requestForPuppetAPI",
			contentType:'application/x-www-form-urlencoded; charset=UTF-8',
			data:mappings,
			async: true,
			success: function(data,status){
				console.log(status.status);
			},
			error: function(errorThrown ){
			 	console.log( errorThrown ); 
			}
		});
		alert("Thank You ! You will shortly receive an email comprising of instructions on how to use the API. In case you don't receive it . Feel free to contact us at - support@boxupp.com");
		return false;
	}

	function subscription(){
		var mappings ={"subscribeMailID":$("#mc-embedded-subscribe").val()}
		$.ajax({
			type: "POST",
			url: "http://www.boxupp.com/boxupp-services/mail/subscribe",
			contentType:'application/x-www-form-urlencoded',
			data:mappings,
			async: true,
			success: function(data,status){
				console.log(status.status);
			},
			error: function(errorThrown ){
			 	console.log( errorThrown ); 
			}
		});
	}
	function requestForDemo(){
		var mappings ={"userName":$("#userName").val(), "emailID":$("#userEmail").val(), "skypeID":$("#userSkypeId").val(), "phoneNumber":$("#userPhoneNumber").val(), "preferredTime":$("#preferredTime1").val() + " - " + $("#preferredTime2").val()};
		var userName = $("#userName").val();	
		if((mappings.userName && mappings.emailID && mappings.skypeID && mappings.phoneNumber && mappings.preferredTime) === (undefined || "")){
			alert("All fields are mandatory");
			return;
		}	

		$.ajax({
			type: "POST",
			url: "http://www.boxupp.com/boxupp-services/mail/demoRequest",
			contentType:'application/x-www-form-urlencoded',
			data:mappings,
			async: true,
			success: function(data,status){
				console.log(status.status);
			},
			error: function(errorThrown ){
			 	console.log( errorThrown ); 
			}
		});
		alert("Thank You! "+userName + ". We appreciate your interest in taking a Live Demo. We will revert back to you within 24 hours");
	}

	function reportAnIssue(event){
		var issueProject = $("#inlineRadio1").val()  === (undefined || "") ? $("#inlineRadio2").val():$("#inlineRadio1").val();
		var formData = new FormData();
		formData.append("file[]", document.getElementById('issueFile').files[0]);
		formData.append("issueProject",issueProject);
		formData.append("issueSection",$("#issueSection").val());
		formData.append("userName",$("#inputName").val());
		formData.append("emailID",$("#inputEmail").val());
		formData.append("message",$("#reportAnIssueMsg").val());
		if(($("#inputName").val() && $("#inputEmail").val() && $("#reportAnIssueMsg").val()) === (undefined || "")){
			alert("All fields are mandatory");
			return false;
		}	

		$.ajax({
			type: "POST",
			url: "http://www.boxupp.com/boxupp-services/mail/reportAnIssue",
			contentType:false,
			processData: false,
			data:formData,
			async: true,
			success: function(data,status){
				console.log(status.status);
			},
			error: function(errorThrown ){
			 	console.log( errorThrown ); 
			}
		});
		alert("Thank You ! "+$("#inputName").val()+" Team Boxupp really appreciates your feedback. We will come up with a solution to your issue within 4 business days.");
		//alert("Thank You! "+userName + ". We appreciate your interest in taking a Live Demo. We will revert back to you within 24 hours");
		event.preventDefault();
		return false;
	}
	function enableUploadButton(event){
		var fileArray = document.getElementById('exampleInputFile').files;
		if(fileArray.length>0){
			$("#uploadButten").addClass("enable");
		}
	}

/*	
	}).factory('fileUpload',function($http,$q,$timeout){
		return{
			changeDestination : function($scope,destination){
				var completeURL;
				if(destination !== null){
					completeURL = $scope.$parent.serverAddress + "/services/uploadHandler/destination?loc="+destination;
				}else{
					completeURL = $scope.$parent.serverAddress + "/services/uploadHandler/destination";
				}
				
				var deferred = $q.defer();
				$http({	
					method:'POST',
					headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'},
					url:completeURL,
				}).
				success(function(response, status, headers, config) {
					deferred.resolve(response);
				}).
				error(function(data, status, headers, config) {
						console.log(" : Error updating file location : ");
				});
				return deferred.promise;
			}
		}
	}).directive('ngDblClickFocus', function editFocus($timeout) {
	return function (scope, elem, attrs) {
		scope.$watch(attrs.ngDblClickFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].focus();
				}, 0, false);
			}
		});
	};
});*/
