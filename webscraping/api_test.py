import requests
import mysql.connector

# Make the GET request
def has_pig(ingredients_string):
    pig_keywords = ['pork', 'bacon', 'ham', 'sausage', 'lard', 'guanciale', 'pork belly', 'pig', 'hog', 'swine']
    
    ingredients_list = ingredients_string.split(', ')
    
    for ingredient in ingredients_list:
        ingredient_lower = ingredient.strip().lower()
        for keyword in pig_keywords:
            if keyword in ingredient_lower:
                return True
    
    return False
def has_cow(ingredients_string):
    cow_keywords = ['beef', 'steak', 'veal', 'cow', 'brisket', 'ribeye']
    
    # Split the ingredients string into individual ingredients
    ingredients_list = ingredients_string.split(',')
    
    for ingredient in ingredients_list:
        ingredient_lower = ingredient.strip().lower()
        for keyword in cow_keywords:
            if keyword in ingredient_lower.split():
                print(keyword, ingredient_lower)
                return True
    
    return False

def get_dish(id):
    url = "https://api.hfs.purdue.edu/menus/v2/items/" + id
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print(response.text)
        json_data = response.json()
        # Extract relevant data from JSON
        # Connect to MySQL and insert data...
        db_connection = mysql.connector.connect(
            host="boilerbites-1.cjmepwltgjhe.us-east-2.rds.amazonaws.com",
            user="admin",
            password="purduepete"
        )
        
        # Insert data into MySQL
        cursor = db_connection.cursor()
        insert_query = "INSERT INTO boilerbites.dishes (id, dish_name, meat, animal_products, pork, beef, gluten, nuts, calories, carbs, protein, fat) VALUES (%s, %s, %r, %r, %r, %r, %r, %r, %f, %f, %f, %f)"
        data = (json_data["ID"], 
                json_data["Name"], 
                json_data["IsVegetarian"], 
                json_data["Allergens"][11]["Value"], 
                has_pig(json_data["Ingredients"]), 
                has_cow(json_data["Ingredients"]), 
                json_data["Allergens"][3]["Value"], 
                json_data["Allergens"][9]["Value"] or json_data["Allergens"][5]["Value"], 
                json_data["Nutrition"][1]["Value"], 
                json_data["Nutrition"][3]["Value"], 
                json_data["Nutrition"][7]["Value"], 
                json_data["Nutrition"][11]["Value"])
        cursor.execute(insert_query, data)
        
        # Commit changes and close connection
        db_connection.commit()
        cursor.close()
        db_connection.close()
    else:
        print("GET request failed. Status Code:", response.status_code)

day = requests.get("https://api.hfs.purdue.edu/menus/v2/locations/Wiley/2023-8-26")
print(day.json())