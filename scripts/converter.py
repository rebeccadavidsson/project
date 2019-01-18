"""
This script converts data from csv to json.
Name: Rebecca Davidsson, student number: 11252138.
"""

import json
import csv
from nested_dict import nested_dict

all = []

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

        all.append({"name": row[0], "year": year, "week_id": week, "week_value": row[3] })


    with open("../data/result.json", "w") as fp:
        json.dump(nd, fp)

    with open("../data/result_nested.json", "w") as fp:
        json.dump(all, fp)
