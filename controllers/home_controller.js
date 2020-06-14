const Habit = require('../models/habit');
module.exports.home = async function(req, res){
    try{
        let habits = await Habit.find({});

        return res.render('home',{
            habits:habits
        });

    }catch(error){
        console.log('Error : ', err);
        return ;
    }
}