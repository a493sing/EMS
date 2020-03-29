var mongoose = require('mongoose');
var csv = require('fast-csv');
var Venues   = require("./models/venues");
var Catering = require("./models/catering");
var Decorations   = require("./models/decorations");
var Comment   = require("./models/comment");

var csvHeaders = {
    VENUES: {
        headers: ['name', 'image', 'price', 'description', 'location', 
            'capacity', 'category', 'contactno', 'cateringAvailable', 'decorationAvailable']
    },
    CATERING: {
        headers: ['name', 'image', 'description', 'location', 'price', 'beverages', 'contactno']
    },    
    DECORATIONS: {
        headers: ['name', 'image', 'description', 'location', 'price', 'contactno']
    }
};

function seedEmsDataCsv() {
    // remove all comments
    Comment.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all comments!");
    });     
    // Import CSV to MongoDB
    importCSVFile(__dirname + '/dbdata/venues.csv', Venues, 'venues');
    importCSVFile(__dirname + '/dbdata/catering.csv', Catering, 'catering');
    importCSVFile(__dirname + '/dbdata/decorations.csv', Decorations, 'decorations');
}

function importCSVFile(filePath, modelSchema, modelName) {
    
    // Remove existing entries
    modelSchema.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all " + modelName);
    });

    // Populate data from CSV  
    csv
        .parseFile(filePath, {headers: true, ignoreEmpty: true})
        .on('data', function(data) {

            //console.log(data);
            
            var Obj = mongoose.model(modelName);
            var obj = new Obj();

            Object.keys(data).forEach(function(key) {
                var val = data[key];
                
                //console.log(key);
                //console.log(val);

                if (val !== '')
                    obj.set(key, val);
            });

            obj.save(function (err) {
                if (err)
                    console.log(err);
            });
            
        })
        .on('end', function() {
            console.log(modelName + " data loaded");
        });        
}

module.exports = seedEmsDataCsv;