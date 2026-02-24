const getejs = async(req, res) => {
    const data = {
        title : "EJS Test",
        heading : "Hello, Test",
        pageName : "Home"
    }
    res.render('index', {data} )   
}

module.exports = getejs