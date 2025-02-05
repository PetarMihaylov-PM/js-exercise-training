

function changeTime(s){
  let lastTwo = s.substring(8);
  let fullTime = s.substring(0, 8);
  let times = fullTime.split(":");

  if(lastTwo ==="PM"){
    if(times[0] !== "12"){
      times[0] = parseInt(times[0]) + 12;
    }
  } else{
    if(times[0] === "12"){
      times[0] = "00";
    }
  }
  fullTime = `${times[0]}:${times[1]}:${times[2]}`;
  return fullTime;
}

changeTime('12:01:00PM');