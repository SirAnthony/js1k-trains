var W = a.width/10, H = a.height/10;
l=function(x,y,z){
    return "hsl("+360/I.length*x+",70%,50%)"; }
C=function(x,y,z){
    var s = {}, F = s.F = z;
    s.j=O[10*x+y],
    s.X=W*(x+.5),
    s.Y=H*(y+.5),
    s.T=function(x,y,z){
        c.fillStyle=l(F);
        c.fillText("⌂", s.X, s.Y);
    }
    return s;
}
var K = [-2,1,2,-1];
T=function(x,y,z){
    var s={},
        D=x, S=y, C=Array(9), F=D.F,
        j=S.j, f=1e2, n=j.t,
        e=z&&T(D,S,z-1), U=S.X, V=S.Y,
        X=U, Y=V,
    N=function(x,y,z){
        z = Math.abs(K[n]),
        f = O[10*(x+(g&1)*K[n]/g)+(y+(g&2)*K[n]/g/2)];
        return f && (f.x!=x && f.t&j.t&1 ||
             (f.y!=y && f.t&j.t&2)) && (j=f);
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
        4>((X-U)*(X-U)+(Y-V)*(Y-V)) &&
            (P(j.x,j.y), X=W*(j.x+.5), Y=H*(j.y+.5));
        0<=R.indexOf(s) && 30>((D.X-U)*(D.X-U)+(D.Y-V)*(D.Y-V)) &&
            (A+=f,B++, R.splice(R.indexOf(s), 1));
        f-=x/1e3
        e&&e.T(C.shift())
        C.push(x)
    }
    return s
}

// cIties, tRains, jOints
var I=[], R=[], O=[];
// try to move J here
for(i=0;i<100;i++)
    O[i]={
        x: i/10|0,
        y: i%10|0,
        t: 0,
        T: function(x,y,z){
            s=this
            c.fillStyle='#000'
            s.t&1 && c.fillRect(W*(s.x), H*(s.y+.5), W, 1)
            s.t&2 && c.fillRect(W*(s.x+.5), H*(s.y), 1, H)
        }
    }
a.onclick=function(x,y,z){
    var j = O[10*(x.pageX/W|0)+x.pageY/H|0]
    j.t = (j.t+1)%4;
};
var V, F=Date.now(), E=0, A=0, B=0, P=1;
U=function(x,y,z){ x.T(V) };
c.font = "35px Sans";
(G=function(x,y,z){
    requestAnimationFrame(G)
    V = Date.now() - F
    E += V
    F += V
    if (1>Math.abs(A)/1e4 && !(2*I.length<R.length || .8>E%Math.random())){
        var d = I[1e2*Math.random()%I.length|0],
            b = I[1e2*Math.random()%I.length|0];
        d!=b&&b.j.t && R.push(
            T(d,b,1e2*Math.random()%I.length|0+1));
    }
    // -> 1 call of C -> move from func
    if (1>Math.abs(A)/1e4 && E/4e4>(I.length-3) && I.length<15)
        I.push(C(10*Math.random()|0, 10*Math.random()|0, I.length+1));
    1>Math.abs(A)/1e4 && E/1e4>P && (P++, A-=100+E/a.width);
    c.clearRect(0, 0, a.width, a.height)
    c.fillStyle = "#080"
    c.fillRect(0, 0, a.width, a.height)
    c.fill()
    I.forEach(U)
    O.forEach(U)
    R.forEach(U)
    c.fillStyle = "#FFF";
    1<Math.abs(A)/2e4&&c.fillText("Trains: "+B, a.width/2.5, a.height/2);
    c.fillText(B, a.width, 35);
    c.fillText(~~A, 0, 35);
})();
