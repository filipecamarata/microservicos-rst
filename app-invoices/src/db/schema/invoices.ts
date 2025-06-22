import { pgTable, text, timestamp } from "drizzle-orm/pg-core"


export const invoices = pgTable('invoices', {
    id: text().primaryKey(),
    ordersId: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
})