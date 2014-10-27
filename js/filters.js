angular.module('uslmTest.filters', [])
  .filter('isArray', function () {
    return function (obj) {
      return (obj instanceof Array);
    };
  });