const toHHMMSS = function (str: Number) {
  var sec_num = parseInt(str.toString(), 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  var _minutes = "" + minutes;
  var _seconds = "" + seconds;
  if (minutes < 10) {
    _minutes = "0" + minutes;
  }
  if (seconds < 10) {
    _seconds = "0" + seconds;
  }
  return _minutes + ":" + _seconds;
};
export { toHHMMSS };
