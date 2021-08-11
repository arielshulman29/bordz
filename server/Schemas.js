const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) {
                    const msg = helpers.error('string.escapeHTML', { value });
                    res.status(404).json({ message: msg });
                }
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.boardSchema = Joi.object({
    board: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        brand: Joi.string().required().escapeHTML(),
        year: Joi.number().required().min(1960),
        length: Joi.string().required().escapeHTML(),
        volume: Joi.number().required().min(10).max(70),
        phone: Joi.string().regex(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|([71,72,73,74,75,76,77]{2}\d{7})|[5]{1}\d{8})$/).required(),
        sold: Joi.boolean().required,
        added: Joi.date().required()
    }).required(),
    deleteImages: Joi.array()
});
