import csv
import json

csvfile = open('data.csv', 'r')
jsonfile = open('data.json', 'w')

lines = sum(1 for line in open('data.csv')) -1
fieldnames = ("Country Code","Data", "Country Name")
reader = csv.DictReader(csvfile)
points = []
i = 0
color0 = '#ffffd4'
color1 = '#fee391'
color2 = '#fec44f'
color3 = '#fe9929'
color4 = '#ec7014'
color5 = '#cc4c02'

jsonfile.write ('{ \n "fills":  \n' )
json.dump({'zero': color0, 'one': color1, 'two': color2, 'three': color3, 'four': color4, 'five': color5, 'defaultFill': color0}, jsonfile, indent = 4)
jsonfile.write(',\n')

jsonfile.write ('"data": {\n')
for row in reader:
    if i>0:
        jsonfile.write(',\n')
    i=i+1
    code = row['Country Code']
    data = row['2016 [YR2016]']
    name = row['Country Name']
    non = ".."
    if data == non:
        fillKey = 'zero'
    elif int(data) < 19:
        fillKey = 'one'
    elif int(data) < 41:
        fillKey = 'two'
    elif int(data) < 71:
        fillKey = 'three'
    elif int(data) < 119:
        fillKey = 'four'
    else:
        fillKey = 'five'
    jsonfile.write('"')
    jsonfile.write(code)
    jsonfile.write('"')
    jsonfile.write(':')
    json.dump(( { 'name': name, 'data': data, 'fillKey': fillKey }), jsonfile, indent = 4)

jsonfile.write('}}')
