const mongoose = require('mongoose');
const DecorationModel = require('../../models/decorations');

describe('Decorations Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
      });

    test('CreateAndSaveDecorationData', async () => {
        const decorationData = { name: 'PPP Decorators', image: null,
        description: null, location: 'Toronto', price: '$5000', 
        contactno: '1222234445'};
        const validDecorationData = new DecorationModel(decorationData);
        const savedDecorationData = await validDecorationData.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedDecorationData.name).toBe(decorationData.name);
        expect(savedDecorationData.image).toBe(decorationData.image);   
        expect(savedDecorationData.description).toBe(decorationData.description);   
        expect(savedDecorationData.location).toBe(decorationData.location);        
        expect(savedDecorationData.price).toBe(decorationData.price);
        expect(savedDecorationData.contactno).toBe(decorationData.contactno);
    });

        // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    test('FieldNotDefinedInSchema', async () => {
        const decorationData = {  name: 'QQQ Decorators', image: null,
        description: null, location: 'Missisauga',
        price: '$5000', contactno: '1222234445', 
        rating: 'very good'};
        const validDecorationData = new DecorationModel(decorationData);
        const savedDecorationData = await validDecorationData.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedDecorationData.name).toBe(decorationData.name);
        expect(savedDecorationData.image).toBe(decorationData.image);   
        expect(savedDecorationData.description).toBe(decorationData.description);   
        expect(savedDecorationData.location).toBe(decorationData.location);        
        expect(savedDecorationData.price).toBe(decorationData.price);
        expect(savedDecorationData.contactno).toBe(decorationData.contactno);
        expect(savedDecorationData.rating).toBeUndefined();
    });

    // Test Validation is working!!!
    test('MandatoryFieldNotProvided', async () => {
        const userWithoutRequiredField = new DecorationModel({ image: null,
            description: null, location: 'Waterloo',
            price: '$5000', contactno: '1222234445'});
        let err;
        try {
            const savedDecorationDataWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedDecorationDataWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });
})

