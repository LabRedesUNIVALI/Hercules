'use strict';

function shuffleTest(test, cb) {

    let temporary, current;
    let questionLength = test.questions.length;

    if (questionLength) while (--questionLength) {
        current = Math.floor(Math.random() * (questionLength + 1));
        temporary = test.questions[current];

        let _temporary, _current;
        let _optionsLength = temporary.options.length;

        if (_optionsLength) while (--_optionsLength) {
            _current = Math.floor(Math.random() * (_optionsLength + 1));
            _temporary = temporary.options[_current];

            temporary.options[_current] = temporary.options[_optionsLength];
            temporary.options[_optionsLength] = _temporary;
        }

        test.questions[current] = test.questions[questionLength];
        test.questions[questionLength] = temporary;
    }

    // Logic to guarantee the first result from array will be shuffled the options
    let _temporary, _current;
    let _optionsLength = test.questions[0].options.length;

    if (_optionsLength) while (--_optionsLength) {
        _current = Math.floor(Math.random() * (_optionsLength + 1));
        _temporary = test.questions[0].options[_current];

        test.questions[0].options[_current] = test.questions[0].options[_optionsLength];
        test.questions[0].options[_optionsLength] = _temporary;
    }

    return cb(null, test);
}

module.exports = {
    shuffleTest: shuffleTest,
};
