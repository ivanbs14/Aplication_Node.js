/* criando uma tabela Tags */
exports.up = Knex => Knex.schema.createTable("movie_tags", table => {
    table.increments("id");
    table.text("name").notNullable();

    table.integer("note_id").references("id").inTable("movie_notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");

});

/*  */
exports.down = Knex => Knex.schema.dropTable("movie_tags");
