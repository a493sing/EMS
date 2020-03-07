var mongoose = require("mongoose");
var Venues   = require("./models/venues");
var Catering = require("./models/catering");
var Decorations   = require("./models/decorations");

var venuesData = [
    {
        name: 'ABC Party Hall',
        image: null,
        description: null,
        location: 'Waterloo',
        price: '5000 CAD',
        capacity: 500,
        category: 'Suited for all types of events',
        contactno: '2268889090',
        cateringAvailable: true,
        decorationAvailable: true
    },
    {
        name: 'PQR Party Hall',
        image: null,
        description: null,
        location: 'Toronto',
        price: '2000 CAD',
        capacity: 50,
        category: 'Suited for birthday parties only',
        contactno: '2268889090',
        cateringAvailable: true,
        decorationAvailable: true

    },
    {
        name: 'XYZ Party Hall',
        image: null,
        description: null,
        location: 'Scarborough',
        price: '10000 CAD',
        capacity: 150,
        category: 'Suited for all types of events',
        contactno: '2268889090',
        cateringAvailable: true,
        decorationAvailable: true
    },
    {
        name: 'LMN Mini Hall',
        image: null,
        description: null,
        location: 'Richmond Hill',
        price: '4000 CAD',
        capacity: 70,
        category: 'Suited for all types of events',
        contactno: '2268889090',
        cateringAvailable: true,
        decorationAvailable: true
    },
    {
        name: 'AAA Hall',
        image: null,
        description: null,
        location: 'Markham',
        price: '10000 CAD',
        capacity: 150,
        category: 'Suited for all types of events',
        contactno: '2268889090',
        cateringAvailable: true,
        decorationAvailable: true
    }
]

var cateringData = [
    {
        name: 'Jessy Caterers',
        image: null,
        description: null,
        location: 'Vancouver',
        price: '$2000',
        beverages: false,
        contactno: '123456789'
    },
    {
        name: 'Tasty Caterers',
        image: null,
        description: null,
        location: 'Brampton',
        price: '$2000',
        beverages: false,
        contactno: '123456789'
    },
    {
        name: 'AAA Caterers',
        image: null,
        description: null,
        location: 'Halifix',
        price: '$2000',
        beverages: false,
        contactno: '123456789'
    },
    {
        name: 'BBB Caterers',
        image: null,
        description: null,
        location: 'Regin',
        price: '$2000',
        beverages: true,
        contactno: '123456789'
    },
    {
        name: 'CCC Caterers',
        image: null,
        description: null,
        location: 'Near BC',
        price: '$2000',
        beverages: false,
        contactno: '123456789'
    }
]

var decorationsData = [
    {
        name: 'PPP Decorators',
        image: null,
        description: null,
        location: 'Toronto',
        price: '$5000',
        contactno: '1222234445'
    },
    {
        name: 'QQQ Decorators',
        image: null,
        description: null,
        location: 'Missisauga',
        price: '$5000',
        contactno: '1222234445'
    },
    {
        name: 'RRR Decorators',
        image: null,
        description: null,
        location: 'Waterloo',
        price: '$5000',
        contactno: '1222234445'
    },
    {
        name: 'SSS Decorators',
        image: null,
        description: null,
        location: 'Kitchner',
        price: '$5000',
        contactno: '1222234445'
    },
    {
        name: 'TTT Decorators',
        image: null,
        description: null,
        location: 'Cambridge',
        price: '$5000',
        contactno: '1222234445'
    }
]

function seedEmsData() {

    //Venues
    Venues.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all venues!");
        // add venues
        venuesData.forEach(function(seed){
            Venues.create(seed, function(err, venue){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a venue");
                    venue.save();
                }
            });
        
    });
});

    //Catering
    Catering.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all catering entries!");
        // add catering
        cateringData.forEach(function(seed){
            Catering.create(seed, function(err, catering){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an entry in catering");
                    catering.save();
                }
            });
        
    });
});

    //Venues
    Decorations.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed all decoration entries!");
        // add decoration entries
        decorationsData.forEach(function(seed){
            Decorations.create(seed, function(err, decoration){
                if(err){
                    console.log(err)
                } else {
                    console.log("added an entry in decoration");
                    decoration.save();
                }
            });
        
    });
});

}

module.exports = seedEmsData;