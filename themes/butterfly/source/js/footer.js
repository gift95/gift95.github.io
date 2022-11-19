$(document).ready(function(e){
    $('.framework-info1').html('这个小破站已运行<span id=span_dt_dt ></span>');
})
/*建站时间*/
function show_date_time() {
    window.setTimeout("show_date_time()", 1e3);
    var BirthDay = new Date("2022/07/26 00:00:00"),
    today = new Date,
    timeold = today.getTime() - BirthDay.getTime(),
    msPerDay = 864e5,
    e_daysold = timeold / msPerDay,
    daysold = Math.floor(e_daysold),
    e_hrsold = 24 * (e_daysold - daysold),
    hrsold = Math.floor(e_hrsold),
    e_minsold = 60 * (e_hrsold - hrsold),
    minsold = Math.floor(60 * (e_hrsold - hrsold)),
    seconds = Math.floor(60 * (e_minsold - minsold));
   // span_dt_dt.innerHTML = daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒";
   span_dt_dt.innerHTML ='<font style=color:#2d85f0>'+daysold+'</font> 天 <font style=color:#f4433c>'+hrsold+'</font> 时 <font style=color:#ffbc32>'+minsold+'</font> 分 <font style=color:#0aa858>'+seconds+'</font> 秒';
}

window.onload = function () {
    setInterval(show_date_time, 1000);
}