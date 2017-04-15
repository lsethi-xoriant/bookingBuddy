var express = require('express');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test7';
var db = new pg.Client(connectionString);

db.connect(function (err) {
  // uncomment and run node seed.js to create db.
    // Nothing changes except instead of "test1" above you must insert your own db name on your local computer or create database

  if (err) { throw err; }

  db.query('CREATE TABLE \
                  users( \
                  id SERIAL PRIMARY KEY, \
                  nameF VARCHAR(15) not null, \
                  nameL VARCHAR(15) not null, \
                  email VARCHAR(25) not null)');

  db.query('CREATE TABLE \
                  trips( \
                  id SERIAL PRIMARY KEY, \
                  name VARCHAR(15) not null)');

  db.query('CREATE TABLE \
                  userTrips( \
                  id SERIAL PRIMARY KEY, \
                  user_id INTEGER REFERENCES users(id), \
                  trip_id INTEGER REFERENCES trips(id))');

db.query('CREATE TABLE \
                  budget( \
                  id SERIAL PRIMARY KEY, \
                  total NUMERIC(6,2) not null, \
                  trip_id INTEGER REFERENCES userTrips(id))');

db.query('CREATE TABLE \
                  dates( \
                  id SERIAL PRIMARY KEY, \
                  beging VARCHAR(15) not null, \
                  ending VARCHAR(15) not null, \
                  duration VARCHAR(10) not null, \
                  trip_id INTEGER REFERENCES userTrips(id), \
                  trip_number INTEGER REFERENCES trips(id))');

db.query('CREATE TABLE \
                  locations( \
                  id SERIAL PRIMARY KEY, \
                  name VARCHAR(25) not null, \
                  user_trip_id INTEGER REFERENCES userTrips(id))');

  db.query('CREATE TABLE \
                  bookmarks( \
                  id SERIAL PRIMARY KEY, \
                  email VARCHAR(30), \
                  bookmark VARCHAR(300), \
                  trip_id INTEGER, \
                  user_trip_id INTEGER REFERENCES userTrips(id))');

});