angular.module('uslmTest.controllers', [])
  .controller('AppController', ['$scope',
    function ($scope) {

    }])
  .controller('DownloadController', ['$scope', '$upload', 'growl',
    function ($scope, $upload, growl) {

      $scope.uploadForm = {};

      $scope.onFileSelect = function ($files) {
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
          $scope.bill = data;
        }).error( function (data) {
          growl.addWarnMessage('Error: ' + data);
        });
      };

      $scope.clearUpload = function () {
        console.log("Clearing %o", $scope.uploadForm);
        $scope.bill = null;
        $scope.uploadForm.$setPristine();
      };

    }]);