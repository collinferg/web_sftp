/*
 * grunt-init-gruntfile
 * https://gruntjs.com/
 *
 * Copyright (c) 2016 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic grunt scaffolding.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    {
        name: 'host',
        message: 'hostname for the SFTP server you\'d like to use'
    },
    {
        name: 'nickname',
        message: 'nickname for the SFTP server you\'d like to use'
    },
    {
        name: 'username',
        message: 'username for the SFTP server you\'d like to use'
    },
    {
        name: 'password',
        message: 'password for the SFTP server you\'d like to use'
    },
    {
        name: 'path',
        message: 'path to directory the project files should be uploaded to'
    }
    ], function(err, props) {
    props.package_json = 'package.json';
    props.file_name = props.package_json ? '<%= pkg.name %>' : 'FILE_NAME';
    props.host = props.host;
    props.nickname = props.nickname;
    props.username = props.username;
    props.password = props.password;
    props.path = props.path;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // If is package_json true, generate package.json
    if (props.package_json) {
      var devDependencies = {
        "grunt": "^0.4.5",
        "grunt-autoprefixer": "^3.0.4",
        "grunt-contrib-cssmin": "^1.0.1",
        "grunt-contrib-sass": "^1.0.0",
        "grunt-contrib-uglify": "^2.0.0",
        "grunt-contrib-watch": "^1.0.0",
        "grunt-sftp-deploy": "^0.2.4"
      };

      // Generate package.json file, used by npm and grunt.
      init.writePackageJSON('package.json', {
        node_version: '>= 0.10.0',
        devDependencies: devDependencies
      });
    }

    // All done!
    done();
  });

};
