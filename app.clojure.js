W = a.width/10, H = a.height/10;
T=function(x,y,z){
    var s={F: y.F},
        C=Array(9), j=x,
        U=W*(j.x+.5), V=H*(j.y+.5),
        u=W*(y.x+.5), v=H*(y.y+.5), n=j.t,
        e=z&&T(x,y,z-1),
        X=U, Y=V,
        n=1, s=1;
    P=function(x,y,z){
        z=0;
        do {
            n=(n+1)%3*s;
            s>1&&(s*=-1);
            f = O[10*(x+(n&1)*s)+(y+(n&2)*s/2)]
            f && f.t&j.t && (f.x!=x && f.t&1 ||
                 (f.y!=y && f.t&2)) && (j=f, z=4)
        } while(z++<4);
    }
    s.T=function(x,y,z){
        c.fillStyle="hsl("+360/I*s.F+",70%,50%)"
        c.fillRect(U,V,6,6)
        U+=.05*x*(n&1)*s
        V+=.05*x*(n&2)*s/2
        3>(Math.abs(X-U)+Math.abs(Y-V)) &&
            (P(j.x,j.y), X=W*(j.x+.5), Y=H*(j.y+.5));
        s in R && 30>(Math.abs(u-U)+Math.abs(v-V)) &&
            (A+=1e2,B++, R.splice(R.indexOf(s), 1));
        e&&e.T(C.shift()|0)
        C.push(x)
    }
    return s
}

// tRains, jOints
R=[], O=[];
// try to move J here
for(i=0;i<100;i++)
    O[i]={
        x: i/10|0,
        y: i%10|0,
        t: 0, F: 0,
        T: function(x,y,z){
            s=this
            c.fillStyle='#000'
            s.t&1 && c.fillRect(W*(s.x), H*(s.y+.5), W, 1)
            s.t&2 && c.fillRect(W*(s.x+.5), H*(s.y), 1, H)
            s.F && (c.fillStyle="hsl("+360/I*s.F+",70%,50%)",
                    c.fillText("⌂", W*(s.x+.5), H*(s.y+.5)));
        }
    }
a.onclick=function(x,y,z){
    O[10*(x.pageX/W|0)+x.pageY/H|0].t = (O[10*(x.pageX/W|0)+x.pageY/H|0].t+1)%4;
};
V, F=Date.now(), E=0, A=0, B=0, P=1, I=0;
U=function(x,y,z){ x.T(V) };
c.font = "35px Sans";
(G=function(x,y,z){
    requestAnimationFrame(G)
    V = Date.now() - F
    E += V
    F += V
    if (1>Math.abs(A)/1e4 && !(2*I<R.length || .8>E%Math.random())){
        d = O[1e2*Math.random()|0],
            b = O[1e2*Math.random()|0];
        b.C && d.C && d!=b && b.t && R.push(
            T(d,b,1e2*Math.random()%I|0+1));
    }
    // -> 1 call of C -> move from func
    if (1>Math.abs(A)/1e4 && E/4e4>I-3 && 10>I-3)
        O[1e2*Math.random()|0].F = ++I;
    1>Math.abs(A)/1e4 && E/1e4>P && (P++, A-=100+E/a.width);
    c.clearRect(0, 0, a.width, a.height)
    c.fillStyle = "#080"
    c.fillRect(0, 0, a.width, a.height)
    O.forEach(U)
    R.forEach(U)
    c.fillStyle = "#FFF";
    1<Math.abs(A)/1e4&&c.fillText("Trains: "+B, a.width/2.5, a.height/2);
    c.fillText(~~A, 0, 35);
})();
