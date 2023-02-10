/* imports */
const knex = require("../database/Knex");

class TagsController {
    async index(request, response) {
        const user_id = request.user.id;

        const tags = await knex("movie_tags")
        .where({ user_id })

        return response.json(tags);
    }

}

module.exports = TagsController;