const validationRole = (role) => {
    return ['admin', 'employee'].includes(role.toLowerCase())
}

module.exports = validationRole