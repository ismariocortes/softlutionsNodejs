
const indexCtrlr = {};

indexCtrlr.renderIndex = (req, res) =>{
    res.render('index');
}

indexCtrlr.renderAbout = (req, res) =>{
    res.render('about');
}

module.exports = indexCtrlr;