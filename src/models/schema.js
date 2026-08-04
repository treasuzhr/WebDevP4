const { pgTable, serial, varchar, integer } = require('drizzle-orm/pg-core');

const mahasiswaTable = pgTable('mahasiswa', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  nim: varchar('nim', { length: 20 }).notNull().unique(),
  umur: integer('umur').notNull(),
  jurusan: varchar('jurusan', { length: 100 }).notNull(),
});

const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

module.exports = { mahasiswaTable, usersTable };