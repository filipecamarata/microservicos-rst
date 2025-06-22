import { pgTable, text, date } from "drizzle-orm/pg-core"

export const customers = pgTable('customers', {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),    
    adress: text().notNull(),
    state: text().notNull(),    
    zipcode: text().notNull(),
    country: text().notNull(),    
    dataOfBith: date({ mode: 'date'}),    
})