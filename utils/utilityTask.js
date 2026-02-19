const validateStatus = (status) => {
    return ['pending', 'success'].includes(status.toLowerCase())
}

const validateDate = (date) => {
    return !isNaN(Date.parse(date))
}

module.exports = { validateStatus, validateDate }