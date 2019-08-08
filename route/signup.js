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

'use strict';
const getStandards = require('../data/standards');
const httpHeaders = require('http-headers');
module.exports = route;

// Route definition
function route(app) {
  
app.express.get('/signup', (request, response, next) => {
      response.render('users/signup', {
        isLoginPage: true,
      });
    });

app.express.get('/logout', (request, response, next) => {
request.logout();
request.flash('success_msg', 'You are logged out now.');
request.redirect('users/signin');
});

app.express.post('/signup', (request, response) => {
  let errors = [];
  const { name, email, password, confirmar_password } = request.body;
  if(name.length == 0 || email.length == 0) {
    errors.push({text: 'Ingrese un usuario válido.'})
  }
  if(password != confirmar_password) {
    errors.push({text: 'Las contraseñas no coinciden.'});
  }
  if(password.length < 4 && name.length != 0 && email.length != 0) {
    errors.push({text: 'Su contraseña debe tener al menos 4 caracteres.'})
  }
  if(errors.length > 0){
    response.render('users/signup', {isLoginPage: true, errors, name, email, password, confirmar_password});
   } else {
      app.webservice.users.get({lastres: true}, (error, users) => {
      // console.log(users);
      if (error) {
        return next(error);
      }
    // console.log(users);
    // console.log(users.find(us => us.email === email));
    if(users.find(usuario => usuario.email === email)) {
      request.flash('error_msg', 'El email ya está en uso.');
      response.redirect('/signup');
    } else {
      // Saving a New User
    console.log('-------------------------------------------------------');
    console.log(request.body.name);
    console.log(request.body.email);
    console.log(request.body.password);
    console.log('-------------------------------------------------------');
    // console.log(app.webservice);
    // console.log('-------------------------------------------------------');
    // console.log(app);
      let parsedActions;
      if (request.body.actions) {
        parsedActions = request.body.actions.split(/[\r\n]+/)
          .map(action => {
            return action.trim();
          })
          .filter(action => {
            return Boolean(action);
          });
      }

      let parsedHeaders;
      if (request.body.headers) {
        parsedHeaders = httpHeaders(request.body.headers, true);
      }

      const newUser = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
      };

      app.webservice.users.create(newUser, (error, user) => {
        if (error) {

          newUser.actions = request.body.actions;
          newUser.headers = request.body.headers;

          return response.render('/', {

             added: (typeof request.query.added !== 'undefined')

           });
        }
        response.redirect(`/${user.id}/user?added`);
      });
    }});
  }

  });
}

