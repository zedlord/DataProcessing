import csv
import json

csvfile = open('bardata.csv', 'r')
jsonfile = open('bardata.json', 'w')


fieldnames = ("Country Code","TOT 2012","TOT 2013","TOT 2014", "CAP 2012", "CAP 2013", "CAP 2014")
reader = csv.DictReader(csvfile)
i = 0

jsonfile.write ('{"data":{\n')
for row in reader:
    if i>0:
        jsonfile.write(',\n')
    i=i+1
    jsonfile.write('"')
    jsonfile.write(row["Country Code"])
    jsonfile.write('":')
    jsonfile.write('\n{\n"')
    jsonfile.write('TOT')
    jsonfile.write('":')
    json.dump(( { 'jaar1': row["TOT 2012"], 'jaar2': row["TOT 2013"], 'jaar3' : row["TOT 2014"] }), jsonfile, indent = 4)
    jsonfile.write(',')
    jsonfile.write('\n"')
    jsonfile.write('CAP')
    jsonfile.write('":')
    json.dump(( { 'jaar1': row["CAP 2012"], 'jaar2': row["CAP 2013"], 'jaar3' : row["CAP 2014"] }), jsonfile, indent = 4)
    jsonfile.write('}')
jsonfile.write('}}')
