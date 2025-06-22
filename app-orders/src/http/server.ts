import {fastify} from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { db } from '../db/client.ts'
import { schema } from '../db/schema/index.ts'
import { sendOrderCreated } from '../broker/messages/order-created.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {origin: '*'})

app.get('/health', (req, res) =>{
    return 'OK'
})

app.post('/orders', {
    schema:{
        body: z.object({
            amount: z.coerce.number(),
        })
    }
}, async (req, res)=>{
    const { amount } = req.body
    console.log('Creating an order with amount', amount)

    const orderId = randomUUID()

    sendOrderCreated({
        orderId,
        amount,
        customer:{
            id: '3c142a99-c5ed-428b-86d7-34984f2eaadc'
        }
    })
   

    await db.insert(schema.orders).values({
        id: randomUUID(),
        customerId: '3c142a99-c5ed-428b-86d7-34984f2eaadc',
        amount,
    })

    return res.status(201).send()
})

app.listen({host: '0.0.0.0', port:3334}).then(()=>{
    console.log('[Orders]  HTTP Server running!')
})