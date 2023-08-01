from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.chrome.service import Service as ChromeService 
from webdriver_manager.chrome import ChromeDriverManager 

 
options = webdriver.ChromeOptions()
options.headless = True 
options.binary_location = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
chrome_driver_binary = "/usr/local/bin/chromedriver"
driver = webdriver.Chrome(chrome_driver_binary, chrome_options=options)
 
foodLocations = ["Ford", "Earhart", "Hillenbrand", "Wiley", "Windsor", 
                 "1Bowl", "Pete's%20Za", "The%20Burrow", "The%20Gathering%20Place", 
                 "Earhart%20On-the-GO!", "Hillenbrand%20On-the-GO!", "Wiley%20On-the-GO!", "Windsor%20On-the-GO!"]
 
for location in foodLocations:
    url = 'https://dining.purdue.edu/menus/' + location + '/2023/8/1/' 
    driver.get(url) 
    elements = driver.find_elements(By.CLASS_NAME, 'station-item-text') 
    for element in elements:
        print(element.text)

