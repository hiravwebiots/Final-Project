const validateStatus = (status) => {
    return ['pending', 'in progress', 'success'].includes(status.toLowerCase())
}

const validateDate = (date) => {
    return !isNaN(Date.parse(date))
}

module.exports = { validateStatus, validateDate }