var imports = [
  'angular-growl',
  'angularFileUpload',
  'uslmTest.controllers'
];

var app = angular.module('uslmTest', imports);

app.config(['growlProvider',
  function (growlProvider) {
    growlProvider.onlyUniqueMessages(true);
    growlProvider.globalTimeToLive(5000);
  }]);