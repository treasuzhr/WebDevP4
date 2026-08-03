const { pgTable, serial, varchar, integer } = require('drizzle-orm/pg-core');

const mahasiswaTable = pgTable('mahasiswa', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  nim: varchar('nim', { length: 20 }).notNull().unique(),
  umur: integer('umur').notNull(),
  jurusan: varchar('jurusan', { length: 100 }).notNull(),
});

module.exports = { mahasiswaTable };