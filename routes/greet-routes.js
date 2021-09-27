module.exports = function (greetings) {

    async function defualtRoute(req, res){
        req.flash('greetUser' , greetings.getMessage());
    
        res.render("index", {
            countNames: await greetings.poolCounter(),
            color: greetings.addAlertClass(),
            
        });
    }

    async function actionRoute(req, res) {
        await greetings.greetMe(req.body.userName, req.body.language);
        await greetings.poolCounter();
    
        res.redirect('/');
    }

    async function greetedRoute(req, res) {
        res.render('greeted', {
            greetedNames: await greetings.poolGreet()
    
        });
    }

    async function summaryRoute(req, res) {
        const userSelected = req.params.username;
        const greetedCount = await greetings.poolUserGreeted(userSelected);
    
        res.render('summary', {
            userSelected,
            greetedCount
    
        });
    }

    async function resetRoute(req, res) {
        await greetings.resetData()
    
        res.redirect('/');
    
    }

    return{
        defualtRoute,
        actionRoute,
        greetedRoute,
        summaryRoute,
        resetRoute
    }
}