module.exports.signup_get = (req, res) => {
    res.render('signup')
}
module.exports.signup_post = (req, res) => {
    res.send('new signup')
    const {email, password} = req.body;
    console.log(req.body);
    console.log(email, password);
}
module.exports.login_get = (req, res) => {
    res.render('login')
}
module.exports.login_post = (req, res) => {
    res.send('new login')
    const {email, password} = req.body;
    console.log(req.body);
    console.log(email, password);
    
}