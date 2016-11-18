import csv
import json

csvfile = open('data.csv', 'r')
jsonfile = open('data.json', 'w')

fieldnames = ("Country","Data")
reader = csv.DictReader(csvfile)
points = []

jsonfile.write('{ \n')
jsonfile.write('"points": [\n')
for row in reader:
    jsonfile.write(',')
    jsonfile.write('\n')
    country = row['Country Code']
    data = row['2013 [YR2013]']
    json.dump(({'country': country, 'data': data}),jsonfile)
jsonfile.write(']\n')
jsonfile.write('}')
