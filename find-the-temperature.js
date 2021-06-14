function closestToZero(ts) {
    if (ts.length === 0) return 0;

    let result = ts[0]

    for (let i = 0; i < ts.length; i++) {
        const number = Math.abs(ts[i])
        const current = Math.abs(result)

        if (number < current) result = ts[i]
        if (result < 0 && number === current) result = ts[i]
    }

    return result
}
