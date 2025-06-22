
import '../broker/subscribre.ts'
import {fastify} from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod'


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {origin: '*'})

app.get('/health', (req, res) =>{
    return 'OK'
})


app.listen({host: '0.0.0.0', port:3335}).then(()=>{
    console.log('[Invoices]  HTTP Server running!')
})