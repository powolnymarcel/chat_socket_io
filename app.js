var express = require('express');
var app = express();
var path = require('path');
var serveur = require('http').createServer(app);
var io = require('socket.io').listen(serveur);
var utilisateurs = [];
