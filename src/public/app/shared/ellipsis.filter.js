(function () {

    'use strict';

    /**
     * ellipsis - Filter to append an ellipsis to a string
     */
    function ellipsis () {

        return function (input, size) {
            if (input.length <= size) return input;
            var output = input.substring(0, size || 2) + '...';
            return output;
        };

    };

    angular.module('hercules.filters')
        .filter('ellipsis', ellipsis);

})();
