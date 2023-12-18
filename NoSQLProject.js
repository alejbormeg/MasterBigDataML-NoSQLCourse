
// Ejercicio 1
db.movies.find()

// Ejercicio 2
db.movies.count()

// Ejercicio 3
var movie = {
	"title" : "El silencio de los corderos",
	"year" : 1991,
	"cast" : ["Anthony Hopkins", "Jodie Foster"],
	"genres" : ["Terror", "Crimen"]
}
db.movies.insertOne(movie)
db.movies.find({title: "El silencio de los corderos"})

// Ejercicio 4
var movie_to_delete = {
	"title" : "El silencio de los corderos",
	"year" : 1991,
	"cast" : ["Anthony Hopkins", "Jodie Foster"],
	"genres" : ["Terror", "Crimen"]
}
db.movies.deleteOne(movie_to_delete)
db.movies.find({title: "El silencio de los corderos"})

// Ejercicio 5
var query_exercise_5 = { "cast": "and" }
db.movies.count(query_exercise_5)
db.movies.find(query_exercise_5)

// Ejercicio 6
var query_exercise_6 = { "cast": "and" }
var action = { $pull: { "cast": "and" } }
db.movies.updateMany(
  query_exercise_6,
  action
)
db.movies.find(query_exercise_6)

// Ejercicio 7
var query_exercise_7_1 = { "cast": { $exists: true } }
var query_exercise_7_2 = { "cast": { $size: 0 }}
var query_exercise_7 = { $and: [query_exercise_7_1, query_exercise_7_2]}
db.movies.count(query_exercise_7)

// Ejercicio 8
var query_exercise_8_1 = { "cast": { $exists: true } }
var query_exercise_8_2 = { "cast": { $size: 0 }}
var query_exercise_8 = { $and: [query_exercise_8_1, query_exercise_8_2]}
var action = { $push: { "cast": "Undefined" } }
db.movies.updateMany(query_exercise_8, action)
db.movies.find({cast: "Undefined"})

// Ejercicio 9
var query_exercise_9_1 = { "genres": { $exists: true } }
var query_exercise_9_2 = { "genres": { $size: 0 }}
var query_exercise_9 = { $and: [query_exercise_9_1, query_exercise_9_2]}
db.movies.count(query_exercise_9)

// Ejercicio 10
var query_exercise_10_1 = { "genres": { $exists: true } }
var query_exercise_10_2 = { "genres": { $size: 0 }}
var query_exercise_10 = { $and: [query_exercise_10_1, query_exercise_10_2]}
var action = { $push: { "genres": "Undefined" } }
db.movies.updateMany(query_exercise_8, action)
db.movies.find({genres: "Undefined"})

//Ejercicio11
db.movies.find({}, {year: true, _id:false})
.sort({year: -1})
.limit(1)

//Ejercicio 12
var maxYearDocument = db.movies.find({}, { year: true, _id: false }).sort({ year: -1 }).limit(1)
var maxYear
maxYearDocument.forEach(function (doc) {
    maxYear = doc.year;
})
var minYear = maxYear - 20
var query_1 = {"year": { $gt: minYear}}
var query_2 = {"year": { $lte: maxYear}}
var query_3 = {$and: [query_1, query_2]}

db.movies.aggregate([
    {$match: query_3},
    {$group: {_id: null, total: { $sum: 1 }}
    }])

// Ejercicio 13
var query_1 = {"year": { $gte: 1960}}
var query_2 = {"year": { $lte: 1969}}
var query_3 = {$and: [query_1, query_2]}

db.movies.aggregate([
    {$match: query_3},
    {$group: {_id: null, total: { $sum: 1 }}
    }])
    
// Ejercicio 14
db.movies.aggregate([
    { $group: { _id: "$year", totalFilms: { $sum: 1 } } },
    { $group: { _id: "$totalFilms", years: { $push: "$_id" } }},
    { $sort: { _id: -1 } },
    { $limit: 1},
    { 
        $unwind: "$years" 
    },
    {
        $replaceRoot: {
            newRoot: {
                _id: "$years",
                pelis: "$_id"
            }
        }
    },
    {$sort: { _id: -1 }}
]);

//Ejercicio 15
db.movies.aggregate([
    { $group: { _id: "$year", totalFilms: { $sum: 1 } } },
    { $group: { _id: "$totalFilms", years: { $push: "$_id" } }},
    { $sort: { _id: 1 } },
    { $limit: 1},
    { 
        $unwind: "$years" 
    },
    {
        $replaceRoot: {
            newRoot: {
                _id: "$years",
                pelis: "$_id"
            }
        }
    },
    {$sort: { _id: -1 }}
]);

//Ejercicio 16
db.movies.aggregate([
    { $unwind: "$cast" },
    { $project: {"_id": false}},
    { $out: "actors"}
]);

db.actors.count()

//Ejercicio 17
db.actors.aggregate([
    { $match: { cast: { $ne: "Undefined" } } },
    { $group: { _id: "$cast", cuenta: { $sum: 1 } } },
    { $sort: { cuenta: -1 } },
    { $limit: 5 }
]);

// Ejercicio 18
db.actors.aggregate([
    { $match: { cast: { $ne: "Undefined" } } },
    { $group: { _id: { title: "$title", year:"$year"}, cuenta: { $sum: 1 } } },
    { $sort: { cuenta: -1 } },
    { $limit: 5 }
]);

// Ejercicio 19
db.actors.aggregate([
    {$match: { cast: { $ne: "Undefined" } }},
    {$group: { _id: "$cast", years: { $push: "$year" }}},
    {
        $project: {
            comienza: { $min: "$years" },
            termina: { $max: "$years" },
            anos: { $subtract: [{ $max: "$years" }, { $min: "$years" }] }
        }
    },
    { $sort: { anos: -1 } },
    { $limit: 5 }
]);

// Ejercicio 20
db.actors.aggregate([
    { $unwind: "$genres" },
    { $project: {"_id": false}},
    { $out: "genres"}
]);

db.genres.count()

// Ejercicio 21
db.genres.aggregate([
    { $match: { genres: { $ne: "Undefined" } } },
    { $group: { _id: { year: "$year", genre: "$genres" }, uniqueTitles: { $addToSet: "$title" } } },
    { $project: { pelis: { $size: "$uniqueTitles" } } },
    { $sort: { pelis: -1 } },
    { $limit: 5 }
   ]);

// Ejercicio 22
db.genres.aggregate([
    { $match: { cast: { $ne: "Undefined" } } },
    { $match: { genres: { $ne: "Undefined" } } },
    { $group: { _id: "$cast", generos: { $addToSet: "$genres" } } },
    { $project: { numgeneros: { $size: "$generos" }, generos: 1 } },
    {$sort: { numgeneros: -1}},
    {$limit: 5}
]);

// Ejercicio 23
db.genres.aggregate([
{ $match: { genres: { $ne: "Undefined" } } },
{ $group: { _id: { year: "$year", title: "$title" }, generos: { $addToSet: "$genres" } } },
{ $project: { numgeneros: { $size: "$generos" }, generos: true } },
{ $sort: { numgeneros: -1 } },
{ $limit: 5 }
]);

// Ejercicio 24
db.genres.aggregate([
    { $match: { genres: "Drama", cast: { $ne: "Undefined" } } },
    { $group: { _id: "$cast", peliculas: { $addToSet: "$title" } } },
    { $project: { numpeliculas: { $size: "$peliculas" }, peliculas: 1 } },
    { $sort: { numpeliculas: -1} },
    { $limit: 3 }
   ]);
   
// Ejercicio 25
db.genres.aggregate([
  { $match: { genres: { $ne: "Undefined" } } },
  { $group: { _id: { genre: "$genres", year: "$year" }, peliculas: { $addToSet: "$title" } } },
  { $project: { numpeliculas: { $size: "$peliculas" }}},
  { $sort: { numpeliculas: -1 } },
  { $group: { _id: "$_id.genre", anoModa: { $first: "$_id.year" }, numPelisModa: { $first: "$numpeliculas" } } },
  { $project: { _id: 0, genre: "$_id", anoModa: 1, numPelisModa: 1 } },
  { $sort: { numPelisModa: -1 } }
])

// Ejercicio 26
db.genres.aggregate([
    { $match: { genres: { $ne: "Undefined" } } },
    { $group: { _id: { year: "$year", title: "$title" }, uniqueGenres: { $addToSet: "$genres" } } },
    { $group: { _id: "$_id.year", totalMovies: { $sum: 1 }, totalGenres: { $sum: { $size: "$uniqueGenres" } } } },
    { $project: { _id: 0, year: "$_id", promedioGenresPerMovie: { $divide: ["$totalGenres", "$totalMovies"] } } },
    { $sort: { promedioGenresPerMovie: -1 } },
    { $limit: 5 }
])
