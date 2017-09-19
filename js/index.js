onload = function () {
    var coat = document.getElementsByClassName('coat')[0];
    var top = document.getElementsByClassName('to_top')[0];
    var flag = true, t, innerH = innerHeight, itop = 0;
    var imgNum = 0, lastNum = 0, dotNum = 0, moveNum = 20, flags = true, s = 0;
    onkeydown = function (e) {
        if (e.keyCode == '32' || e.keyCode == '40' || e.keyCode == '38') {
            return false;
        }
    };
    window.onmousewheel = function (e) {
        var ev = e || event;
        ev.preventDefault();
        if (flag) {
            flag = false;
            if (ev.wheelDelta < 0) {
                clearInterval(t);
                if (document.body.scrollTop >= coat.scrollHeight - innerH) {
                    clearInterval(t);
                    flag = true;
                    return;
                }
                itop++;
                s++;
                s >= 6 ? s = 6 : s;
                for (var i = 0; i < rLi.length; i++) {
                    var sa = rLi[i].getElementsByTagName('a')[0];
                    sa.style.width = '3px';
                    sa.style.height = '3px';
                    sa.style.backgroundColor = '#fff';
                }
                if(s>0){
                    top.style.opacity='1';
                    setTimeout(function () {
                        top.style.display='block'
                    },350)
                }
                var a = rLi[s].getElementsByTagName('a')[0];
                a.style.width = '12px';
                a.style.height = '12px';
                a.style.backgroundColor = 'transparent';
                t = setInterval(function () {
                    document.body.scrollTop += 15;
                    if (document.body.scrollTop >= innerH * itop) {
                        document.body.scrollTop = innerH * itop;
                        clearInterval(t);
                        flag = true;
                    }
                }, 2);
            }
            else {
                clearInterval(t);
                if (document.body.scrollTop <= 0) {
                    clearInterval(t);
                    flag = true;
                    return;
                }
                itop--;
                s--;
                s <= 0 ? s = 0 : s;
                for (var i = 0; i < rLi.length; i++) {
                    var sa = rLi[i].getElementsByTagName('a')[0];
                    sa.style.width = '3px';
                    sa.style.height = '3px';
                    sa.style.backgroundColor = '#fff';
                }
                if(s<=0){
                    top.style.opacity='0';
                    setTimeout(function () {
                      top.style.display='none'
                    },350)
                }
                var a = rLi[s].getElementsByTagName('a')[0];
                a.style.width = '12px';
                a.style.height = '12px';
                a.style.backgroundColor = 'transparent';
                t = setInterval(function () {
                    document.body.scrollTop -= 15;
                    if (document.body.scrollTop <= innerH * itop) {
                        document.body.scrollTop = innerH * itop;
                        clearInterval(t);
                        flag = true;
                    }
                }, 2);
            }
        }
    };
    var ban = document.getElementsByClassName('banner')[0];
    var lb = document.getElementsByClassName('banner_main')[0];
    var li = lb.getElementsByTagName('li');
    var dot = document.getElementsByClassName('dotli')[0];
    var dotLi = dot.getElementsByTagName('li');
    var le = document.getElementsByClassName('le')[0];
    var ri = document.getElementsByClassName('ri')[0];
    var vw = document.documentElement.clientWidth;

    function animate(distance) {
        var everyMove = distance / moveNum;
        var time = setInterval(function () {
            if (lastNum >= moveNum) {
                clearInterval(time);
                flags = true;
                lastNum = 0;
                for (var i = 0; i < li.length; i++) {
                    var dp = li[i].getElementsByTagName('p')[0];
                    dp.style.transition = 'all 0.9s ease-in-out 0s';
                    dp.style.opacity = '1';
                }
                return;
            }
            for (var i = 0; i < li.length; i++) {
                var dp = li[i].getElementsByTagName('p')[0];
                dp.style.transition = 'all 0.3s ease-in-out 0s';
                dp.style.opacity = '0';
            }
            var ML = parseFloat(getComputedStyle(lb).marginLeft);
            lb.style.marginLeft = ML + everyMove + 'px';
            lastNum++;
        }, 17);
    }

    ri.onclick = function () {
        if (flags) {
            flags = false;
            if (imgNum >= li.length - 1) {
                lb.style.marginLeft = '0px';
                imgNum = 0;
            }
            if (dotNum >= dotLi.length - 1) {
                dotNum = -1;
            }
            nobg();
            dotLi[dotNum + 1].style.backgroundColor = '#fff';
            animate(-vw);
            imgNum++;
            dotNum++;
        }
    };
    le.onclick = function () {
        if (flags) {
            flags = false;
            if (imgNum <= 0) {
                lb.style.marginLeft = -li[0].clientWidth * (li.length - 1) + 'px';
                imgNum = li.length - 1;
            }
            if (dotNum <= 0) {
                dotNum = dotLi.length;
            }
            nobg();
            dotLi[dotNum - 1].style.backgroundColor = '#fff';
            animate(vw);
            imgNum--;
            dotNum--;
        }
    };
    for (var i = 0; i < dotLi.length; i++) {
        dotLi[i].index = i;
        dotLi[i].onclick = function () {
            if (flags) {
                flags = false;
                nobg();
                if (imgNum >= li.length - 1) {
                    lb.style.marginLeft = '0px';
                }
                this.style.backgroundColor = '#fff';
                animate(-vw * (this.index - dotNum));
                dotNum = this.index;
                imgNum = this.index;
            }
        }
    }
    function nobg() {
        for (var i = 0; i < dotLi.length; i++) {
            dotLi[i].style.backgroundColor = '#8d9095'
        }
    }

    autoplay();
    function autoplay() {
        autoTimer = setInterval(
            function () {
                ri.onclick();
            }, 4500
        );
        ban.onmouseover = function () {
            clearInterval(autoTimer);
        };
        ban.onmouseout = function () {
            autoplay();
        }
    }

    function move(i) {
        clearInterval(t);
        if (document.body.scrollTop >= innerH * i) {
            t = setInterval(function () {
                if (document.body.scrollTop <= innerH * i) {
                    clearInterval(t);
                    document.body.scrollTop = innerH * i;
                    return;
                }
                document.body.scrollTop -= 15;
            }, 1)
        } else {
            t = setInterval(function () {
                if (document.body.scrollTop >= innerH * i) {
                    clearInterval(t);
                    document.body.scrollTop = innerH * i;
                    return;
                }
                document.body.scrollTop += 15;
            }, 1)
        }
    }

    var rDot = document.getElementsByClassName('r_dot')[0];
    var rLi = rDot.getElementsByTagName('li');
    for (var i = 0; i < rLi.length; i++) {
        rLi[i].index = i;
        rLi[i].onclick = function () {
            s = this.index;
            for (var i = 0; i < rLi.length; i++) {
                var sa = rLi[i].getElementsByTagName('a')[0];
                sa.style.width = '3px';
                sa.style.height = '3px';
                sa.style.backgroundColor = '#fff';
            }
            var a = this.getElementsByTagName('a')[0];
            a.style.width = '12px';
            a.style.height = '12px';
            a.style.backgroundColor = 'transparent';
            //s=this.index-1;
            console.log(1)
            move(this.index)
        }
    }
};