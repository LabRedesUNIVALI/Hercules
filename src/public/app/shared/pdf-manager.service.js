angular.module('hercules').service('hcPDFManager', [
    '$interpolate',
    '$templateCache',
    function ($interpolate, $templateCache) {

        this.testPreview = function (test) {

            var template = '<div style="font-family: sans-serif;">';

            var testTemplate = $templateCache.get('test-print-body.html');
            var questionTemplate = $templateCache.get('test-print-question.html');
            var optionTemplate = $templateCache.get('test-print-option.html');

            var testInterpolate = $interpolate(testTemplate);
            var questionInterpolate = $interpolate(questionTemplate);
            var optionInterpolate = $interpolate(optionTemplate);

            template += testInterpolate({ test: test });

            var letters = ['a', 'b', 'c', 'd', 'e'];

            test.questions.forEach(function (question, index) {

                template += questionInterpolate({ question: question, index: index + 1 });

                question.options.forEach(function (option, index) {
                    template += optionInterpolate({ option: option, letter: letters[index] });
                });

                template += '<br /><br />';

            });

            template += '</div>';

            var doc = new jsPDF();

            doc.fromHTML(template, 15, 15, {
                'width': 170
            });

            var fileName = test.name.toLowerCase().replace(/ /g, '_') + "_";
                fileName += new Date().getTime();
                fileName += '.pdf';

            doc.save(fileName);

        };

}]);
