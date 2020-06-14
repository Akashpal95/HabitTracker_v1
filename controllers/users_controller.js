const User = require('../models/user');

module.exports.profile = async function(req, res){
    try{
        let user = await User.findById(req.params.id);

        return res.render('user_profile', {
            profile_user:user
        });
    }catch(err){
        console.log('Error in finding user profile : ', err);
        return res.redirect('back');
    }
 
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        //req.body can be sent or expanded for {name:req.body.name, email:req.body.email} which is basically same as req.body
        User.findByIdAndUpdate(req.params.id, req.body,function(err, user){
            if(err){console.log('error in updating user info'); return};
            return res.redirect('back');
        });
    }else{
        //If update fails return http status code for error
        return res.status(401).send('Unauthorised');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up');
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in');
}

//To create an user in database
module.exports.create = async function(req, res){
    console.log(req.body);
    try{
        //Check password and common password
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        //Check if user already exists
        let user = await User.findOne({email:req.body.email});
        if(!user){
            console.log('Reaches here');
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                return res.redirect('/users/sign-in');
            })

        }else{
            console.log('User exists!');
            return res.redirect('back');
        }
    }catch(error){
        console.log('Error:', error);
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    console.log('Logged in Successfully');
    return res.redirect('/');
}
//log out
module.exports.destroySession = function(req, res){
    req.logout();
    console.log('You have logged out');
    return res.redirect('/');
}
