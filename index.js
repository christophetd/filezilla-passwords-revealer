'use strict';

var os    = require('os');
var path  = require('path');
var fs    = require('fs');
var XML   = require('pixl-xml');
var get   = require('lodash').get;
var table = require('table').default;
var colors = require('colors');


function getFilezillaDir() {
  switch(os.platform().toLowerCase()) {
    // windows
    case 'win32': return path.join(os.homedir(), "AppData/Roaming/FileZilla");

    // linux and mac
    case 'linux':
    case 'darwin':
      return path.join(os.homedir(), ".filezilla");

    default:
      var dir = path.join(os.homedir(), ".filezilla");
      console.warn("Platform not supported: assuming filezilla home directory is %s", dir);
      return dir;
  }
}

function getCredentialsFile() {
  return path.join(getFilezillaDir(), "sitemanager.xml");
}

function readCredentialsFile() {
  var file = getCredentialsFile();
  if (!fs.existsSync(file)) {
    console.error("The file "+file+" does not exist");
    process.exit(2);
  }

  return fs.readFileSync(getCredentialsFile(), "UTF-8");
}

function readCredentials() {
  var result = [['Host', 'User', 'Password']];
  try {
    var preferences = XML.parse(readCredentialsFile());
  }
  catch (e) {
    console.error("Unable to parse the filezilla preference file "+getCredentialsFile());
    process.exit(3);
  }

  var sites = get(preferences, "Servers.Server");
  if (!sites) {
    console.error("Unable to read saved sites from Filezilla preference file");
    process.exit(4);
  }

  for (var site of preferences.Servers.Server) {
    var encoded = get(site, "Pass._Data");
    if (encoded) {
      var decoded = new Buffer(encoded, 'base64').toString('utf8');
      result.push([ site.Host.bold, site.User.bold, decoded.bold.bgRed ]);
    }
  }

  return result;
}

var credentialsData = readCredentials();
var output = table(credentialsData);
console.log(output);
