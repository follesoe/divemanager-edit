var fs = require("fs");
//var file = '/Users/follesoe/.config/Suunto/Suunto\ DM4/1.1.14.3463/DM4.db';
var file = '/Users/follesoe/Desktop/DM4.db';

'use strict';
angular.module('suuntoDMEditor')
  .controller('main', function ($scope) {
		$scope.message = "Hello World!";
		$scope.file = file;
		$scope.fileExists = fs.existsSync(file);
	});
