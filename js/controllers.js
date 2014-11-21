angular.module('uslmTest.controllers', [])
  .controller('AppController', ['$scope',
    function ($scope) {
      $scope.keyCapture = function ($event) {
        if($event.altKey && $event.keyCode === 9){
          $event.preventDefault();
          $scope.$broadcast('changeTab');
        }

        if($event.altKey && $event.keyCode === 87){
          $event.preventDefault();
          $scope.$broadcast('closeTab');
        }
      };
    }])
  .controller('DownloadController', ['$scope', '$upload', 'growl',
    function ($scope, $upload, growl) {

      $scope.uploadForm = {};
      $scope.errors = [];
      $scope.bills = [];

      $scope.$on('changeTab', function () {
        var index = $scope.bills.indexOf($scope.active());

        if(undefined === $scope.bills[index+1]){
          $scope.bills[index].active = false;
          $scope.bills[0].active = true;
        }else{
          $scope.bills[index].active = false;
          $scope.bills[index + 1].active = true; 
        }
      });

      $scope.$on('closeTab', function () {
        $scope.closeTab($scope.active());
      });

      $scope.onFileSelect = function ($files, $event) {
        $scope.input = $event.target;

        angular.forEach($files, function (file) {
          $scope.upload = $upload.upload({
            url: 'api',
            file: file
          }).progress(function (event) {
            //console.log('percent: ' + parseInt(100.0 * event.loaded / event.total));
          }).success(function (data) {
            $scope.bills.push(data);
          }).error( function (data) {
            if(data.messages){
              angular.forEach(data.messages, 
              function (message) {
                growl.addErrorMessage(message.text);
                $scope.errors.push({'text': message.text, 'file': file.name});
              });
            }else{
              growl.addErrorMessage("Unknown error.  Check console for details.");
            }
            
            console.error(data);
          });
        });
      };

      $scope.active = function () {
        return $scope.bills.filter(function (bill) {
          return bill.active;
        })[0];
      };

      $scope.clearUpload = function () {
        //Clear bill object
        $scope.bill = null;

        //Clear file input
        var input = $($scope.input);
        input.replaceWith(input = input.clone(true));
        $scope.input = null;
      };

      $scope.closeTab = function (bill) {
        var index = $scope.bills.indexOf(bill);

        if($scope.bills.length > 1){
          if(undefined !== $scope.bills[index + 1]){
            $scope.bills[index].active = false;
            $scope.bills[index + 1].active = true;
          }else{
            $scope.bills[0].active = true;
          }
        }

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