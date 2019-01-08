"""
This script converts data from csv to json.
Name: Rebecca Davidsson, student number: 11252138.
"""

import csv
import pandas as pd

df = pd.read_csv("data/foodvalues.csv")

export = df.to_json("test.json", orient='table')


#
# with open("data/foodvalues.csv") as csvfile:
#     foodvalues = csv.reader(csvfile, delimiter=',')
#
#     df = pd.DataFrame(foodvalues)
#     print(df)
#
#     dict = {}
#     for row in foodvalues:
#         dict.update({row[0]: ([row[2].split("-")[0], [row[2].split("-")[-1], row[3]]] )})
#
#     # print(dict)
#
#     # jsonfile = open('file.json', 'w')
