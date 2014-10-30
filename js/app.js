var imports = [
  'angular-growl',
  'ui.bootstrap',
  'btford.markdown',
  'angularFileUpload',
  'uslmTest.controllers',
  'uslmTest.filters'
];

var app = angular.module('uslmTest', imports);

app.config(['growlProvider',
  function (growlProvider) {
    growlProvider.globalTimeToLive(5000);
  }]);