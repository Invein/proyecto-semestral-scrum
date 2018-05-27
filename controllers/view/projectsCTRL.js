const express = require('express');
const config = require('config');
const pugLoader = require('../../util/lib/pugLoader');
const Project = require('../../models/project');

function index(request, response, next) {
    Project.find({}, (err, projects) => {
        if(err){
            next();
        }
        else{
            pugLoader(response, 'view/index/projects.pug',{projects});
        }
    });
};

module.exports = {
    index
};