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

const fs = require('fs');
const environment = (process.env.NODE_ENV || 'development');
const jsonPath = `./config/${environment}.json`;
const jsPath = `./config/${environment}.js`;

if (fs.existsSync(jsonPath)) {
	module.exports = require(jsonPath);
} else if (fs.existsSync(jsPath)) {
	module.exports = require(jsPath);
} else {
	module.exports = {
		// produccion
		host: env('HOST', '0.0.0.0'),
		port: Number(env('PORT', '8080')),
		noindex: env('NOINDEX', 'true') === 'true',
		readonly: env('READONLY', 'false') === 'true',

		webservice: env('WEBSERVICE_URL', {
			database: env('DATABASE', 'mongodb://qa11ywsbd:d3fc2581e25e6da12df3771cfa219c97@dokku-mongo-qa11ywsbd:27017/qa11ywsbd'),
			host: env('HOST', '0.0.0.0'),
			port: Number(env('PORT', '5000')),
			cron: env('CRON', false)
		})

		// local
		// port: Number(env('PORT', '8080')),
		// noindex: env('NOINDEX', 'true') === 'true',
		// readonly: env('READONLY', 'false') === 'true',

		// webservice: env('WEBSERVICE_URL', {
		// 	database: env('WEBSERVICE_DATABASE', 'mongodb://localhost/pa11y-webservice'),
		// 	host: env('WEBSERVICE_HOST', '0.0.0.0'),
		// 	port: Number(env('WEBSERVICE_PORT', '3000')),
		// 	cron: env('WEBSERVICE_CRON', false)
		// })


	};
}

function env(name, defaultValue) {
	const value = process.env[name];
	return typeof value === 'string' ? value : defaultValue;
}
