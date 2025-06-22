# Problem 1: Three ways to sum to n

Provide 3+ unique implementations of the following function in JavaScript.
**Input**: `n` - any integer
*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

```
var sum_to_n_a = function(n) {
    let sumpN = 0;
    for(let i = 1; i <= n; i++) {
        sumpN += i;
    }
    return sumpN;
};

var sum_to_n_b = function(n) {
    let sumpN = 0;
    let i = 1;
    while(i <= n) {
       sumpN += i;
       i++;
    }
    return sumpN;
}

var sum_to_n_c = function(n) {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
};

var sum_to_n_d = function(n) {
    const sumN = (n * (n + 1)) / 2;
    return sumN;
};
```