/* required by splash page */
/* 
 * If the user has disabled js, the backend will redirect to our own verification 
 * page and handle it there onwards
 */

var bad_count = 0;
var codeLen;
var timeBeforeResend;
var maxBadCount;

function resetTimer() {
    setTimeout(function () {
        $('#status_label').empty();
        $("#error_info").empty().fadeOut();
        $("#resend_label").fadeIn();
    }, (timeBeforeResend * 1000));
};

function validateClientSideNumber() { 

document.getElementById("message_number").value = document.getElementById("c-code").value + document.getElementById("m-number").value;

	if(f_trimmer(document.getElementById("c-code").value) == "" && f_trimmer(document.getElementById("m-number").value) == "") {
		alert("Please enter your country code and mobile number.");
		document.getElementById("c-code").value = "";
		document.getElementById("c-code").focus();
		return false;
	}
	if(f_trimmer(document.getElementById("c-code").value) == "" ) {
		alert("Please enter your country code.");
		document.getElementById("c-code").value = "";
		document.getElementById("c-code").focus();
		return false;
	}
	if(f_trimmer(document.getElementById("m-number").value) == "") {
		alert("Please enter your mobile number.");
		document.getElementById("m-number").value = "";
		document.getElementById("m-number").focus();
		return false;
	} 

	if(charsOnlyWithSpaces(document.getElementById("message_number").value) == false)  {
		alert("Please enter a valid mobile number. Alphabets not allowed.");
		document.getElementById("message_number").value = "";
		document.getElementById("message_number").focus();
		return false;
	} 
	if(only15IntegersInMobile(document.getElementById("message_number").value) > 14) {
		alert("Please enter a valid mobile number.");
		document.getElementById("message_number").focus();
		// document.getElementById("message_number").focus();
		return false;
	}
        return true;
}


function firstTime() {
    if(validateClientSideNumber()) {
 	   mobile = document.getElementById("c-code").value + document.getElementById("m-number").value;

    $("#resend_label").fadeOut();
    $("#error_info").empty().fadeOut();
	/****************************************************/
    	$("#sms_form").hide("slow");
		//$("#message_number").attr("readonly", true);
		//$("#message_code").attr("readonly", true);
	/****************************************************/	
    $("#sms_label_top").hide("slow");
    //Show please wait message.
    $("#please_wait").show("slow");
    $("#sms_form").hide("slow");
    //Set the ajax flag in  form.
    $("#sms_form_1_ajax").val(1);
    //do the Ajax.
    $.ajax({
        url: '/plugin/sms/auth/generateCode',
        type: 'POST',
        data: $("#sms_login_1").serialize(),
        success: function (result) {
            var obj = $.parseJSON(result);
            $("#please_wait").hide("slow");
		    $("#sms_form").show("slow");
            $(".submit_div").show("slow");
            //Successful message send
            if (obj.isError === false) {
                //Set the mobile no. value and readOnly it.
                $("#message_number").val(mobile);
                //$("#message_number").prop('readonly', 'readonly');
                //Hide the gen code button and show edit mobile no button.
                $("#new_code_button").hide("slow");
                $("#already_code").hide("slow");
                //$("#edit_mob_no").show("slow");
                //Show the form again. 
                $("#sms_form").fadeIn();
                //Set the label at top to appropriate value.
                $("#sms_label_top").text("");
                if (obj.error !== null) 
                    $("#sms_label_top").text(obj.error).fadeIn();
                else 
                    $("#sms_label_top").text("We've sent you a code at " + mobile).fadeIn();
                //reset the timer.
                resetTimer();
            }
            //Message not sent
            else {
                //Wrong stuff by user
                if (obj.show === 1) {
                    bad_count += 1;
                    alert(obj.error);
                    $("#sms_form").fadeIn();
                    $("#error_info").empty();
                    $("#error_info").append(obj.error).fadeIn();
					$("#error_info").show("slow");
                    $("#message_number").val("");
                    $("#sms_label_top").show("slow");
					$(".submit_div").hide("slow");
                }
                //Wrong stuff by backend/admin
                else {
                    alert(obj.error);

                    $("#sms_form").hide("slow");
                    $("#error_info").empty();
                    $("#error_info").append(obj.error).fadeIn();
                    $("#error_info").show("slow");
                }
            }
        }
    });
	}
}

function AlreadyCode() {
	if(validateClientSideNumber()) {
		$(".submit_div").show("slow");
		$("#new_code_button").hide("slow");
		$("#already_code").hide("slow");
        $("#start_over").fadeIn();
		}	
}
// SMS T and C 
function openTnc() {
	window.open('Terms-Of-Use.pdf');
	return false;
}

function doAuth() {
	if(document.getElementById("tnc").checked == false) {		
		alert("Please accept the terms of use");
		document.getElementById("tnc").focus();
		document.getElementById("policy").focus();
		return false;
	}
	else {
			validity = validateCode();
			if (validity !== true) {
				$("#error_info").empty();
				$("#error_info").append(validity).show("slow");
				$("#error_info").show("slow");
				return false;
			}
			$("#error_info").hide("slow");
			$("#resend_label").hide("slow");
			mobile = document.getElementById('message_number').value;
			$("#sms_form_1_ajax").val(1);
			$.ajax({
				url: '/plugin/sms/auth/authenticate',
				type: 'post',
				data: $("#sms_login_1").serialize(),
				success: function (result) {
					var obj = $.parseJSON(result);
					if (obj.status === "true") {
						window.location = obj.value;
					} else if (obj.status === "not_found") {
                              $("#error_info").text("");
							  $("#error_info").append(obj.value).fadeIn();
							  $("#error_info").show("slow");
                        //      resetTimer();
						//editNumber(0);
					} else {
						$("#error_info").text("");
						$("#error_info").append(obj.value).fadeIn();
						$("#error_info").show("slow");
                        resetTimer();
					}
		
				}
			});
	}
}


function getInitialData() {
    $.ajax({
        url: '/plugin/sms/auth/getInitialData',
        type: 'post',
        data: {
            init: '1'
        },
        success: function (result) {
            var obj = $.parseJSON(result);
            codeLen = obj.codeLen;
            timeBeforeResend = obj.timeBeforeResend;
            if (typeof obj.maxBadCount !== 'undefined') 
                maxBadCount = obj.maxBadCount;
        }
    });
}

function editNumber(removeError) {
    removeError = typeof removeError !== 'undefined' ? removeError : 1;

    $("#please_wait").hide("slow");
    $("#sms_label_top").empty();
    $("#sms_label_top").text("Enter the correct number and request for a new code.").show("slow");
    $("#message_number").val("");
    //$("#message_number").removeAttr("readonly");
    $("#message_code").val("");
    //$("#edit_mob_no").hide("slow");
    $("#new_code_button").show("slow");

    if (removeError === 1) 
        $("#error_info").empty();

    //Kill timer ???
    $("#resend_label").hide("slow");
    $("#sms_form").show("slow");

}



function validateCode() {

    code = $("#message_code").val();
    if ($.isNumeric(code) === false) return "Please enter a valid code.";
    if (code.length !== codeLen) return "Please enter a valid code.";

    return true;
};

$(document).ready(function () {

    getInitialData();

    $("#resend_link").click(function () {
        firstTime();
        return false;
    });

});


/*************************************************************/
function numbersOnly(fieldName)
{
	var validChars = "0123456789";
	var temp;

	for(var i=0; i < fieldName.length; i++)
	{
		temp = fieldName.substring(i,i+1);
		if(validChars.indexOf(temp) == "-1") { return false; }
	}
}

function startOver(){
    $(".submit_div").hide("slow");
    $("#new_code_button").show("slow");
    $("#already_code").show("slow");
    $("#start_over").fadeOut();
	$("#error_info").fadeOut();
    $("#sms_login_1")[0].reset();
}


function charsOnlyWithSpaces(fieldName)
{
	var validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var temp;

	for(var i=0; i < fieldName.length; i++)
	{
		temp = fieldName.substring(i,i+1);

		if(validChars.indexOf(temp) >= 0)
		{
			return false;
		}
	}	
}

/* Only 14 integers are allowed in the phone number excluding the spaces and other characters used entered by user as a phone number.   */
/* This function is used to calculate */
function only15IntegersInMobile(fieldName)
{
	var validChars = "0123456789";
	var temp;
	var counter = 0;

	for(var i=0; i < fieldName.length; i++)
	{
		temp = fieldName.substring(i,i+1);
		if(validChars.indexOf(temp) >= 0)
		{
			counter = counter + 1;
		}
	}	

  return counter;	
}

/* function to trim leading and trailing spaces form the phone number and code entered by user  */
function f_trimmer(thisstring){
	while(thisstring.charAt(0)==" "){
    	thisstring=thisstring.substring(1,thisstring.length);
	}
   	return thisstring;
}
