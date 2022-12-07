from bs4 import BeautifulSoup

import requests

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}


html_text=requests.get("https://www.bigbasket.com/cl/foodgrains-oil-masala/?nc=cs",headers=headers);

# print(html_text);

soup=BeautifulSoup(html_text.text,"lxml")

product_names=soup.find_all("div",class_="col-sm-12 col-xs-7 prod-name")


print(product_names,"empty")