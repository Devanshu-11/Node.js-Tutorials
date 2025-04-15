class Calculator{
    add(a,b){
        return a+b;
    }

    multiply(a,b){
        return a*b;
    }

    subtract(a,b){
        return a-b;
    }

    divide(a,b){
        return a/b;
    }
}

// exporting a single value which is calculator class
module.exports=Calculator;