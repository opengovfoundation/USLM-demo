var imports = [
  'angular-growl',
  'angularFileUpload',
  'uslmTest.controllers',
  'uslmTest.filters'
];

var app = angular.module('uslmTest', imports);

app.config(['growlProvider',
  function (growlProvider) {
    growlProvider.onlyUniqueMessages(true);
    growlProvider.globalTimeToLive(5000);
  }]);