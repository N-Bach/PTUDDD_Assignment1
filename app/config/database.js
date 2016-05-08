var mongoose = require('mongoose');
var connection = require('./connection')

mongoose.connect(connection.db_url);

require('../models/card');
require('../models/user');
require('../models/feedback');



