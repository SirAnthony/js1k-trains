W = a.width/10, H = a.height/10;
T=function(x,y,z){
    var s={F: y.F},
        C=Array(9), j=x, J=y,
        U=W*(j.x+.5), V=H*(j.y+.5),
        n=j.t, e=z&&T(x,y,z-1),
        X=U, Y=V,
        n=1, g=-1,
    P=function(x,y,z){
        n&2&&(g*=-1), n=n*2%3;
        for(i=0;i<5;i++){
            f = O[10*(x+(n&1)*g)+(y+(n&2)*g/2)];
            f && f.t&j.t&n && (j=f, X=W*(j.x+.5), Y=H*(j.y+.5), i=4) ||
             (n=n*2%3, n&2&&(g*=-1));
        }
    }
    s.T=function(x,y,z){
        c.fillStyle="hsl("+360/I*s.F+",70%,50%)"
        c.fillRect(U,V,6,6)
        x && (2>(Math.abs(X-U)+Math.abs(Y-V)) && (
            // Remove
            R.indexOf(s)>=0 && j==J && (A+=1e2,B++, R.splice(R.indexOf(s), 1)) ||
            // Next point
            P(j.x,j.y))
        || (U+=x*(n&1)*g, V+=x*(n&2)*g/2));
        e&&(e.T(C.shift()||0), C.push(x))
    }
    return s
}

// tRains, jOints, ciTies
R=[], O=[], C=[];
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
V=0, F=Date.now(), E=0, A=0, B=0, P=1, I=0;
U=function(x,y,z){ x.T(16/20) };
c.font = "35px Sans";
(G=function(x,y,z){
    requestAnimationFrame(G);
    V = Date.now() - F
    E += V
    F += V
    if (1>Math.abs(A)/1e4 && !(2*I<R.length || .8>E%Math.random()))
        x = C[1e2*Math.random()%I|0], y = C[1e2*Math.random()%I|0],
        x!=y && x.t && R.push(T(x,y,1e2*Math.random()%I|0+1));
    // -> 1 call of C -> move from func
    if (1>Math.abs(A)/1e4 && E/4e4>I-3 && 10>I-3)
        x=O[1e2*Math.random()|0], I = x.F = C.push(x);
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
