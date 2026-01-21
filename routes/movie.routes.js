const movieController = require("../controller/movie.controller");

const routes = (app) => {
  //routes function takes express app object as parameter
  app.post("/mba/api/v1/movies", movieController.createMovie);

  app.delete("/mba/api/v1/movies/:movieId", movieController.deleteMovie);

  app.get("/mba/api/v1/movies/:id", movieController.getMovie);
};

module.exports = routes;
