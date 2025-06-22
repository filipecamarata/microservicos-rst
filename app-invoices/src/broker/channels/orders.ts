import {ConnectBroker } from '../broker.ts'

const broker = await ConnectBroker()

export const orders = await broker.createChannel()

await orders.assertQueue('orders')