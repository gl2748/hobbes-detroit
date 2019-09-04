"use strict";
require("source-map-support").install();

exports.createPages = require('./onCreateWebpackConfig').onCreateWebpackConfig;
exports.createPages = require("./createPages").createPages;
exports.onCreateNode = require("./onCreateNode").onCreateNode;
