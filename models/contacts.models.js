const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    first_name: {
        type : String
    },
    last_name: {
        type : String
    },
    email: {
        type : String
    },
    phone: {
        type : String
    },
    address: {
        type : String
    }
})

const contact = mongoose.model("Contact", contactSchema)


module.exports = contact;