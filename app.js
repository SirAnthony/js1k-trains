
var colors = ['green', 'red', 'yellow', 'blue', 'white', 'gray'];
function City(idx){
    var x = 20+(a.width-55)*(idx%2);
    var y = a.height/5*idx;
    return {
        idx: idx,
        p: {x: x, y: y},
	T: function(z){
	    c.fillStyle = colors[idx]
	    c.fillRect(x, y, 10, 10)
	}
    }
}
function Joint(points){
    return {
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

function Train(idx){
    return {
        idx: idx,
        p: {x: x, y: y},
	T: function(z){
	    c.fillStyle = colors[idx]
	    c.fillRect(x, y, 10, 10)
	}
    }
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
        if (ci.p.x<(x+20) && ci.p.x>(x-20) &&
            ci.p.y<(y+20) && ci.p.y>(y-20))
            return ci;
    }
    return 0;
}
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
var S;
(function L(){
    requestAnimationFrame(L);
    var D = Date.now()-S;
    S+=D;
    c.clearRect(0,0,a.width,a.height);
    c.fillStyle = colors[0];
    c.fillRect(0,0,a.width,a.height);
    c.fill();
    var p = function(o){ o.T(D) }
    cities.forEach(p);
    joints.forEach(p);
    for (var i=0; i<new_joint.length; i+=2){
        c.fillStyle = colors[5];
        c.fillRect(new_joint[i], new_joint[i+1], 3, 3);
    }
})()
