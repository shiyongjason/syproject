import { BigNumber } from 'bignumber.js'

// Github::::::https://github.com/MikeMcl/bignumber.js
// Api:::::::https://www.jianshu.com/p/f5d3e379744c

/**
 * 精确加法
 */
function plus (num1, num2, ...others) {
    // 0.1 + 0.2 // 0.30000000000000004
    // x = BigNumber(0.1)
    // y = x.plus(0.2) // '0.3'
    if (others.length > 0) {
        return plus(plus(num1, num2), others[0], ...others.slice(1))
    }
    let x = BigNumber(num1)
    return x.plus(num2)
}
/**
 * 精确乘法
 */
function multipliedBy (num1, num2, ...others) {
    // 0.6 * 3 // 1.7999999999999998
    // x = BigNumber(0.6)
    // y = x.multipliedBy(3) // '1.8'
    if (others.length > 0) {
        return multipliedBy(multipliedBy(num1, num2), others[0], ...others.slice(1))
    }
    let x = BigNumber(num1)
    return x.multipliedBy(num2)
}
/**
 * 精确减法
 */
function minus (num1, num2, ...others) {
    // 0.3 - 0.1 // 0.19999999999999998
    // x = BigNumber(0.3)
    // x.minus(0.1) // '0.2'
    if (others.length > 0) {
        return minus(minus(num1, num2), others[0], ...others.slice(1))
    }
    let x = BigNumber(num1)
    return x.minus(num2)
}
/**
 * 精确除法
 */
function dividedBy (num1, num2, ...others) {
    // use:
    // x = BigNumber(355)
    // y = BigNumber(113)
    // x.dividedBy(y) // '3.14159292035398230088'
    if (others.length > 0) {
        return dividedBy(dividedBy(num1, num2), others[0], ...others.slice(1))
    }
    let x = BigNumber(num1)
    let y = BigNumber(num2)
    return x.dividedBy(y)
}

export default {
    plus,
    minus,
    multipliedBy,
    dividedBy
}
