var viewController = module.exports;

viewController.index = function (req, res) {
    res.render('index');
};

viewController.privacy = function (req, res) {
    res.render('privacy');
};

viewController.terms = function (req, res) {
    res.render('terms');
};