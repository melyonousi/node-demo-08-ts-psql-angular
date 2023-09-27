import { z } from 'zod'

export const createNoteSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: 'must be greater than 1 character!' }),
        description: z.string().min(10, { message: 'must be greater than 10 character!' }),
    }).required()
})

export const updateNoteSchema = z.object({
    params: z.object({ id: z.string() }),
    body: z.object({
        name: z.string().min(1, { message: 'must be greater than 1 character!' }),
        description: z.string().min(10, { message: 'must be greater than 10 character!' }),
    }).partial()
})