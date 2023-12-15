import Joi from "joi";

export const updateProductInCartSchema = Joi.object({
    quantity: Joi.number().required()
})

export const updateFullCartSchema = Joi.object({
    products: Joi.array().items(Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().required()
    })

    )
})

export const getCartByIdSchema = Joi.object({
    cid: Joi.string().required()
    })

export const productCartSchema = Joi.object({
        cid: Joi.string().required(),
        pid: Joi.string().required()
        })
    