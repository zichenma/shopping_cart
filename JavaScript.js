var myApp = angular.module("myModule", [])
   .controller("CartControler", function ($scope) {
       var books = [
        {
            title: 'Absolute Java',
            qty: 1, price: 114.95
        },
        {
            title: 'Pro HTML5',
            qty: 1, price: 27.95
        },
        {
            title: 'Head First HTML5',
            qty: 1, price: 27.89
        }
       ];
       //set the Main Function :load function related to ng-init in HTML, make sure to load this function first when window loaded. If the local storage is empety, using the book object data, if not using the local storage data.
       $scope.load = function () {
           if (window.localStorage.getItem("ma_cart") === null) {
               $scope.books = books;
           } else {
               $scope.books = JSON.parse(window.localStorage["ma_cart"]);
           }
       };


       $scope.removeBook = function (index) {
           $scope.books.splice(index, 1);
       };

      
       $scope.addItem = function () {
           $scope.books.push(
               {
                   title: 'New Book', qty: 1, price: 10.99
               });
           //only for indicating, when clicking button set indicating content to visible.
           document.getElementById("indicator").style.visibility = "visible";
       };
       //Book data is stored into local strorage and set the key to ma_cart
       $scope.storeData = function () {
           if (window.localStorage.getItem("ma_cart") === null) {
               window.localStorage.setItem("ma_cart", JSON.stringify($scope.books));
           }
           else {
               window.localStorage.clear();
               window.localStorage.setItem("ma_cart", JSON.stringify($scope.books));
           }
          
         
       }
    //using angular forEach function to loop through all book valuse and then calculate the total value round to 2 digits after point.
       $scope.update = function () {
           $scope.total = 0;
           angular.forEach($scope.books, function (key) {
               $scope.total += key.price * key.qty;
           })
           $scope.total = $scope.total.toFixed(2);
       }
    //set the watch feature, when to watch the book object updates 

       $scope.$watch('books', function () {
           $scope.update();
       },true);

  // for indicating purpose: show the data source.
       $scope.readDataSource = function () {
           if (window.localStorage.getItem("ma_cart") === null) {
               document.getElementById("dataSource").innerHTML = "The data is from Book Object!";
           } else {
               document.getElementById("dataSource").innerHTML = "The data is from local storage!";
           }
       }
       // for indicating purpose: clear the local data storage.
       $scope.clearDataSource = function () {

           window.localStorage.clear();
           alert("Data is deleted from local storage!")
       }
   });
