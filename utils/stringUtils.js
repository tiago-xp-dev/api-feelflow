function isNullOrEmpty(value) {
    if (typeof str === "string" && str.length === 0) {
        // Vazia.
        return true
    } else if (str === null) {
        // Nula.
        return true
    } else {
        // Preenchida.
        return false
    }
}

module.exports = {
    isNullOrEmpty,
}