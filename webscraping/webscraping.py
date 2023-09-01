from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import os
import dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import datetime


foodLocations = [
    "Ford",
    "Earhart",
    "Hillenbrand",
    "Wiley",
    "Windsor",
    "1Bowl",
    "Pete's%20Za",
    "The%20Burrow",
    "The%20Gathering%20Place",
    "Earhart%20On-the-GO!",
    "Hillenbrand%20On-the-GO!",
    "Wiley%20On-the-GO!",
    "Windsor%20On-the-GO!",
]

meals = ["Breakfast", "Lunch", "Dinner"]


def scrape_date(date, driver, dcollection, tcollection):
    for location in foodLocations:
        for meal in meals:
            url = (
                "https://dining.purdue.edu/menus/"
                + location
                + "/"
                + date[0]
                + "/"
                + date[1]
                + "/"
                + date[2]
                + "/"
                + meal
                + "/"
            )
            dish_ids = []
            driver.get(url)
            stations = driver.find_elements(By.CLASS_NAME, "station")
            if stations:
                for station in stations:
                    station_text = station.find_element(By.CLASS_NAME, "station-name").text
                    elements = station.find_elements(By.CLASS_NAME, "station-item-text")
                    for element in elements:
                        dish = element.text
                        existing_dish = dcollection.find_one(
                            {"dish": dish, "diningCourt": location, "station": station_text}
                        )
                        if not existing_dish:
                            new_dish_data = {
                                "dish": dish,
                                "diningCourt": location,
                                "station": station_text,
                                "averageRating": 0,
                                "numRatings": 0,
                            }
                            result = dcollection.insert_one(new_dish_data)
                            id = result.inserted_id
                        else:
                            id = existing_dish["_id"]
                        dish_ids.append(id)
                if tcollection.find_one(
                    {
                        "year": int(date[0]),
                        "month": int(date[1]),
                        "day": int(date[2]),
                        "diningCourt": location,
                        "meal": meal,
                    }
                ):
                    tcollection.update_one(
                        {
                            "year": int(date[0]),
                            "month": int(date[1]),
                            "day": int(date[2]),
                            "diningCourt": location,
                            "meal": meal,
                        },
                        {"$set": {"dishes": dish_ids}},
                    )
                else:
                    tcollection.insert_one(
                        {
                            "year": int(date[0]),
                            "month": int(date[1]),
                            "day": int(date[2]),
                            "diningCourt": location,
                            "meal": meal,
                            "dishes": dish_ids,
                        }
                    )


def main():
    dotenv.load_dotenv()

    uri = os.getenv("MONGODB_URI")
    client = MongoClient(uri, server_api=ServerApi("1"))
    try:
        client.admin.command("ping")
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

    database = client["test"]
    dcollection = database["dishes"]
    tcollection = database["timings"]

    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.binary_location = (
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    )
    chrome_driver_binary = "/usr/local/bin/chromedriver"
    service = Service(chrome_driver_binary)
    driver = webdriver.Chrome(service=service, options=options)

    date = datetime.date.today()
    dateArray = date.strftime("%Y-%m-%d").split("-")
    timedelta = datetime.timedelta(days=1)
    for i in range(-10, 10):
        scrape_date(dateArray, driver, dcollection, tcollection)
        date = date - timedelta
        dateArray = date.strftime("%Y-%m-%d").split("-")


if __name__ == "__main__":
    main()
