"""
This script converts data from csv to json.
Name: Rebecca Davidsson, student number: 11252138.
"""

import csv

with open("data/foodvalues.csv") as csvfile:
    foodvalues = csv.reader(csvfile, delimiter=',')

    for row in foodvalues:
        print(row)
