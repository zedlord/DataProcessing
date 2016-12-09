import csv
import json

csvfile = open('sun.csv', 'r')
jsonfile1 = open('alldata.json', 'w')
jsonfile2 = open('biltdata.json', 'w')
jsonfile3 = open('eeldedata.json', 'w')

reader = csv.DictReader(csvfile)
fieldnames = ['Station','Datum','Maximum','Minimum','Stoot']
reader = csv.DictReader(csvfile, fieldnames = fieldnames)


i = 0
jsonfile3.write('[\n')
jsonfile2.write('[\n')
jsonfile1.write('{\n')
for row in reader:
    warboel = row[fieldnames[1]]
    date = warboel[:4] + '-' + warboel[-4] + warboel[-3] + '-' + warboel[-2] + warboel[-1]
    if i != 0:
        if int(row[fieldnames[0]])==260:
            json.dump(({fieldnames[1]: date, fieldnames[2]: row[fieldnames[2]], fieldnames[3]: row[fieldnames[3]], fieldnames[4]: row[fieldnames[4]]}), jsonfile2, indent = 4, separators=(',', ': '))
            if i<343:
                jsonfile2.write(',')
            jsonfile2.write('\n')
        elif int(row[fieldnames[0]])==280:
            json.dump(({fieldnames[1]: date, fieldnames[2]: row[fieldnames[2]], fieldnames[3]: row[fieldnames[3]], fieldnames[4]: row[fieldnames[4]]}), jsonfile3, indent = 4, separators=(',', ': '))
            if i<686:
                jsonfile3.write(',')
            jsonfile3.write('\n')
        if i == 1:
            jsonfile1.write('"De Bilt":\n[ \n')
        if i == 366:
            jsonfile1.write('],\n "Vlissingen":\n[ \n')

        json.dump(({fieldnames[1]: date, fieldnames[2]: row[fieldnames[2]], fieldnames[3]: row[fieldnames[3]], fieldnames[4]: row[fieldnames[4]]}), jsonfile1, indent = 4, separators=(',', ': '))
        if i != 343 and i != 686:
            jsonfile1.write(',')
        jsonfile1.write('\n')
    i+=1
jsonfile1.write('] \n }')
jsonfile2.write(']')
jsonfile3.write(']')
