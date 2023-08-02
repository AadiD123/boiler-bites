from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.chrome.service import Service as ChromeService 
from webdriver_manager.chrome import ChromeDriverManager 
import requests
import os
import dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import datetime

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
collection = database['dishes']

 
options = webdriver.ChromeOptions()
options.headless = True 
options.binary_location = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
chrome_driver_binary = "/usr/local/bin/chromedriver"
driver = webdriver.Chrome(chrome_driver_binary, chrome_options=options)
 
foodLocations = ["Ford", "Earhart", "Hillenbrand", "Wiley", "Windsor", 
                 "1Bowl", "Pete's%20Za", "The%20Burrow", "The%20Gathering%20Place", 
                 "Earhart%20On-the-GO!", "Hillenbrand%20On-the-GO!", "Wiley%20On-the-GO!", "Windsor%20On-the-GO!"]
 
      
date = str(datetime.datetime.today()).split()[0].split('-')

for location in foodLocations:
    url = 'https://dining.purdue.edu/menus/' + location + '/' + date[0] + '/' + date[1] + '/' + date[2] + '/' 
    driver.get(url) 
    elements = driver.find_elements(By.CLASS_NAME, 'station-item-text')
    if elements:
        for element in elements:
            dish = element.text
            if not collection.find_one({"dish": dish}):
                collection.insert_one({"dish": dish, "diningCourt": location, "averageRating": 0, "numRatings": 0})
            





