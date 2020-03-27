'use strict';


const COLLECTION_NAME = 'messages';


function _addMessage(req, res, id, data, doc) {
    const _doc = doc._doc;
    const messages = _doc.messages;
    messages.push(data);

    const updateData = {
        messages: messages
    };

    req.db.findByIdAndUpdate(COLLECTION_NAME, id, updateData, function (err, data) {
        if (err) {
            throw new Error(err);
        } else {
            res.json(data._doc);
        }
    });
}

function createMessage(req, id, cb) {
    const message = {
        _id: id,
        messages: []
    };

    req.db.create(COLLECTION_NAME, message, cb);
}

module.exports = {
    getMessage: function (req, res) {
        const id = req.params.id;

        req.db.findById(COLLECTION_NAME, id, function (err, doc) {
            if (err || !doc) {
                if (!(!doc || err.name === "DocumentNotFoundError")) {
                    throw new Error({message: "There was an error getting the previous messages"}, res);
                } else {
                    createMessage(req, id, function (err, message) {
                        if (err) {
                            throw new Error({message: "There was an error getting the previous messages"}, res);
                        } else {
                            res.json(message._doc);
                        }
                    })
                }
            } else {
                res.json(doc._doc);
            }
        });
    },

    addMessage: function (req, res) {
        const message = req.body;
        const id = message.id;

        delete message.id;

        console.log("new message to " + id);

        req.db.findById(COLLECTION_NAME, id, function (err, doc) {
            if (err) {
                if (err.name !== "DocumentNotFoundError") {
                    throw new Error(err);
                }
                createMessage(req, id, function (err, msn) {
                    if (!err) {
                        _addMessage(req, res, id, message, msn);
                    } else {
                        throw new Error(err);
                    }
                })
            } else if (doc) {
                _addMessage(req, res, id, message, doc);
            } else {
                throw new Error(err);
            }
        });
    }

};
