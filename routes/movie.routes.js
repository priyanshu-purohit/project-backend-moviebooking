const movieController = require("../controller/movie.controller");
const movieMiddleware = require("../middlewares/movie.middlewares");
const authMiddleware = require("../middlewares/auth.middlewares");

const routes = (app) => {
  //routes function takes express app object as parameter

  //CREATE
  app.post("/mba/api/v1/movies",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    movieMiddleware.validateMovieCreateRequest,
    movieController.createMovie
  );

  //DELETE
  app.delete("/mba/api/v1/movies/:movieId",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    movieController.deleteMovie
  );

  //READ
  app.get("/mba/api/v1/movies/:id",
    movieController.getMovie
  );

  //READ
  app.put("/mba/api/v1/movies/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    movieController.updateMovie
  );

  //UPDATE
  app.patch("/mba/api/v1/movies/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    movieController.updateMovie
  );
 
  //READ
  app.get("/mba/api/v1/movies", movieController.getMovies);
};

module.exports = routes;
