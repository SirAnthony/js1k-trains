
var colors = ['green', 'red', 'yellow', 'blue', 'white', 'gray'];
function City(idx){
    var x = 20+(a.width-55)*(idx%2);
    var y = a.height/5*idx;
    return {
        idx: idx,
        x: x, y: y,
	T: function(z){
	    c.fillStyle = colors[idx]
	    c.fillRect(x, y, 10, 10)
	}
    }
}
function Joint(points){
    return {
        p: points,
	T: function(z){
	    c.beginPath();
            for (var p=0; p<points.length; p=p+2){
                c.moveTo(points[p], points[p+1]);
                c.lineTo(points[p+2], points[p+3]);
	        c.stroke();
            }
	}
    }
}

function close(x, y, p, ammount){
    return p.x<(x+ammount)&&p.x>(x-ammount) &&
        p.y<(y+ammount)&&p.y>(y-ammount);
}

function Train(dst, source, num){
    var destination = cities[dst];
    var cjoint = source[dst];
    var pidx = 0, speed = 0.1;
    var dirx = 0, diry = 0;
    var x = source.x, y = source.y;
    var obj = {
        x: source.x,
        y: source.y,
        T: function(z){
            c.fillStyle = colors[dst];
            c.fillRect(obj.x, obj.y, 6, 6);
            obj.x += dirx * z * speed;
            obj.y += diry * z * speed;
            if (close(x, y, obj, 10)){
                pidx += 2;
                x = cjoint.p[pidx], y = cjoint.p[pidx+1];
                var dx = x - obj.x, dy = y - obj.y;
                var dist = Math.sqrt(x*x+y*y);
                dirx = dx/dist, diry = dy/dist;
            }
            obj.next&&obj.next.T(z);
            if (pidx>=cjoint.p.length)
                trains.splice(trains.indexOf(obj), 1);
        }
    }
    return obj;
}

c.font='35px Sans'
S = Date.now();
var cities = [];
var joints = [];
for (i=1; i<5; i++){
    cities.push(City(i))
}
var new_joint = [], ss = 0;
function to_city(x, y){
    for (var c=0; c<cities.length; c++){
        var ci = cities[c];
        if (close(x, y, ci, 20))
            return ci;
    }
    return 0;
}
var trains = [];
a.onclick = function(e){
    var ci = to_city(e.pageX, e.pageY);
    if (ci||new_joint.length){
        new_joint.push(e.pageX, e.pageY);
        if (ci&&new_joint.length>2){
            var J = Joint(new_joint);
            joints.push(J);
            ci[ss.idx] = J;
            ss[ci.idx] = J;
            new_joint=[];
        } else if (ci)
            ss = ci;
    }
}
function Update(){
    if (cities.length*2<trains.length)
        return;
    var count = Math.ceil(Math.random()*100%8);
    var dst = Math.ceil(Math.random()*100%cities.length);
    var src = Math.ceil(Math.random()*100%cities.length);
    var source = cities[src-1];
    if (!source[dst])
        return;
    var t = Train(dst, source, 0);
    trains.push(t);
    for (var i=0; i<count; i++)
        t.next = Train(dst, source, i+1);
}
var TimePassed = 0;
(function L(){
    requestAnimationFrame(L);
    var D = Date.now()-TimePassed;
    TimePassed+=D;
    Update();
    c.clearRect(0,0,a.width,a.height);
    c.fillStyle = colors[0];
    c.fillRect(0,0,a.width,a.height);
    c.fill();
    var p = function(o){ o.T(D) }
    joints.forEach(p);
    cities.forEach(p);
    trains.forEach(p);
    for (var i=0; i<new_joint.length; i+=2){
        c.fillStyle = colors[5];
        c.fillRect(new_joint[i], new_joint[i+1], 3, 3);
    }
})()
