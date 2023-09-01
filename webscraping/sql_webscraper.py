from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import os
import dotenv
import datetime
import mysql.connector

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


def scrape_date(date, driver, connection):
    cursor = connection.cursor()

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
                    items = station.find_elements(By.CLASS_NAME, "station-item")
                    for item in items:
                        dish = item.find_element(By.CLASS_NAME, "station-item-text").text
                        item_link = item.get_attribute("href")
                        print(item_link)
                        query = (
                            "SELECT id FROM dishes WHERE dish=%s AND diningCourt=%s AND station=%s"
                        )
                        cursor.execute(query, (dish, location, station_text))
                        existing_dish = cursor.fetchone()

                        if not existing_dish:
                            insert_query = (
                                "INSERT INTO dishes (dish, diningCourt, station, averageRating, numRatings) "
                                "VALUES (%s, %s, %s, 0, 0)"
                            )
                            cursor.execute(insert_query, (dish, location, station_text))
                            connection.commit()
                            dish_id = cursor.lastrowid
                        else:
                            dish_id = existing_dish[0]
                        dish_ids.append(dish_id)

                select_query = (
                    "SELECT id FROM timings WHERE year=%s AND month=%s AND day=%s AND diningCourt=%s AND meal=%s"
                )
                cursor.execute(
                    select_query, (date[0], date[1], date[2], location, meal)
                )
                existing_timing = cursor.fetchone()

                if existing_timing:
                    update_query = (
                        "UPDATE timings SET dishes=%s WHERE id=%s"
                    )
                    cursor.execute(update_query, (",".join(map(str, dish_ids)), existing_timing[0]))
                    connection.commit()
                else:
                    insert_query = (
                        "INSERT INTO timings (year, month, day, diningCourt, meal, dishes) "
                        "VALUES (%s, %s, %s, %s, %s, %s)"
                    )
                    cursor.execute(
                        insert_query, (date[0], date[1], date[2], location, meal, ",".join(map(str, dish_ids)))
                    )
                    connection.commit()

    cursor.close()


def main():
    # dotenv.load_dotenv()

    # host = os.getenv("MYSQL_HOST")
    # user = os.getenv("MYSQL_USER")
    # password = os.getenv("MYSQL_PASSWORD")
    # database = os.getenv("MYSQL_DATABASE")

    host = "localhost"
    user = "root"
    password = "purduepete2023"
    database = "boilerbites"

    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password
    )

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
    for i in range(0, 10):
        scrape_date(dateArray, driver, connection)
        date = date + timedelta
        dateArray = date.strftime("%Y-%m-%d").split("-")

    connection.close()


if __name__ == "__main__":
    main()
