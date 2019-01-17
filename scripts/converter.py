"""
This script converts data from csv to json.
Name: Rebecca Davidsson, student number: 11252138.
"""

import json
import csv
from nested_dict import nested_dict

with open("../data/foodvalues.csv") as csvfile:
    foodvalues = csv.reader(csvfile, delimiter=',')

    nd = nested_dict()
    for row in foodvalues:
        year = row[2].split("-")[0]
        week = row[2].split("-")[-1]

        # Filter out all '01', '02' etc.
        if week[0] == "0":
            week = week[1]

        nd[row[0]][year][week] = row[3]

    # print(len(nd[row[0]][year].values()))




    with open("../data/result.json", "w") as fp:
        json.dump(nd, fp)
