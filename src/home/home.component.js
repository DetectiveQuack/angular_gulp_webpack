(function () {
    'use strict';

    // Usage:
    // Babel/webpack,es7
    // Creates:
    // 

    angular.module('app')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state({
                name: 'home',
                url: '/home',
                component: 'home'
            });
        }])
        .component('home', {
            template: '<div class="b">home</div>',
            //templateUrl: 'templateUrl',
            controller: HomeController
        });

    HomeController.$inject = [];
    function HomeController() {
        var $ctrl = this;

        ////////////////

        $ctrl.$onInit = function () {
            const x = 'hello';

            let test = function* () {
                let [x, y] = yield new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(['hello', 'bye'])
                    }, 1000);
                });

                return [x, y];
            };

            test().next().value.then(function ([x, y]) { console.log(x, y) });
        };

        $ctrl.$onChanges = function (changesObj) { };
        $ctrl.$onDestroy = function () { };
    }
})();