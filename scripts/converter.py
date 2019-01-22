"""
This script converts data from csv to json.
Name: Rebecca Davidsson, student number: 11252138.
"""

import json
import pandas as pd
from collections import defaultdict

all = []

def to_flare_json(df, filename):

    flare = dict()
    d = {"name":"flare", "children": []}


    for index, row in df.iterrows():
        parent = row[0]
        child = row[2].split("-")[0] # string, year
        child2 = row[2].split("-")[-1] # string, week
        child_size = row[3] # int, value

        # Make a list of keys
        key_list = []
        child_list = []
        for item in d['children']:
            key_list.append(item['name'])
            child_list.append(item['children'])


        #if 'parent' is NOT a key in flare.JSON, append it
        if not parent in key_list:
            # d['children'].append({"name": parent, "children":[{"name": child, "children": child_size}]})
            d['children'].append({"name": parent, "children":[{"name": child, "children": child2 }]})


        # if parent IS a key in flare.json, add a new child to it
        else:
            d['children'][key_list.index(parent)]['children'].append({"name": child, "children": child2})



    flare = d

    # export the final result to a json file
    with open(filename +'.json', 'w') as outfile:
        json.dump(flare, outfile, indent=4)
    print ("Done")





#
#
# with open("../data/foodvalues.csv") as csvfile:
#     foodvalues = csv.reader(csvfile, delimiter=',')
#     next(foodvalues)
#     nd = nested_dict()
#     Dict = {}
#     Dict["name"] = {}
#     for row in foodvalues:
#         year = row[2].split("-")[0]
#         week = row[2].split("-")[-1]
#
#         Dict["name"][row[0]] = [{"children" : [{}]}]
#         Dict["name"][row[0]][0]["children"] = [{"name" : year}]
#
#         # Dict["name"]["children"] = [{row[0]}]
#
#         # Filter out all '01', '02' etc.
#         if week[0] == "0":
#             week = week[1]
#
#         nd[row[0]][year][week] = row[3]
    # print(Dict)
        # all.append({"name": row[0], "year": year, "week_id": week, "week_value": row[3] })

to_flare_json(pd.read_csv("../data/foodvalues.csv"), "foodvalues")
    # with open("../data/result.json", "w") as fp:
    #     json.dump(nd, fp)
    #
    # with open("../data/result_nested.json", "w") as fp:
    #     json.dump(all, fp)
