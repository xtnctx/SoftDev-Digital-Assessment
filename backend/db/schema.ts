import { pgTable, serial, text, varchar, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable(
    "users",
    {
        id: serial("id").primaryKey(),

        name: varchar('name', { length: 64 }),

        email: varchar("email", { length: 255 }).notNull().unique(),

        password: text("password").notNull(),

        created_at: timestamp('created_at').defaultNow()
    }
);

export const todos = pgTable(
    "todos",
    {
        id: serial("id").primaryKey(),

        user_id: integer("user_id").references(() => users.id),

        title: text("title").notNull(),

        is_done: boolean("is_done").default(false),

        created_at: timestamp('created_at').defaultNow()
    }
);
