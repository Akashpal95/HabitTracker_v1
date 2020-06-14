const express = require('express');
const app = express();
const port = 8000; //port 80 for production level code
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Parse request body
app.use(express.urlencoded());
//make the assets folder available to browser
app.use(express.static('./assets'));

app.use(expressLayouts);

//Extract Style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true)

//Setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'codeial', 
    //TODO change the secret before deployment
    secret:'blahsomething',
    saveUninitialized: false, //When there is a session is not initialised i.e. user didn't login don't send extra data in cookie
    resave:false, //Identity is already established session data is present don't re-write the same thing
    cookie: {
        maxAge : (1000*60 *100)
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

//Sets the user from the session cookie to locals
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});
