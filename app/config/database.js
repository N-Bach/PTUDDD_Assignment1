var mongoose = require('mongoose');
var connection = require('./connection')

mongoose.connect(connection.db_url);

require('../models/card.js');
require('../models/user.js');


