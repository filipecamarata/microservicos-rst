import { channels } from "../channels/index.ts"

import type {OrderCreatedMessage} from "../../../../contracts/messages/orders-created-messages.ts"

export function sendOrderCreated (data: OrderCreatedMessage){
     channels.orders.sendToQueue('orders', Buffer.from(JSON.stringify({data})))
}