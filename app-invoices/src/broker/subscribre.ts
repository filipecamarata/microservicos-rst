import { orders } from "./channels/orders.ts"


orders.consume('orders', async menssage => {
    if(!menssage)return null


    console.log(menssage?.content.toString())
    orders.ack(menssage)
}, {
    noAck: false
})