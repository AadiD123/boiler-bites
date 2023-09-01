const fetch = require('node-fetch');
const mysql = require('mysql');

async function hasPig(ingredientsString) {
    const pigKeywords = ['pork', 'bacon', 'ham', 'sausage', 'lard', 'guanciale', 'pork belly', 'pig', 'hog', 'swine'];
    
    const ingredientsList = ingredientsString.split(', ');
    
    for (const ingredient of ingredientsList) {
        const ingredientLower = ingredient.trim().toLowerCase();
        for (const keyword of pigKeywords) {
            if (ingredientLower.includes(keyword)) {
                return true;
            }
        }
    }
    
    return false;
}

async function hasCow(ingredientsString) {
    const cowKeywords = ['beef', 'steak', 'ground beef', 'veal', 'cow', 'cattle', 'ox', 'bull', 'brisket', 'ribeye'];
    
    const ingredientsList = ingredientsString.split(',');
    
    for (const ingredient of ingredientsList) {
        const ingredientLower = ingredient.trim().toLowerCase();
        for (const keyword of cowKeywords) {
            if (ingredientLower.includes(keyword)) {
                return true;
            }
        }
    }
    
    return false;
}

async function addDish(id) {
    const url = "https://api.hfs.purdue.edu/menus/v2/items/" + id;
    const headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
    };

    const response = await fetch(url, { headers });

    if (response.status === 200) {
        const jsonData = await response.json();
        const dbConnection = mysql.createConnection({
            host: "boilerbites-1.cjmepwltgjhe.us-east-2.rds.amazonaws.com",
            user: "admin",
            password: "purduepete"
        });

        const insertQuery = "INSERT INTO boilerbites.dishes (id, dish_name, meat, animal_products, pork, beef, gluten, nuts, calories, carbs, protein, fat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const data = [
            jsonData.ID,
            jsonData.Name,
            jsonData.IsVegetarian,
            jsonData.Allergens[11].Value,
            await hasPig(jsonData.Ingredients),
            await hasCow(jsonData.Ingredients),
            jsonData.Allergens[3].Value,
            jsonData.Allergens[9].Value || jsonData.Allergens[5].Value,
            jsonData.Nutrition[1].Value,
            jsonData.Nutrition[3].Value,
            jsonData.Nutrition[7].Value,
            jsonData.Nutrition[11].Value
        ];

        dbConnection.connect();
        dbConnection.query(insertQuery, data, (error) => {
            if (error) {
                console.error("Error inserting data:", error);
            } else {
                console.log("Data inserted successfully.");
            }
            dbConnection.end();
        });
    } else {
        console.log("GET request failed. Status Code:", response.status);
    }
}

async function fetchJsonData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Fetch error: ${error}`);
    }
  }

function isDishExists(dishId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS count FROM Dishes WHERE DishID = ?';

    connection.query(query, [dishId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
}

async function processMeals(meals) {
  for (const meal of meals) {
    console.log(meal);
    if (meal)
    for (const dish of meal) {
      const dishId = dish.ID;

      try {
        const exists = await isDishExists(dishId);

        if (!exists) {
          console.log(`Dish with ID ${dishId} doesn't exist in the database. Adding...`);
          await addDish(dishId);
          console.log(`Dish with ID ${dishId} added to the database.`);
        }
      } catch (error) {
        console.error('Error processing dish:', error);
      }
    }
  }
  connection.end();
}

async function fetchMealData() {
    const url = "https://api.hfs.purdue.edu/menus/v2/locations/Wiley/2023-8-26";
    const headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
    };

    try {
        const response = await fetch(url, { headers });

        if (response.status === 200) {
            const jsonData = await response.json();
            processMeals(jsonData.Meals)
            .then(() => {
                console.log('Processing completed.');
            })
            .catch((error) => {
                console.error('Error processing meals:', error);
            });
        } else {
            console.log("GET request failed. Status Code:", response.status);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchMealData();