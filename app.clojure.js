var W = a.width/10, H = a.height/10;
l=function(x,y,z){
    return "hsl("+360/I.length*x+",70%,50%)"; }
C=function(x,y,z){
    var s = {}, F = s.F = x;
    s.x=Math.floor(10*Math.random()),
    s.y=Math.floor(10*Math.random()),
    s.X=W*(s.x+.5),
    s.Y=H*(s.y+.5),
    s.T=function(x,y,z){
        c.fillStyle=l(F);
        c.font = "35px Sans";
        c.fillText("⌂", s.X, s.Y);
        c.font = "20px Sans";
    }
    return s;
}
J=function(x,y,z){
    var s = {}
    s.t=z,s.x=x,s.y=y,
    s.T=function(x,y,z){
        s.t&&(c.beginPath(),
        s.t&1 && (
            c.moveTo(W*(s.x), H*(s.y+.5)),
            c.lineTo(W*(s.x+1), H*(s.y+.5))
        ),
        s.t&2 && (
            c.moveTo(W*(s.x+.5), H*(s.y)),
            c.lineTo(W*(s.x+.5), H*(s.y+1))
        ), c.stroke());
    }
    return s
}
var K = [-2,1,2,-1];
T=function(x,y,z){
    var s={}
    var D=x, S=y, C=Array(9), F=D.F,
        j=O[10*S.x+S.y], f=1e2, n=j.t,
        e=z&&T(D,S,z-1), U=W*(S.x+.5), V=H*(S.y+.5),
        X=U, Y=V,
    N=function(x,y,z){
        var g = Math.abs(K[n]),
        f = O[10*(x+(g&1)*K[n]/g)+(y+(g&2)*K[n]/g/2)];
        return f && (f.y==j.y && f.x!=j.x && f.t&j.t&1 ||
             (f.x==j.x && f.y!=j.y && f.t&j.t&2)) && (j=f);
    },
    P=function(x,y,z){
        n=(n+3)%4;
        for(i=0;i<4&&!N(x,y);i++)
            n=(n+1)%4;
    }
    s.T=function(x,y,z){
        c.fillStyle=l(F);
        c.fillRect(U,V,6,6);
        t=Math.atan2(Y-V,X-U);
        U+=.05*(x|0)*Math.cos(t);
        V+=.05*(x|0)*Math.sin(t);
        2>Math.abs(X-U) && 2>Math.abs(Y-V) &&
            (P(j.x,j.y), X=W*(j.x+.5), Y=H*(j.y+.5));
        0<=R.indexOf(s) && 15>Math.abs(D.X-U) && 15>Math.abs(D.Y-V) &&
            (A+=~~f,B++, R.splice(R.indexOf(s), 1));
        f-=x/1E3
        e&&e.T(C.shift())
        C.push(x)
    }
    return s
}

// cIties, tRains, jOints
var I=[], R=[], O=[];
for(i=0;i<4;i++)
    I.push(C(i+1));
for(i=0;i<100;i++)
    O[i]=J(i/10|0,i%10|0,0);
a.onclick=function(x,y,z){
    var j = O[10*Math.floor(x.pageX/W)+Math.floor(x.pageY/H)], n=j.t;
    j.t = (n+1)%4;
};
var V, F=Date.now(), E=0, A=0, B=0;
setInterval(function(x,y,z){ A-=100+E/a.width;}, 1e4);
setInterval(function(x,y,z){ 15>I.length&&I.push(C(I.length+1)) }, 4e4);
U=function(x,y,z){ x.T(V) };
(G=function(x,y,z){
    requestAnimationFrame(G)
    V = Date.now() - F
    E += V
    F += V
    if (!(2*I.length<R.length || .8>E%Math.random())){
        var d = I[Math.floor(1e2*Math.random()%I.length)],
            b = I[Math.floor(1e2*Math.random()%I.length)];
        d!=b&&O[10*b.x+b.y].t && R.push(
            T(d,b,Math.floor(1e2*Math.random()%I.length)+1));
    }
    c.clearRect(0, 0, a.width, a.height)
    c.fillStyle = "green"
    c.fillRect(0, 0, a.width, a.height)
    c.fill()
    I.forEach(U)
    O.forEach(U)
    R.forEach(U)
    c.fillStyle = "white";
    1<Math.abs(A/1E4)&&c.fillText("Trains: "+B, a.width/2.5, a.height/2);
    c.fillText(B, a.width, 20);
    c.fillText(~~A, 0, 20);
})();
