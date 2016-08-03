'use strict';

angular.module('confusionApp')

   .constant("baseURL","http://localhost:3000/")

      .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
                this.getPromotion = function(){
                    return $resource(baseURL+"promotions/:id",null);
                   
                };
    
                this.getDishes = function(){
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                    
                };
                       
        }])


//..................corporateFactory STARTS HERE...................

.factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
     var corpfac = {};
 
    
    corpfac.getLeaders = function(){
        return $resource(baseURL+"leadership/:id",null);

    };
    
    return corpfac;
}])





.service('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
               
    
                this.getFeedBack = function(){
                    return $resource(baseURL+"feedback/:id",null);
                    
                };
                       
        }])


;
