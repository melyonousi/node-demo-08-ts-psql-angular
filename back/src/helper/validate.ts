import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            })
            return next()
        } catch (err: any) {
            const error_message = JSON.parse(err.message)
            let errors: any = {}
            err.errors.forEach((ele: any) => {
                errors[ele.path[1]] = ele.message
            });
            return res.status(400).json({ errors, error_message })
        }
    }

export default validate