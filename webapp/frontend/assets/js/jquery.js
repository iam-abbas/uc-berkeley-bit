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



console.log(timeobj)