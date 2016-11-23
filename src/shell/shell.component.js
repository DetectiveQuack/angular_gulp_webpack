(function () {
    'use strict';

    angular.module('app')
        .component('shell', {
            template: '<h1>shell</h1> <div ui-view></div>'
        });
})();