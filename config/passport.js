// This file is part of Qa11y Dashboard.
//
// Qa11y Dashboard is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Qa11y Dashboard is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Qa11y Dashboard.  If not, see <http://www.gnu.org/licenses/>.
// Developed by Guillermo Alexis Lemunao Carrasco and Pa11y Guys

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let user = {};

passport.serializeUser(function(user, done) {
    console.log('el user');
    console.log(user);
    console.log('el user.id');
    console.log(user.id);
    done(null, user.id);
});

passport.use('login', new LocalStrategy({
 usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password',
    passReqToCallback : true
  }, async (request, email, password, done) => {
  //   // console.log('el user mas grand es');
  //   // console.log(request);

  // var mongoose = require('mongoose');
  // var Schema = mongoose.Schema;
  //     // define a schema
  // var animalSchema = new Schema({ name: String, type: String });

  // // assign a function to the "methods" object of our animalSchema
  // animalSchema.methods.findSimilarTypes = function(cb) {
  //   return this.model('Animal').find({ type: this.type }, cb);
  // };
  // var Animal = mongoose.model('Animal', animalSchema);
  // var dog = new Animal({ type: 'dog' });
  // var gato = new Animal({ type: 'gato' });

  // dog.findSimilarTypes(function(err, dogs) {
  //   console.log(dogs); // woof
  // });
  // const ja = Animal.findOne({type: 'dog'});
  // let animals = await Animal.findByName('fido');
  // animls = animals.concat(await Animal.findByBreed('Poodle'));
  // console.log('el ja es');
  // console.log(animals);



// const schema = new Schema({ name: String, inventory: {} });
// const Character = mongoose.model('Character', schema);

// // will store `inventory` field if it is not empty
// const frodo = new Character({ name: 'Frodo', inventory: { ringOfPower: 1 }});
// await frodo.save();
// let doc = await Character.findOne({ name: 'Frodo' }).lean();
// doc.inventory; // { ringOfPower: 1 }

// // will not store `inventory` field if it is empty
// const sam = new Character({ name: 'Sam', inventory: {}});
// await sam.save();
// doc = await Character.findOne({ name: 'Sam' }).lean();
// doc.inventory; // undefined

// // console.log(doc);
// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);;

// var small = new Tank({ size: 'small' });
// small.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });

// // or

// Tank.create({ size: 'small' }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });

// // or, for inserting large batches of documents
// Tank.insertMany([{ size: 'small' }], function(err) {

// });

// const doc = await Tank.find({ size: 'penca' });
// console.log(doc);
// if (!doc) {
//     return done(null, false, { message: 'Not User found.' });
//   } else {
// return done(null, false, { message: 'yes' });

//   }

  if (!request._toParam.find(us => us.email === email)) {
    return done(null, false, { message: 'Usuario no registrado,' });
  } else {
    user = Object.assign({}, request._toParam.find( us => us.email === email));
    if(user.password === password) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta.' });
    }
  }

}));

passport.deserializeUser(function(id, done) {
    console.log('estoy en el  deserialize');
    console.log('el id es');
    console.log(id);
  done(null, id)
});

// //////////////////////////////////////////////////////////////////////
// passport.use('login', new LocalStrategy({
// 	usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
//     passwordField: 'password',
//     passReqToCallback : true
//   }, async (request, email, password, done) => {

//     contenidoa.request = request;
//     const contenidob = request._toParam.find( us => us.email === email);


//     // console.log('------------------');
//     // console.log(contenidoa);
//     // console.log('------------------');
//     // console.log(contenidob); 

//   if (!request._toParam.find(us => us.email === email)) {
//     return done(null, false, { message: 'Usuario no registrado' });
//   } else {

//       User.create(request._toParam.find(us => us.email === email)).then(function(newUser, created) {
 
// console.log(newUser);
//                         if (newUser) {
 
//                             return done(null, newUser);
 
//                         }
 
//                     });
 
//   }

// }));



// passport.serializeUser(function(user, next) {
//   console.log(user.id);
//     console.log(user);  
//   let id = user._id;
//   user_cache[id] = user;
//   next(null, id);
// });
// // passport.serializeUser(function(req, user, done) {
// //     console.log(req);
// //     console.log(user.id);
// //     console.log(user);
// //     done(null, user.user_id);
// // });

// passport.deserializeUser((id, done) => {
//     console.log(contenidoa.request._toParam.find(id));
//     console.log('kk');
//     const user = contenidoa.request._toParam.find(id);
//     done(err, user)
// });
// ////////////////////////////////////////////////////////////
    // // check in mongo if a user with username exists or not
    // // User.findOne({ 'username' :  username }, 
    //   // function(err, user) {
    //     // In case of any error, return using the done method
    //     // if (err)
    //     //   return done(err);
    //     // Username does not exist, log error & redirect back
    //     console.log(request._toParam);
    //     request._fromParam = 'Hello 2';
    //     console.log(request);
    //     if ("hola"==="ka"){
    //       console.log('User Not Found with username ');
    //       return done(null, false, 
    //             request.flash('message', 'User Not found.'));                 
    //     }
    //     // User exists but wrong password, log the error 
    //     if ("hola"==="ka"){
    //       console.log('Invalid Password');
    //       return done(null, false, 
    //           request.flash('message', 'Invalid Password'));
    //     }
    //     // User and password both match, return user from 
    //     // done method which will be treated like success
    //     return done(null, email);
      
    // // );
module.exports=passport;

    // passport.use('login', new LocalStrategy(
    //   function(username, password, done) {
    //     console.log(username +' asjkasjksa ' +password);
    //     console.log("test");
    //       if (username === 'carlos.iie.cl') {
    //           return done(null, { name: "test", id: '1234'});
    //       } else {
    //           return done(null, false, { message: 'Incorrect cred.' });
    //       }
    //   })
    // )