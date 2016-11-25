import csv
import json

csvfile = open('data.csv', 'r')
jsonfile = open('data.json', 'w')

reader = csv.DictReader(csvfile)
row1 = csvfile.readline()
firstrow = row1.split(',')
lines = sum(1 for line in open('data.csv')) -1

fieldnames = tuple(firstrow)
reader = csv.DictReader(csvfile, fieldnames = fieldnames)
i = 0

jsonfile.write('[\n')
for row in reader:
    json.dump(({fieldnames[2]: row[fieldnames[2]], fieldnames[4]: row[fieldnames[4]]}),jsonfile, indent = 4)
    i = i + 1
    if i < lines:
        jsonfile.write(',')
    jsonfile.write('\n')
jsonfile.write(']')
