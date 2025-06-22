import { pgTable, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const orderStatus = pgEnum("order_status", ['pending', 'paid', 'canceled'])


export const orders = pgTable("orders", {
	id: text().primaryKey().notNull(),
	customerId: text("customer_id").notNull(),
	amount: integer().notNull(),
	status: orderStatus().default('pending').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});
