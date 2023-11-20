# Proyecto Final NoSQL: Ejercicios MongoDB

## Máster Big Data, Data Science & Inteligencia Artificial

### Proyecto realizado por: Alejandro Borrego Megías
### Fecha: 17 de Noviembre de 2023
### Correo: alejbormeg@gmail.com

---

## Índice
- [Introducción a MongoDB](#introducción-a-mongodb)
- [Prerrequisitos](#prerrequisitos)
- [Clientes Utilizados](#clientes-utilizados)
- [Ejercicios](#ejercicios)

---

## Introducción a MongoDB

MongoDB es un sistema de gestión de bases de datos NoSQL que se ha vuelto ampliamente popular en el ámbito del desarrollo de aplicaciones modernas. A diferencia de las bases de datos relacionales tradicionales, MongoDB utiliza un modelo de datos flexible basado en documentos JSON, lo que permite una escalabilidad horizontal eficiente y una fácil adaptación a los cambios en los esquemas de datos.

## Prerrequisitos

Antes de comenzar con este proyecto, es necesario instalar MongoDB como un servicio de red en su máquina local con sistema operativo Windows. A continuación, se proporcionan los pasos para realizar la instalación:

1. **Descargar MongoDB:**
   Acceda al [sitio web oficial de MongoDB](https://www.mongodb.com/try/download/community) y descargue la versión Community de MongoDB para Windows.

2. **Instalación:**
   Siga las instrucciones de instalación proporcionadas durante el proceso de instalación. Asegúrese de seleccionar la opción para instalar MongoDB como un servicio de red.

3. **Configuración:**
   Después de la instalación, es posible que necesite configurar algunas opciones según sus preferencias. Asegúrese de que el servicio de MongoDB esté iniciado y en ejecución.

## Clientes Utilizados

En este proyecto, se utilizarán dos clientes populares para interactuar con la base de datos MongoDB: Compass y NoSQLBoosterForMongoDB.

1. **MongoDB Compass:**
   Compass es una interfaz gráfica de usuario que facilita la exploración y manipulación de datos en MongoDB. Proporciona herramientas visuales intuitivas para realizar consultas, analizar el rendimiento y diseñar esquemas de datos.

2. **NoSQLBoosterForMongoDB:**
   NoSQLBooster es otra herramienta poderosa para trabajar con MongoDB. Ofrece características avanzadas como autocompletar consultas, un editor de consultas integrado y una interfaz de usuario amigable que agiliza el desarrollo y la administración de bases de datos MongoDB.

## Ejercicios

A continuación, se presentan los ejercicios que explorarán las capacidades de MongoDB en el contexto de NoSQL. Para el primero usaremos el Cliente *MongoDB Compass* y para el resto de ejercicios el cliente *NoSQLBoosterForMongoDB* por tener una interfaz más amigable para las consultas.

0. **Realizar la importación del json en una colección llamada *“movies”***

   El Dataset usado para este ejercicio se encuentra en la carpeta `./Database` en formato `.json`. Para importar el *Dataset* usamos el cliente MongoDB Compass: 

   ![Dataset Importado](./images/exercise0.png)

   Como podemos observar se ha importado correctamente.

1. **Analizar con find la colección.**

   La query de este ejercicio es la siguiente:

   ```Javascript
   // Ejercicio 1
   db.movies.find()
   ```

   Con ella podemos ver como en total se han insertado 28795 Documentos en la colección *movies*. Además, vemos como el JSON que representa dichos documentos presenta la siguiente estructura (mostramos el primer ejemplo de la colección): 

   ```JSON
   {
      "_id" : ObjectId("6559fc53d1d8f923644f1f3e"),
      "title" : "Caught",
      "year" : 1900,
      "cast" : [ ],
      "genres" : [ ]
   },
   ```

   Vemos que tiene las siguientes propiedades:
   - *title*: es de tipo *string* representando el título de la película.
   - *year*: es de tipo *int32* y representa el año de estreno de la película.
   - *cast: es de tipo *array* y aunque está vacío se deduce que se incluirán aquí los actores que conforman el casting de la película y quizá información relativa a ellos.
   - *generes*: es de tipo *array* y de nuevo en este ejemplo está vacío, pero representará los géneros cinematográficos a los que pertenece dicha película.

   A continuación se muestra una captura de pantalla con el resultado obtenido: 

   ![Query 1](./images/exercise1.png)

2. **Contar cuántos documentos (películas) tiene cargado.**

   La query de este ejercicio es la siguiente:

   ```Javascript
   // Ejercicio 2
   db.movies.count()
   ```

   El resultado obtenido es que tiene un total de 28795 documentos la colección.

   A continuación se muestra una captura de pantalla con el resultado obtenido: 
   
   ![Query 2](./images/exercise2.png)

3. **Insertar una película.**
   La query de este ejercicio es la siguiente: 
   
   ```Javascript
   // Ejercicio 3
   var movie = {
      "title" : "El silencio de los corderos",
      "year" : 1991,
      "cast" : ["Anthony Hopkins", "Jodie Foster"],
      "genres" : ["Terror", "Crimen"]
   }
   db.movies.insertOne(movie)
   ```
   El resultado de que se ha insertado correctamente lo podemos ver en la siguiente captura de pantalla:
   ![Query 3](./images/exercise3.png)

   Para comprobar que verdaderamente se ha insertado hacemos una query para buscarla: 
    ```Javascript
   db.movies.find({title: "El silencio de los corderos"})
   ```

   Obteniendo el siguiente resultado:

   ```JSON
   {
	"_id" : ObjectId("655a0a71f4080f974ab9192e"),
	"title" : "El silencio de los corderos",
	"year" : 1991,
	"cast" : [ "Anthony Hopkins", "Jodie Foster" ],
	"genres" : [ "Terror", "Crimen" ]
   }
   ```

   Podemos verlo también en la siguiente captura de pantalla:
   ![Query 3.1](./images/exercise3-1.png)

4. **Borrar la película insertada en el punto anterior (en el 3).**
   
   La query de este ejercicio es la siguiente:
   ```Javascript
   var movie_to_delete = {
      "title" : "El silencio de los corderos",
      "year" : 1991,
      "cast" : ["Anthony Hopkins", "Jodie Foster"],
      "genres" : ["Terror", "Crimen"]
   }
   db.movies.deleteOne(movie_to_delete)
   ```

   Podemos ver que se ha eliminado en la siguiente captura: 
   ![Query 4](./images/exercise4.png)

   Para comprobarlo, ejecutamos la siguiente query: 
    ```Javascript
   db.movies.find({title: "El silencio de los corderos"})
   ```

   Obteniendo el resultado de un *array* vacío `[]`. Se puede ver en la siguiente captura: 
   ![Query 4-1](./images/exercise4-1.png)

5. **Contar cuantas películas tienen actores (cast) que se llaman “and”. Estos nombres de actores están por ERROR**

   La query de este ejercicio es la siguiente:

   ```Javascript
   var query_exercise_5 = { "cast": "and" }
   db.movies.count(query_exercise_5)
   ```

   Con esta query estamos filtrando los documentos por aquellos que contienen al menos un "and" en el array del casting (cast) y haciendo un conteo de los documentos totales que cumplen esta condición, obteniendo un total de 93. Esto puede verse en la siguiente captura: 

   ![Query 5](./images/exercise5.png)

6. **Actualizar los documentos cuyo actor (cast) tenga por error el valor “and” como si realmente fuera un actor. Para ello, se debe sacar únicamente ese valor del array cast. Por lo tanto, no se debe eliminar ni el documento (película) ni su array cast con el resto de actores.**

   La query de este ejercicio es la siguiente:

   ```Javascript
   var query_exercise_6 = { "cast": "and" }
   var action = { $pull: { "cast": "and" } }
   db.movies.updateMany(
   query_exercise_6,
   action
   )
   ```

   En esta query, primero establecemos el criterio de la búsqueda con el primer parámetro de la función `updateMany` (en este caso los documentos que continenen "and" entre sus elementos del array *cast*). En segundo lugar, establecemos la operación a realizar (usamos la acción `$pull` de MongoDB para eliminar el valor "and" del array). Como vemos en la siguiente captura se han modificado los 93 valores anteriores.

   ![Query 6](./images/exercise6.png)

7. **Contar cuantos documentos (películas) tienen el array ‘cast’ vacío.**

   La query de este ejercicio es la siguiente: 

   ```Javascript
   var query_exercise_7_1 = { "cast": { $exists: true } }
   var query_exercise_7_2 = { "cast": { $size: 0 }}
   var query_exercise_7 = { $and: [query_exercise_7_1, query_exercise_7_2]}
   db.movies.count(query_exercise_7)
   ```
   Con esta query el resultado obtenido es de 986 documentos con el array vacío. Podemos ver el resultado en la siguiente captura:

   ![Query 7](./images/exercise7.png)

8. **Actualizar TODOS los documentos (películas) que tengan el array cast vacío, añadiendo un nuevo elemento dentro del array con valor Undefined. Cuidado! El tipo de cast debe seguir siendo un array. El array debe ser así -> ["Undefined" ].**

   La query de este ejercicio es la siguiente: 

   ```Javascript
   var query_exercise_8_1 = { "cast": { $exists: true } }
   var query_exercise_8_2 = { "cast": { $size: 0 }}
   var query_exercise_8 = { $and: [query_exercise_8_1, query_exercise_8_2]}
   var action = { $push: { "cast": "Undefined" } }
   db.movies.updateMany(query_exercise_8, action)
   db.movies.find({cast: "Undefined"})
   ```
   Con esta query el resultado obtenido es que se actualizan 986 documentos con el array vacío poniendo el valor "Undefined". Podemos ver el resultado en la siguiente captura:

   ![Query 8](./images/exercise8.png)

   Como se aprecia en la captura, se mantiene el tipo de dato array para *cast*.

9. **Contar cuantos documentos (películas) tienen el array genres vacío.**

   La query de este ejercicio es la siguiente: 

   ```Javascript
   var query_exercise_9_1 = { "genres": { $exists: true } }
   var query_exercise_9_2 = { "genres": { $size: 0 }}
   var query_exercise_9 = { $and: [query_exercise_9_1, query_exercise_9_2]}
   db.movies.count(query_exercise_9)
   ```
   Con esta query el resultado obtenido es de 901 documentos con el array vacío. Podemos ver el resultado en la siguiente captura:

   ![Query 9](./images/exercise9.png)

10. **Actualizar TODOS los documentos (películas) que tengan el array genres vacío, añadiendo un nuevo elemento dentro del array con valor Undefined. Cuidado! El tipo de genres debe seguir siendo un array.**

   La query de este ejercicio es la siguiente: 

   ```Javascript
   var query_exercise_10_1 = { "genres": { $exists: true } }
   var query_exercise_10_2 = { "genres": { $size: 0 }}
   var query_exercise_10 = { $and: [query_exercise_10_1, query_exercise_10_2]}
   var action = { $push: { "genres": "Undefined" } }
   db.movies.updateMany(query_exercise_10, action)
   db.movies.find({genres: "Undefined"})
   ```
   Con esta query el resultado obtenido es que se actualizan 901 documentos con el array vacío poniendo el valor "Undefined". Podemos ver el resultado en la siguiente captura:

   ![Query 10](./images/exercise10.png)

   Como se aprecia en la captura, se mantiene el tipo de dato array para *genres*.

11. **Mostrar el año más reciente / actual que tenemos sobre todas las películas**
   La query de este ejercicio es la siguiente: 

   ```Javascript
   db.movies.find({}, {year: true, _id:false})
   .sort({year: -1})
   .limit(1)
   ```
   En primer lugar obtenemos todos los documentos de la colección con el filtro `{}`, en segundo lugar aplicamos la proyección `{year: true, _id:false}` que hace que solo se muestre el campo año y además (porque se muestra siempre por defecto) eliminamos el campo `_id` para obtener un resultado como el pedido.

   Con esta query el resultado obtenido es el siguiente:
   ```JSON
   {
	"year" : 2018
   }
   ```
   Lo que indica que el año más reciente es 2018. A continuación se proporciona una captura de pantalla con la query y el resultado:
   ![Query 11](./images/exercise11.png)

12. **Contar cuántas películas han salido en los últimos 20 años. Debe hacerse desde el último año que se tienen registradas películas en la colección, mostrando el resultado total de esos años. Se debe hacer con el Framework de Agregación.**
   El código de este ejercicio es el siguiente: 

   ```Javascript
   var maxYearDocument = db.movies.find({}, { year: true, _id: false }).sort({ year: -1 }).limit(1)
   var maxYear
   maxYearDocument.forEach(function (doc) {
      maxYear = doc.year;
   })
   var minYear = maxYear - 20
   var query_1 = {"year": { $gte: minYear}}
   var query_2 = {"year": { $lte: maxYear}}
   var query_3 = {$and: [query_1, query_2]}

   db.movies.aggregate([
      {$match: query_3},
      {$group: {_id: 0, totalFilms: { $sum: 1 }}
      }])
   ```
   En este ejercicio, primero tratamos de calcular dinámicamente el año máximo de la base de datos, para ello realizamos la query del ejercicio anterior, y teniendo en cuenta que *javascript* devuelve un *promise* como resultado de la búsqueda, para acceder al valor necesitamos ejecutar un *foreach* para setear el valor de la variable que representa el año máximo. En segundo lugar seteamos la variable que representa el año mínimo de la búsqueda (20 años menos) y realizamos la agregación. En primer lugar hacemos un match de los documentos con la fecha comprendida entre los valores deseados y luego un agrupamiento de los mismos, mandamos todos los documentos al mismo grupo (`_id : 0`) y sumamos la cantidad total de documentos.

   Con esta query el resultado obtenido es el siguiente:
   ```JSON
   {
	"_id" : null,
	"totalFilms" : 5029
   }
   ```
   La captura de pantalla del ejercicio es esta:
   ![Query 12](./images/exercise12.png)

13. **Contar cuántas películas han salido en la década de los 60 (del 60 al 69 incluidos). Se debe hacer con el Framework de Agregación**
   El código de este ejercicio es el siguiente: 

   ```Javascript
   var query_1 = {"year": { $gte: 1960}}
   var query_2 = {"year": { $lte: 1969}}
   var query_3 = {$and: [query_1, query_2]}

   db.movies.aggregate([
      {$match: query_3},
      {$group: {_id: 0, totalFilms: { $sum: 1 }}
      }])
   ```
   En este realizamos algo similar al anterior, con la diferencia de que esta vez conocemos el rango de fechas sin necesidad de calcularlo dinámicamente. Por ello únicamente ejecutamos el pipeline de agregación anterior con el nuevo rango de fechas.

   Con esta query el resultado obtenido es el siguiente:
   ```JSON
   {
	"_id" : null,
	"totalFilms" : 1414
   }
   ```
   La captura de pantalla del ejercicio es esta:
   ![Query 12](./images/exercise12.png)