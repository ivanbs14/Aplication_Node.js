const Knex = require("../database/Knex");

class NotesController {
    /* funçao create nota Consultar DocQbuild */
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const user_id = request.user.id;

        /* inserindo a nota */
        const note_id = await Knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        /* tagsInsert, que vai percorrer cada tag existente */
        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await Knex("movie_tags").insert(tagsInsert);

        return response.json();

    }

    /* funçao show Consultar DocQbuild */
    async show(request, response) {
        const { id } = request.params;

        const note = await Knex("movie_notes").where( {id} ).first();
        const tags = await Knex("movie_tags").where( { note_id:  id }).orderBy("name");
        /* const links = await Knex("links").where( { note_id: id }).orderBy("created_at"); */


        return response.json({
            ...note,
            tags,
        });
    }

    /* funçao delete nota Consultar DocQbuild */
    async delete(request, response) {
        const { id } = request.params;

        await Knex("movie_notes").where({ id }).delete();

        return response.json();
    }

    /* funçao receber dados, aplicar filtros de notas e tags */
    async index(request, response) {
        const { title, tags } = request.query;

        const user_id = request.user.id;

        let notes;

        if (tags) {
            /* convertendo texto simples para vetor */
            const filterTags = tags.split(',').map(tag => tag.trim());

            notes = await Knex("movie_tags")
                .select([
                    "movie_notes.id",
                    "movie_notes.title",
                    "movie_notes.user_id",
                ])
                .where("movie_notes.user_id", "=", user_id)
                .whereLike("movie_notes.title", `%${title}%`)
                .whereIn("name", filterTags)
                .innerJoin("movie_notes", "movie_notes.id", "tags.note_id")
                .orderBy("movie_notes.title")

        } else {
            notes = await Knex("movie_notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title");
        }

        const userTags = await Knex("movie_tags").where({ user_id });
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        });

        return response.json(notesWithTags);
    }
}

module.exports = NotesController;