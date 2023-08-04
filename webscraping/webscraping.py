from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.chrome.service import Service as ChromeService 
from webdriver_manager.chrome import ChromeDriverManager 
import os
import dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import datetime
import time
start_time = time.time()


dotenv.load_dotenv()

uri = os.getenv("MONGODB_URI")
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

database = client['test']
dcollection = database['dishes']
tcollection = database['timings']

 
options = webdriver.ChromeOptions()
options.add_argument('--headless') 
options.binary_location = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
chrome_driver_binary = "/usr/local/bin/chromedriver"
driver = webdriver.Chrome(chrome_driver_binary, options=options)
 
foodLocations = ["Ford", "Earhart", "Hillenbrand", "Wiley", "Windsor", 
                 "1Bowl", "Pete's%20Za", "The%20Burrow", "The%20Gathering%20Place", 
                 "Earhart%20On-the-GO!", "Hillenbrand%20On-the-GO!", "Wiley%20On-the-GO!", "Windsor%20On-the-GO!"]
 
meals = ["Breakfast", "Lunch", "Dinner"]

date = str(datetime.datetime.today()).split()[0].split('-')

for location in foodLocations:
    for meal in meals:
        url = 'https://dining.purdue.edu/menus/' + location + '/' + date[0] + '/' + date[1] + '/' + date[2] + '/' + meal + '/'

        driver.get(url) 
        elements = driver.find_elements(By.CLASS_NAME, 'station-item-text')
        if elements:
            dish_ids = []
            for element in elements:
                dish = element.text
                if not dcollection.find_one({"dish": dish, "diningCourt": location }):
                    id = dcollection.insert_one({"dish": dish, "diningCourt": location, "averageRating": 0, "numRatings": 0})
                else:
                    id = dcollection.find_one({"dish": dish, "diningCourt": location })["_id"]
                dish_ids.append(id)
            tcollection.insert_one({
                "year": date[0], 
                "month": date[1], 
                "day": date[2], 
                "meal": meal, 
                "dishes": dish_ids
                })

print("--- %s seconds ---" % (time.time() - start_time))




