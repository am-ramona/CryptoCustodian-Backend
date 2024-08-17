import sequelize from './database';
import Transaction from '../models/walletTransactions';

async function testDatabase() {
    try {
        // Sync the database
        await sequelize.sync({ force: true }); // Use { force: true } to recreate tables for testing
        console.log('Database synchronized');

        // a test record
        await Transaction.create({
            from: '0xTestAddress',
            to: '0xAnotherAddress',
            value: '1000000000000000000',
            tokenName: 'TestToken',
            tokenSymbol: 'TT',
            tokenDecimal: '18',
            gasUsed: '21000',
            gasPrice: '1000000000',
            timeStamp: '1635600000',
            input: '0x1234',
        });

        // Fetch and log the test record
        const transactions = await Transaction.findAll();
        console.log('Test data:', transactions);

    } catch (error) {
        console.error('Error testing database:', error);
    }
}

testDatabase();
