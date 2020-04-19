var startTime;
var lapsetime = 0;
var timeobj = {}
function taptime(qdata) {
  if(startTime) {
    lapsetime = new Date().getTime() - startTime -lapsetime;
    timeobj[qdata] = lapsetime;
    startTime = new Date().getTime() - lapsetime;
  } else {
    startTime = new Date().getTime();
  }
}

function getFormData($form){
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}


$('.lastone').click( function() {
  var sendData = JSON.stringify([getFormData($('#myForm')), timeobj]);
  console.log(sendData)
  $.ajax({
      url: '/post',
      type: 'post',
      contentType:"application/json",
      dataType: 'json',
      data:  sendData,
      success: function(data) {
                 console.log(data)
               }
  });
});