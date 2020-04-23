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

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n["name"]] = n["value"];
  });

  return indexed_array;
}

$(".lastone").click(function () {
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

function validateEmail(sEmail) {
  var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

  if(!sEmail.match(reEmail)) {
    alert("Invalid email address");
    return false;
  }

  return true;

}