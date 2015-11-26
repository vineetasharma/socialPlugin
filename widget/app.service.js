'use strict';

(function (angular, buildfire) {
    angular.module('socialPluginWidget')
        .provider('Buildfire', [function () {
            var Buildfire = this;
            Buildfire.$get = function () {
                return buildfire
            };
            return Buildfire;
        }])
        .factory("SocialDataStore", ['Buildfire', '$q', 'SERVER_URL', '$http', function (Buildfire, $q, SERVER_URL, $http) {
            return {
                createPost: function (postData) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    console.log('buildfire is: >>>>>', Buildfire.context);
                    postDataObject.id = '1';
                    postDataObject.method = 'thread/add';
                    postDataObject.params = postData || {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.secureToken = null;
                    postDataObject.params.userToken = 'ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=' || localStorage.getItem('user') && localStorage.getItem('user').userToken;
                    postDataObject.params.parentThreadId = '564f676cfbe10b9c240002ff' || Buildfire.context.appId + Buildfire.context.instanceId;
                    postDataObject.userToken = null;
                    console.log(postDataObject);
                    if(localStorage.getItem('user'))
                    postData.params.userToken = localStorage.getItem('user').userToken;
                    var successCallback = function (response) {
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link+'?data='+ JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    /*$http.get('http://social.kaleoapps.com/src/server.js?data={"id":1,"method":"thread/add","params":{"appId":"551ae57f94ed199c3400002e","parentThreadId":"564f676cfbe10b9c240002ff","userToken":"ouOUQF7Sbx9m1pkqkfSUrmfiyRip2YptbcEcEcoX170=","text":"testThread","title":"","imageUrl":null,"secureToken":null},"userToken":null}').then(successCallback, errorCallback);*/
                    return deferred.promise;
                },
                getPosts: function () {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'thread/findByPage';
                    postDataObject.params = {};
                    postDataObject.params.appId = '551ae57f94ed199c3400002e' || Buildfire.context.appId;
                    postDataObject.params.parentThreadId = '564f676cfbe10b9c240002ff' || Buildfire.context.appId + Buildfire.context.instanceId;
                    postDataObject.params.lastThreadId = null;
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link+'?data='+ JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                },
                getUsers: function (userIdsArray) {
                    var deferred = $q.defer();
                    var postDataObject = {};
                    postDataObject.id = '1';
                    postDataObject.method = 'users/getUsers';
                    postDataObject.params = {};
                    postDataObject.params.userIds = userIdsArray || [];
                    postDataObject.userToken = null;
                    var successCallback = function (response) {
                        return deferred.resolve(response);
                    };
                    var errorCallback = function (err) {
                        return deferred.reject(err);
                    };
                    $http({
                        method: 'GET',
                        url: SERVER_URL.link + '?data='+ JSON.stringify(postDataObject),
                        headers: {'Content-Type': 'application/json'}
                    }).then(successCallback, errorCallback);
                    return deferred.promise;
                }
            }
        }])
})(window.angular, window.buildfire);