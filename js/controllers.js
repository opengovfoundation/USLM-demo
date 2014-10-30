angular.module('uslmTest.controllers', [])
  .controller('AppController', ['$scope',
    function ($scope) {

    }])
  .controller('DownloadController', ['$scope', '$upload', 'growl',
    function ($scope, $upload, growl) {

      $scope.uploadForm = {};
      $scope.bills = [];
      $scope.errors = [];

      $scope.onFileSelect = function ($files, $event) {
        $scope.input = $event.target;

        angular.forEach($files, function (file) {
          $scope.upload = $upload.upload({
            url: 'api',
            file: file
          }).progress(function (event) {
            console.log('percent: ' + parseInt(100.0 * event.loaded / event.total));
          }).success(function (data) {
            $scope.bills.push(data);
          }).error( function (data) {
            angular.forEach(data.messages, 
              function (message) {
                growl.addErrorMessage(message.text);
                $scope.errors.push({'text': message.text, 'file': file.name});
              });
            console.error(data);
          });
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

      $scope.close = function (bill) {
        var index = $scope.bills.indexOf(bill);
        $scope.bills.splice(index, 1);
      };

      $scope.clearErrors = function () {
        $scope.errors.splice(0, $scope.errors.length);
        
        if ($scope.bills.length > 0) {
          $scope.bills[0].active = true;
        }
      };

      $scope.closeTabs = function () {
        $scope.bills = [];
        $scope.errors = [];
      };

    }]);