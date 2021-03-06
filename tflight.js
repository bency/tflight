  var flag = 0;
  var timer = new Array();
  var color = new Array();
  function deg(deg){
    return (Math.PI/180)*deg - (Math.PI/180)*90;
  }
  function CountDown(){
    var second = $('#canvas_1').get(0);
    var road= $('#canvas_2').get(0);
    timer[0] = 60;
    timer[1] = 40;
    color[0] = "#ff6565";
    color[1] = "#9cdb7d";
    var today = new Date();
    var tl_start = Math.round((new Date(today.getFullYear(),today.getMonth(),today.getDate() - 1,7)).getTime()/1000);
    var ut = Math.round((new Date()).getTime() / 1000 );
    var period = timer[0] + timer[1];
    var counter = 0;
    var phase = 0; 
    var offset = 0;
    phase = (ut - tl_start + offset) % period;
    if(phase > timer[0]){
      counter = period - phase;
      flag = 1;
    }
    else{
      flag = 0;
      counter = timer[0] - phase;
    }
    phase = (Math.round((new Date()).getTime() / 1000 ) - tl_start) % period;
    offset = phase;
    setInterval(function(){
        if(counter <= 0.1){
        flag = (flag+1)%2;
        //counter = timer[flag];
        phase = (Math.round((new Date()).getTime() / 1000 ) - tl_start) % period;
        offset = phase;
        if(phase > timer[0]){
        counter = period - phase;
        flag = 1;
        }
        else{
        flag = 0;
        counter = timer[0] - phase;
        }
        }
        else{
        counter -= 0.1;
        offset = (offset + 0.1) % period;
        $(".val").text(Math.floor(counter));
        $(".type_seconds").text(Math.floor(offset));
        }
        $('.val').css("color",color[flag]);

        var ctx = second.getContext('2d');
        var ctx2 = road.getContext('2d');
        ctx.clearRect(0, 0, second.width, second.height);
        ctx.beginPath();
        ctx.strokeStyle = color[1];
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = "none";

        ctx2.clearRect(0, 0, second.width, second.height);
        ctx2.beginPath();
        ctx2.strokeStyle = color[0];
        ctx2.shadowBlur = 10;
        ctx2.shadowOffsetX = 0;
        ctx2.shadowOffsetY = 0;
        ctx2.shadowColor = "none";

        ctx.arc(94,94,85, deg(offset/period * 360), deg( (offset + timer[1]) % period / period * 360));
        ctx2.arc(94,94,85, deg( (offset + timer[1]) % period / period * 360), deg(offset/period * 360));
        $("#rstart").text(Math.floor(offset/period*360));
        $("#rstop").text( Math.floor( (offset + timer[0]) % period / period * 360 ) );
        $("#gstart").text( Math.floor( (offset + timer[1]) % period  / period * 360 ) );
        $("#gstop").text(Math.floor(offset / period * 360 ));
        ctx.lineWidth = 17;
        ctx2.lineWidth = 17;
        ctx.stroke();
        ctx2.stroke();
    },100);
  }
  function toggle(){
    var tmp;
    tmp = color[1];
    color[1] = color[0];
    color[0] = tmp;
  }
