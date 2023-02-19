export default function validate_Time(infos) {
  let startTime = infos.startTime_hr + infos.startTime_min;
  let endTime = infos.endTime_hr + infos.endTime_min;

  let validate = false;

  if (infos.startTime_hr.length == 0) {
    return validate;
  }
  if (infos.endTime_hr.length == 0) {
    return validate;
  }
  if (infos.startTime_min.length == 0) {
    infos.startTime_min = "00";
  }
  if (infos.endTime_min.length == 0) {
    infos.endTime_min = "00";
  }
  if (infos.startTime_hr.length == 1) {
    infos.startTime_hr = "0" + infos.startTime_hr;
  }
  if (infos.startTime_min.length == 1) {
    infos.startTime_min = "0" + infos.startTime_min; 
  }
  if (infos.endTime_hr.length == 1) {
    infos.endTime_hr = "0" + infos.endTime_hr;
  }
  if (infos.endTime_min.length == 1) {
    infos.endTime_min = "0" + infos.endTime_min;
  }

  if (Number(endTime) > Number(startTime)) {
    validate = true;
    startTime = infos.startTime_hr + infos.startTime_min
    endTime = infos.endTime_hr + infos.endTime_min
    console.log('startTime: ' + startTime)
    return { validate, startTime, endTime };
  } else {
    return { validate, startTime, endTime };
  }
}
