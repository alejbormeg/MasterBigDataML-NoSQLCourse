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

