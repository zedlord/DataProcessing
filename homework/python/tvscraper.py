#!/usr/bin/env python
# Name:Zelda Zeegers
# Student number:11397705
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv
import re
from pattern.web import URL, DOM
import unicodedata

TARGET_URL = URL("http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series")
dom = DOM(TARGET_URL.download(cached=True))
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # The list serie contains information about 1 serie
    # The list series combines all that information and will be returned
    serie = []
    series = []

    # Go deeper in the dom structure
    for content in dom("div.lister-item-content"):
        for header in content.by_tag("h3.lister-item-header"):
            for title in header.by_tag("a"):
                    serie.append(title.content.encode("ASCII","ignore"))

        for ratings in content.by_tag("div.ratings-bar"):
            for rating in ratings.by_tag("strong"):
                serie.append(rating.content.encode("ASCII","ignore"))

        for text in content.by_tag("p.text-muted"):
            for genre in text.by_tag("span.genre"):
                # get rid of all the junk around the string
                serie.append(genre.content.replace("\n","").replace("  ","").encode("ASCII","ignore"))

        actors = []
        for p in content.by_tag("p"):
            for actor in p.by_tag("a"):
                # Write the actors as strings in an array
                actors.append(unicodedata.normalize("NFKD",actor.content).encode("ASCII","ignore"))
        # pass the array as string in serie
        serie.append(', '.join(actors))


        for text in content.by_tag("p.text-muted"):
            for runtime in text.by_tag("span.runtime"):
                # Only numers can pass
                serie.append(re.sub('[^0-9]', '', runtime.content).encode("ASCII","ignore"))

        # append the serie to the list of series
        series.append(serie)
        # make serie empty again
        serie = []

    # the nested list is returned
    return series



def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])

    # loop over all the nested lists in tvseries
    for s in tvseries:
        writer.writerow(s)


if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
