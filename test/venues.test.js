const mongoose = require('mongoose');
const VenueModel = require('../models/venues');

describe('Venues Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: "true", useCreateIndex: "true" }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
      });

    test('CreateAndSaveVenue', async () => {
        const venueData =  { name: 'ABC Party Hall', image: null,
                description: null, location: 'Waterloo', price: '5000 CAD',
                capacity: 500, category: 'Suited for all types of events',
                contactno: '2268889090', cateringAvailable: "true", decorationAvailable: "true"
            };
        const validVenue = new VenueModel(venueData);
        const savedVenue = await validVenue.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedVenue.name).toBe(venueData.name);
        expect(savedVenue.image).toBe(venueData.image);   
        expect(savedVenue.description).toBe(venueData.description);   
        expect(savedVenue.location).toBe(venueData.location);        
        expect(savedVenue.price).toBe(venueData.price);
        expect(savedVenue.capacity).toBe(venueData.capacity);
        expect(savedVenue.category).toBe(venueData.category);
        expect(savedVenue.contactno).toBe(venueData.contactno);
        expect(savedVenue.cateringAvailable).toBe(venueData.cateringAvailable);
        expect(savedVenue.decorationAvailable).toBe(venueData.decorationAvailable);

    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    test('FieldNotDefinedInSchema', async () => {
        const venueData =  { name: 'Grand Party Hall', image: null,
                description: null, location: 'Markham', price: '5000 CAD',
                capacity: 500, category: 'Suited for all types of events',
                contactno: '2268889090', cateringAvailable: "true", decorationAvailable: "true",
                rating: 'very good'
            };
        const validVenue = new VenueModel(venueData);
        const savedVenue = await validVenue.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedVenue.name).toBe(venueData.name);
        expect(savedVenue.image).toBe(venueData.image);   
        expect(savedVenue.description).toBe(venueData.description);   
        expect(savedVenue.location).toBe(venueData.location);        
        expect(savedVenue.price).toBe(venueData.price);
        expect(savedVenue.capacity).toBe(venueData.capacity);
        expect(savedVenue.category).toBe(venueData.category);
        expect(savedVenue.contactno).toBe(venueData.contactno);
        expect(savedVenue.cateringAvailable).toBe(venueData.cateringAvailable);
        expect(savedVenue.decorationAvailable).toBe(venueData.decorationAvailable);
        expect(savedVenue.rating).toBeUndefined();
    });

    // Test Validation is working!!!
    test('MandatoryFieldNotProvided', async () => {
        const venueDataWithoutReqField = new VenueModel({ image: null,
                description: null, location: 'Markham', price: '5000 CAD',
                capacity: 500, category: 'Suited for all types of events',
                contactno: '2268889090', cateringAvailable: "true", decorationAvailable: "true"
          });
        let err;
        try {
            const savedVenueWithoutReqField = await venueDataWithoutReqField.save();
            error = savedVenueWithoutReqField;
            //console.log(error);
        } catch (error) {
            err = error;
            //console.log(err);
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });
})

