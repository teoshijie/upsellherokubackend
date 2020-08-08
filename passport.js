const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/user');

const cookieExtractor = req => {
   let token = null;
   console.log(req);
   console.log(req.cookies);
   if (req && req.cookies){
       token = req.cookies["access_token"]
   }
   return token; 
}
//authorization (protect the edit end point)
passport.use(new JwtStrategy({
   jwtFromRequest: cookieExtractor, 
   secretOrKey : process.env.SECRET_KEY
}, (payload, done) => {
   User.findById({_id : payload.sub}, (err,user) =>{
       if (err){
           return done(err,false)
       }
       if (user){
           return done(null,user)

       } else return (null, false)
   })
}))

// authenticated local stragety using username and password 

passport.use(new LocalStrategy((username,password,done) => {
    console.log('username and password:'+ username, password)

   User.findOne({username},(err,user) => {
       if(err){
           return done(err)
       }
       else if(!user){
           return done(null, false);
       }else {
           user.comparePassword(password, done);
       }
   })
}));


