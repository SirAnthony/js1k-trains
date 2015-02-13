
var ceils = 10;
var CW = a.width/ceils, CH = a.height/ceils, CM=CW>CH?CW:CH;
function get_color(idx){
    return 'hsl('+360/cities.length*idx+',70%,50%)';
}
function get_joint(x, y){
    return joints[x*ceils+y]; }
function close(dx, dy, am){
    return Math.abs(dx)<am && Math.abs(dy)<am; }
function City(idx){
    var x = Math.floor(Math.random()*ceils);
    var y = Math.floor(Math.random()*ceils);
    return {
        x: x, y: y,
        cx: (x+0.4)*CW,
        cy: (y+0.3)*CH,
        idx: idx,
        T: function(z){
	    c.fillStyle = get_color(idx);
            c.font='35px Sans'
	    c.fillText('⌂', this.cx, this.cy);
            c.font='20px Sans'
	}
    }
}
function Joint(x, y){
    return {
        x: x, y: y,
        t: 0,
        T: function(z){
            if (!this.t)
                return;
            c.beginPath();
            if (this.t&1){
                c.moveTo(CW*x, CH*(0.5+y));
                c.lineTo(CW*(1+x), CH*(0.5+y));
            }
            if (this.t&2){
                c.moveTo(CW*(0.5+x), CH*y);
                c.lineTo(CW*(0.5+x), CH*(1+y));
            }
            c.stroke();
        }
    }
}
function jointed(j1, j2){
    return (j1.y==j2.y && j1.x!=j2.x && j1.t&1 && j2.t&1) ||
        (j1.x==j2.x && j1.y!=j2.y && j1.t&2 && j2.t&2);
}
var dirs = [-2, 1, 2, -1];
function Train(dst, src){
    var speed = 0.05;
    var x = CW*(0.5+src.x), y = CH*(0.5+src.y);
    var dir = 1;
    return {
        x: x, y: y,
        j: get_joint(src.x, src.y),
        score: 100,
        P: function(jx, jy){
            dir = (dir+3)%4, i=0;
            for (i=0;i<4&&!this.N(jx, jy);i++)
                dir = (dir+1)%4;
        },
        N: function(jx, jy){
            var a = Math.abs(dirs[dir]), s = dirs[dir]/a,
                j = get_joint(jx+(a&1)*s, jy+(a&2)*s/2);
            return j && jointed(this.j, j) && (this.j = j);
        },
        T: function(z){
            c.fillStyle = get_color(dst.idx);
            c.fillRect(this.x, this.y, 6, 6);
            var dx = x - this.x, dy = y - this.y;
            var angle = Math.atan2(dy, dx);
            this.x += speed * z * Math.cos(angle);
            this.y += speed * z * Math.sin(angle);
            if (close(dx, dy, 2)){
                this.P(this.j.x, this.j.y);
                x = CW*(0.5+this.j.x), y = CH*(0.5+this.j.y);
            }
            if (close(dst.cx-x, dst.cy-y, CM/4)){
                Score(dst.cx, dst.cy, this.score);
                trains.splice(trains.indexOf(this), 1);
            }
            this.score -= z/1000;
        }
    }
}

var scores = [];
function Score(x, y, idx){
    var s = {
        x: x, y: y,
        T: function(z){
            c.fillStyle = get_color(idx);
            c.fillText(~~idx, x, y);
        }
    }
    GlobalScore+=~~idx;
    scores.push(s);
}

var S = Date.now();
var cities = [], joints = [], trains = [];
for (i=1; i<5; i++)
    cities.push(City(i))
for (i=0; i<ceils; i++)
    for (j=0; j<ceils; j++)
        joints[i*ceils+j] = Joint(i, j);
a.onclick = function(e){
    j = get_joint(Math.floor(e.pageX/(a.width/ceils)), Math.floor(e.pageY/(a.height/ceils)));
    j.t = (j.t+1)%4;
}
function Update(){
    if (cities.length*2<trains.length)
        return;
    if (TimePassed % Math.random() < 0.8)
        return;
    var dst = cities[Math.floor(Math.random()*100%cities.length)];
    var src = cities[Math.floor(Math.random()*100%cities.length)];
    if (!joints[src.x*ceils+src.y].t)
        return;
    trains.push(Train(dst, src, i));
}

var TimePassed = 0, LastTick = Date.now();
var GlobalScore = 0;
setInterval(function(){ GlobalScore-=100+TimePassed/a.width }, 10000);
setInterval(function(){ scores = [] }, 1000);
setInterval(function(){ cities.length<15 && cities.push(City(cities.length+1)) }, 40000);
(function L(){
    requestAnimationFrame(L);
    var D = Date.now()-LastTick;
    TimePassed += D;
    LastTick += D;
    Update();
    c.clearRect(0,0,a.width,a.height);
    c.fillStyle = 'green';
    c.fillRect(0,0,a.width,a.height);
    c.fill();
    var p = function(o){ o.T(D) }
    cities.forEach(p);
    joints.forEach(p);
    trains.forEach(p);
    scores.forEach(p);
    c.fillStyle = 'white';
    c.fillText(~~GlobalScore, 0, 20);
})()
