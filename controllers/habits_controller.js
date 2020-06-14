const Habit = require('../models/habit')
let formatDate = function (date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
module.exports.create =async function(req, res){
    console.log(req.body);
    console.log(req.user);
    try{
        //check uther Authorization
        if(req.isAuthenticated()){
            let habit = await Habit.create({
                name: req.body.habitName,
                user: req.user._id
            });
            habit.status.push("none", "none", "none", "none", "none", "none", "none");
            habit.save();
            if(req.xhr){
                return res.status(200).json({
                    habit:habit,
                    message:'Habit Created!!'
                });
            }
            return res.redirect('/');
        }else{
            console.log('User not authenticated');
            return res.redirect('/');
        }
    }catch(error){
        console.log('Error : ', error);
        return res.redirect('/');
    }
    
}

module.exports.display = async function(req, res){
    try{
        let habits = await Habit.find({});
        for (habit of habits){
            let status = habit.status.slice(Math.max(habit.status.length - 7, 0))
            while(status.length != 7)
                status.unshift('none');
            habit.status = status;
            
        }
        let dates = [];
        for(let i =0;i < 7;i++){
            let d = new Date();
            d.setDate(d.getDate()-i);
            dates[i] = formatDate(d);
        }
        // console.log(dates);
        // console.log(habits);
        return res.render('week',{
            habits : habits,
            dates: dates
        });
    }catch(error){
        console.log('Error : ', error);
        return res.render('week');
    }
    
}

module.exports.update = async function(req, res){
    try{
        console.log(req.body);
        let habit = await Habit.findById(req.body.habitId);
        habit.status[habit.status.length - req.body.statusId-1] = req.body.status;
        let temp = habit.status
        await Habit.updateOne({_id : req.body.habitId},{status : temp});
        if(req.xhr){
            return res.status(200).json({
                message:'changed'
            });
        }

    }catch(error){
        console.log('Error : ', error);
        return res.redirect('back');
    }
}