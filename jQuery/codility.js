/**
 * Created by Bhalani on 4/27/2016.
 */
function solution(A, B, M, X, Y) {
    if (A.length === 1 && B[0] <= M) {
        return 2;
    } else if (A.length === 1 && B[0] > M ) {
        return 0;
    } else if (A.length > 1) {
        for (i=0; i<B.length; i++){
            if (B[i] > M) {
                B.splice(i,1);
                A.splice(i,1);
            }
        }
    }
    if (A.length > 0) {
        var onElv = {
            ttlP: {
                p:1,
                d:[B[0]]
            },
            ttlW: A[0],
            ttlS: 0
        };
        A.shift(); B.shift();
        if (X > 1) {
            for (i = 0; i < A.length; i++ ) {
                if (((onElv.ttlW + A[i]) <= Y) &&
                    (onElv.ttlP.p < X) ) {
                    var exists = false, p = onElv.ttlP.p;
                    onElv.ttlP.d.forEach(function(el) {
                        if (el === B[i]) exists = true;
                    });
                    if (!exists) {
                        onElv.ttlP.d.push(B[i]);
                    }
                    onElv.ttlP.p ++;
                    onElv.ttlW += A[i];
                } else {
                    onElv.ttlP.p = 1;
                    onElv.ttlS += onElv.ttlP.d.length + 1;
                    onElv.ttlP.d = [B[i]];
                    onElv.ttlW = A[i];
                }
            }
        }
        onElv.ttlS += onElv.ttlP.d.length + 1;
        return onElv.ttlS; // return result
    }
    else {
    return 0;
    }
}
var A = [40,40,100,80,20],
    B = [3,3,2,2,3],
    M = 3, X = 5, Y = 200;
console.log(solution(A,B,M,X,Y));