/* criando uma tabela notes */
exports.up = Knex => Knex.schema.createTable("movie_notes", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.int("rating");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(Knex.fn.now());
    table.timestamp("update_at").default(Knex.fn.now());

});

/*  */
exports.down = Knex => Knex.schema.dropTable("movie_notes");
