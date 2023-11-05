function isNullOrEmpty(str) {
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

function isNull(str){
    if (str === null) {
        // Nula.
        return true
    } else {
        // Não nula.
        return false
    }
}

module.exports = {
    isNullOrEmpty,
    isNull,
}