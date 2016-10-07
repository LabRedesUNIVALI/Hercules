'use strict';

const create = 'CREATE';
const view = 'VIEW';
const update = 'UPDATE';
const remove = 'REMOVE';

const decide = function (user, action, entity, cb) {

    switch (action) {
        case create:
            // Every authenticated user can create an question
            return cb(null, true);
            break;
        case view:
            if (user._id.toString() === entity.user.toString()) {
                return cb(null, true);
            }

            return cb(null, false);
            break;
        case update:
        case remove:
            if (user._id.toString() === entity.user.toString()) {
                return cb(null, true);
            }

            return cb(null, false);
            break;
    }
};

module.exports.decide = decide;
