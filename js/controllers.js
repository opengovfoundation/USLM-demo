angular.module('uslmTest.controllers', [])
  .controller('AppController', ['$scope',
    function ($scope) {

    }])
  .controller('DownloadController', ['$scope', '$upload', 'growl',
    function ($scope, $upload, growl) {

      $scope.uploadForm = {};
      $scope.bills = [];

      $scope.onFileSelect = function ($files, $event) {
        $scope.input = $event.target;

        if ($files.length > 1) {
          growl.addWarnMessage('We can only handle one file at a time!');
          return false;
        }

        $scope.upload = $upload.upload({
          url: 'api',
          file: $files
        }).progress(function (event) {
          console.log('percent: ' + parseInt(100.0 * event.loaded / event.total));
        }).success(function (data) {
          $scope.bills.push(data);
        }).error( function (data) {
          angular.forEach(data.messages, 
            function (message) {
              growl.addErrorMessage(message.text);
            });
          console.error(data);
        });
      };

      $scope.clearUpload = function () {
        //Clear bill object
        $scope.bill = null;

        //Clear file input
        var input = $($scope.input);
        input.replaceWith(input = input.clone(true));
        $scope.input = null;
      };

    }]);