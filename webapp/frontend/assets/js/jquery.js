var startTime;
var lapsetime = 0;
var timeobj = {};

function taptime(qdata) {
  if (startTime) {
    lapsetime = new Date().getTime() - startTime - lapsetime;
    timeobj[qdata] = lapsetime;
    startTime = new Date().getTime() - lapsetime;
  } else {
    startTime = new Date().getTime();
  }
}

$(":radio").click(function () {
  var radioName = $(this).attr("name"); //Get radio name
  $(":radio[name='" + radioName + "']").attr("disabled", true); //Disable all with the same name
});

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n["name"]] = n["value"];
  });

  return indexed_array;
}

function checks() {
  if ($(".frst").is(":visible")) {
    $("#prevBtn").addClass("hidden");
  } else if ($(".eml").is(":visible")) {
    $("#prevBtn").removeClass("hidden");
  }
  setTimeout(checks, 500);
}

$(document).ready(checks);

$(".lastone").click(function (e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  $("#prevBtn").addClass("hidden");
  var disabled = $("#SurveyForm")
    .find(":input:disabled")
    .removeAttr("disabled");
  var sendData = JSON.stringify([getFormData($("#SurveyForm")), timeobj]);
  $.ajax({
    url: "/post",
    type: "post",
    contentType: "application/json",
    dataType: "json",
    data: sendData,
    success: function (data) {
      console.log(data);
    },
  });
});

var prevEmail;

function validateName(name) {
  if (name.length == 0) {
    return "no-name";
  }
  return null;
}

function validateEmail(sEmail) {
  var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

  if (!sEmail.match(reEmail)) {
    if (sEmail.length == 0) {
      //alert("No email entered");
      return "no-email";
    } else {
      //prevEmail = sEmail
      //alert("Invalid email address");
      return "inval-email";
    }
    //setTimeout( currentQuestion().getElementsByTagName("input")[0].focus(), 100 )
    //return false;
  }
  return null;
}
