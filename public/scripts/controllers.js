'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            

            $scope.showMenu = false;
            $scope.message = "Loading ...";
                
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
            
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
         
            
            
             $scope.sendFeedback = function () {
                 
                     console.log($scope.feedback);
                 
                    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                        $scope.invalidChannelSelection = true;
                        console.log('incorrect');
                    }
                    else {                        
                        /*saving the feedback object here */
                            feedbackFactory.getFeedBack().save( $scope.feedback )
                              .$promise.then(
                                    function(response){
                                        console.log("saved feedback successfully"+response);
                                    },
                                    function(response) {
                                        $scope.message = "Error: "+response.status + " " + response.statusText;
                                        console.log("error.."+$scope.message);
                                    }
                                );
                        
                        /*making the form fields empty and then set it to pristine here */
                        
                        $scope.invalidChannelSelection = false;
                        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        $scope.feedback.mychannel="";
                        $scope.feedbackForm.$setPristine();
                        console.log($scope.feedback);
                    }
                 
                 
                 
                  
                   
                };
            
            
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
        }])


        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
           
                $scope.submitComment = function () {
                    $scope.mycomment.date = new Date().toISOString();
                    console.log($scope.mycomment);
                    $scope.dish.comments.push($scope.mycomment);

                    menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                    $scope.commentForm.$setPristine();
                    $scope.mycomment = {rating:5, comment:"", author:"", date:""};
                };
            
        
            
        }])

      

.controller('IndexController', ['$scope','menuFactory','corporateFactory',  
                                function($scope,menuFactory,corporateFactory) {
            
                                    
            $scope.showDish = false;
            $scope.message="Loading ...";

            $scope.dish = menuFactory.getDishes().get({id:1})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

                                   
            $scope.showbuffet = false;
            $scope.promo_buffet = menuFactory.getPromotion().get({id:0})
            .$promise.then(
                function(response){
                    $scope.promo_buffet = response;
                    $scope.showbuffet = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

                                    
            //    note the corporateFactory below
                                     
            $scope.showleader = false;
            $scope.promo_Leader = corporateFactory.getLeaders().get({id:2})
            .$promise.then(
                function(response){
                    $scope.promo_Leader = response;
                    $scope.showleader = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            
        }])


.controller('AboutController', ['$scope','corporateFactory',  
                                function($scope,corporateFactory) {
            
                                    
                $scope.showleader = false;
             
                corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showleader = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
                                  
          
        }])

;
