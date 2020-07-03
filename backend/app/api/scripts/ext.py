#!/usr/bin/python
#- * -coding: utf - 8 - * -

import urllib.request
import urllib.parse
import urllib.error
from bs4 import BeautifulSoup
import ssl
import json
import ast
import os
import argparse
from urllib.request import Request, urlopen
import requests
import jwt

parser = argparse.ArgumentParser(description='Genius Scraper for LyricsAPI')
parser.add_argument('-k', help='Add the search keyword, e.g. song name.', required=True)
args = parser.parse_args()
keyword = args.k

# For ignoring SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

songs = []

def search(keyword):
  url = "https://genius.com/api/search/multi?per_page=5&q=" + keyword
  req = Request(url, headers = { 'User-Agent' : 'Mozilla/5.0'})
  webpage = urlopen(req).read()
  js = json.loads(webpage)
  for res in js['response']['sections'][0]['hits']:
    getLyrics(res['result']['id'],'https://genius.com' + res['result']['path'])
  for res in js['response']['sections'][1]['hits']:
    getLyrics(res['result']['id'],'https://genius.com' + res['result']['path'])
  for res in js['response']['sections'][2]['hits']:
    getLyrics(res['result']['id'],'https://genius.com' + res['result']['path'])

def getLyrics(id,url):
  # Making the website believe that you are accessing it using a mozilla browser
  req = Request(url, headers = { 'User-Agent' : 'Mozilla/5.0' })
  webpage = urlopen(req).read()

  # Creating a BeautifulSoup object of the html page for easy extraction of data.
  soup = BeautifulSoup(webpage, 'html.parser')
  html = soup.prettify('utf-8')
  song_json = {}
  song_json["lyrics"] = ""
  song_json["lyrics_id"] = id
  song = ""

  #Extract Title of the song
  for title in soup.findAll('h1', attrs = {'class' : 'header_with_cover_art-primary_info-title'}):
    song_json["name"] = "" + title.text.strip()

  #Extract Artist of the song
  for artist in soup.findAll('a', attrs = {'class' : 'header_with_cover_art-primary_info-primary_artist'}):
    song_json["artist"] = "" + artist.text.strip()

  #Extract Album of the song
  for album in soup.findAll('div', attrs = {'class' : 'metadata_unit'}):
    text = album.text.strip()
    if text.startswith('Album'):
      song_json["album"] = "" + album.text.strip().split('\n')[1]

  # Extract the release date of the song
  for span in soup.findAll('span', attrs = {'class': 'metadata_unit-info metadata_unit-info--text_only'}):
    song_json["release"] = "" + span.text.strip()

  #Extract the Lyrics of the song
  for div in soup.findAll('div', attrs = {'class': 'lyrics'}):
    song = song + div.text.strip()

  song_json["lyrics"] = song
  song_json["lyrics_source"] = "Genius"

  songs.append(song_json)

def uploadToDB():
  for song in songs:
    s = json.dumps(song)
    secret = os.environ['JWT_KEY']
    req = requests.post("https://api.rpsh.me/songs", json=json.loads(s))
    print(s)
    print(req.json())

#Fetch Songs Based on the Keyword
search(keyword)
uploadToDB()
