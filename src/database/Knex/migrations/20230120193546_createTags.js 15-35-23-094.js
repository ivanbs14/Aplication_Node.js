/* criando uma tabela Tags */
exports.up = Knex => Knex.schema.createTable("movie_tags", table => {
    table.increments("id");
    
    table.integer("movie_notes_id").references("id").inTable("movie_notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    
    table.text("name").notNullable();

});

/*  */
exports.down = Knex => Knex.schema.dropTable("movie_tags");
