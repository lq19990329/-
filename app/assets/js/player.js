var player=(function(){
    var oImg=document.getElementsByClassName('rotate')[0];
    var flag=0,time=0;
    var dragflag=true;
    var timer,timer2;
    var deg=0;
    var songs=[
        {
            url:'assets/music/1.mp3',
            singer:'Joel Adams',
            title:`Please Don't GO`
        },
        {
            url:'assets/music/2.mp3',
            singer:'Various Artists',
            title:`海绵宝宝片尾曲`
        },
        {
            url:'assets/music/3.mp3',
            singer:'买辣椒也用券',
            title:`起风了`

        },
    ];
    var index=0;
    var oTitle=document.getElementsByClassName('title')[0];
    var oSinger=document.getElementsByClassName('singer')[0];
    var oStart=document.getElementsByClassName('play')[0];
    var oAudio=document.getElementById('audio');
    var oBack=document.getElementsByClassName('previous')[0];
    var oNext=document.getElementsByClassName('next')[0];
    var oTime1=document.getElementsByClassName('time')[0];
    var oTime2=document.getElementsByClassName('time')[1];
    var oPro3=document.getElementsByClassName('progress_3')[0];
    var oPro1=document.getElementsByClassName('progress_1')[0];
    var oPro2=document.getElementsByClassName('progress_1')[0].children[1];
    //图片旋转
    function rotate(){
        clearInterval(timer);
        flag=1;
        //console.log(1)
        playTime()
        timer=setInterval(function(){
                
                oImg.style.transform="rotate("+deg+"deg)";
                deg+=0.3;
                if(deg>360){
                deg=0;
                
            }
        },20);
    }
    //图片停止旋转
    function norotate(){
        clearInterval(timer);
        flag=0;
    }
    //歌曲播放
    function start(){
        if(oAudio.getAttribute('src')!=songs[index].url)
        oAudio.setAttribute('src',songs[index].url);
        oTitle.innerHTML=songs[index].title;
        oSinger.innerHTML=songs[index].singer;
        totalTime();
        oAudio.play();
    };
    //歌曲总时间
    function totalTime(){
        oAudio.addEventListener('canplay',function(){
            oTime2.innerHTML=changeTime(oAudio.duration)
        })
    }
    //歌曲播放时间
    function playTime(){
        
            var second,minute;
            oTime1.innerHTML=changeTime(time)        
            timer2=setInterval(function(){
                if(dragflag){
                //console.log(time)
                oTime1.innerHTML=changeTime(oAudio.currentTime)
                oPro3.style.width=oPro1.offsetWidth*(oAudio.currentTime/oAudio.duration)+'px';
                // console.log(oPro2)
                oPro2.style.left=(oPro1.offsetWidth-oPro2.offsetWidth)*(oAudio.currentTime/parseInt(oAudio.duration))+'px';
                }
               
            },50);
    
        
    }
    //时间处理
    function changeTime(target){
        var minute,second;
        second=parseInt(target%60);
        minute=parseInt(target/60);
        if(minute<10){
            minute='0'+minute;
        }
        if(second<10){
            second='0'+second;
        }
        return minute+':'+second
    }
    //循环
    function cycle(){
        if(index>songs.length-1){
            index=0;
        }
        if(index<0){
            index=songs.length-1
        }
    };
    //上一首
    function previous(){
        index--;
        cycle();
    }
    //下一首
    function next(){
        index++;
        cycle();
    }
    // //图标更改
    // fuction change(oDiv,target){
    //     oDiv.style.background=' url(assets/images/'+target+'.png) no-repeat ';
    //     oDiv.style.backgroundSize='1rem';
    //     oDiv.style.backgroundPosition='center top';
    // }
    //播放按钮事件
    var bindStartEvent=function(){
        oStart.onclick=function(){
            
            if(!flag){
                oStart.style.background=' url(assets/images/pause.png) no-repeat ';
                oStart.style.backgroundSize='1rem';
                oStart.style.backgroundPosition='center top';
                rotate();
                start();
                //console.log(oAudio)
            }
            else{
                oStart.style.background=' url(assets/images/play.png) no-repeat '
                oStart.style.backgroundSize='1rem';
                oStart.style.backgroundPosition='center top';
                norotate();
                clearInterval(timer2)
                oAudio.pause();
            }
            //console.log(flag)
        }
    }
    //上一首按钮事件
    var bindPreviousEvent=function(){
        oBack.onclick=function(){
            deg=0;
            oPro3.style.width=0;
            oPro2.style.left=0;
            oStart.style.background=' url(assets/images/pause.png) no-repeat ';
            oStart.style.backgroundSize='1rem';
            oStart.style.backgroundPosition='center top';
            time=0;
            clearInterval(timer2);
            previous();
            start();
            rotate()
            //console.log(flag)
        }
    };
    //下一首按钮事件
    var bindNextEvent=function(){
        oNext.onclick=function(){
            deg=0;
            oPro3.style.width=0;
            oPro2.style.left=0;
            oStart.style.background=' url(assets/images/pause.png) no-repeat ';
            oStart.style.backgroundSize='1rem';
            oStart.style.backgroundPosition='center top';
            time=0;
            clearInterval(timer2);
            next();
            start();
            rotate()
            //console.log(flag)
        }
    };
    //歌曲结束事件
    function end(){
        oAudio.addEventListener('ended',function(){   
            deg=0;
            oPro3.style.width=0;
            oPro2.style.left=0;
            oStart.style.background=' url(assets/images/pause.png) no-repeat ';
            oStart.style.backgroundSize='1rem';
            oStart.style.backgroundPosition='center top';
            time=0;
            clearInterval(timer2);
            next();
            start();
            rotate()
        })
    }
    //进度条拖拽事件
    function drag(){
        oPro2.ontouchstart=function(ev){
            dragflag=false;
            var ev=ev||window.event;
            var leftVal=ev.touches[0].clientX;
            var disX=leftVal-oPro2.offsetLeft;
            //console.log('drag',dragflag)
            //console.log(oPro2.offsetLeft)
            document.ontouchmove=function(ev){
                var ev=ev||window.event;
                oPro2.style.left=ev.touches[0].clientX-disX+'px';
                if(oPro2.offsetLeft<0){
                    oPro2.style.left=0+'px'
                }
                if(oPro2.offsetLeft>oPro1.offsetWidth-oPro2.offsetWidth){
                    oPro2.style.left=oPro1.offsetWidth-oPro2.offsetWidth+'px'
                }
                oPro3.style.width=oPro1.offsetWidth*(oPro2.offsetLeft/(oPro1.offsetWidth-oPro2.offsetWidth))+'px';
                oTime1.innerHTML=changeTime(oAudio.duration*(oPro2.offsetLeft/(oPro1.offsetWidth-oPro2.offsetWidth)))
            }
            document.ontouchend=function(){

                oAudio.currentTime=oAudio.duration*(oPro2.offsetLeft/(oPro1.offsetWidth-oPro2.offsetWidth));
                oAudio.play();
                oStart.style.background=' url(assets/images/pause.png) no-repeat ';
                oStart.style.backgroundSize='1rem';
                oStart.style.backgroundPosition='center top';
                rotate();
                
                dragflag=true;
                //console.log('dragend',dragflag)
                document.ontouchmove=null;
                document.ontouchend=null;    
            }

        }
    }
    //进度条点击事件
    function tap(){
        oPro1.ontouchstart=function(ev){
            var ev=ev||window.event;
            dragflag=false;
            //console.log(ev.touches[0].clientX,oPro1.getBoundingClientRect().x)
            oPro2.style.left=ev.touches[0].clientX-oPro1.getBoundingClientRect().x-oPro2.offsetWidth/2+'px';
            oPro3.style.width=oPro1.offsetWidth*(oPro2.offsetLeft/(oPro1.offsetWidth-oPro2.offsetWidth))+'px';
            
            var leftVal=ev.touches[0].clientX;
            var disX=leftVal-oPro2.offsetLeft;
            console.log('tap',dragflag)
            //console.log(oPro2.offsetLeft)
            document.ontouchmove=function(ev){
                var ev=ev||window.event;
                oPro2.style.left=ev.touches[0].clientX-disX+'px';
                if(oPro2.offsetLeft<0){
                    oPro2.style.left=0+'px'
                }
                if(oPro2.offsetLeft>oPro1.offsetWidth-oPro2.offsetWidth){
                    oPro2.style.left=oPro1.offsetWidth-oPro2.offsetWidth+'px'
                }
                oPro3.style.width=oPro1.offsetWidth*(oPro2.offsetLeft/(oPro1.offsetWidth-oPro2.offsetWidth))+'px';
                oTime1.innerHTML=changeTime(oAudio.duration*(oPro2.offsetLeft/(oPro1.offsetWidth-oPro2.offsetWidth)))
            }
            document.ontouchend=function(){

                oAudio.currentTime=oAudio.duration*(oPro2.offsetLeft/(oPro1.offsetWidth-oPro2.offsetWidth));
                oAudio.play();
                oStart.style.background=' url(assets/images/pause.png) no-repeat ';
                oStart.style.backgroundSize='1rem';
                oStart.style.backgroundPosition='center top';
                rotate();
                
                dragflag=true;
                //console.log('tapend',dragflag)
                document.ontouchmove=null;
                document.ontouchend=null;    
            }
        }
    }
    var init=function(){
        bindStartEvent();
        bindPreviousEvent();
        bindNextEvent();
        totalTime();
        end();
        drag();
        tap();
    };
    return init;
})();