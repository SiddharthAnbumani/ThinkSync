const Joi = require('joi')
const {date} = require('joi')

module.exports.ValEntrySchema = Joi.object({
        title: Joi.string().min(4).required(),
        date: Joi.date().required(),
        content: Joi.string().required()
}).required()

