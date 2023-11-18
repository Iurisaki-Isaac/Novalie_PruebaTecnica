const express = require('express');
const app = express();
const fs = require('fs');
const port = 3001;
const cors = require('cors');

//Funciones
const getUniqueOptions = (data, field) => {
    const uniqueOptions = Array.from(new Set(data.map(entry => entry[field])))
        .filter(value => value !== undefined && value !== null)
        .map(value => ({ value, label: value }));
    return uniqueOptions;
};

//Middleware
app.use(express.json());
app.use(cors());

//Endpoints...

//Root
app.get('/', (req, res) => {
    res.send('API REST up!');
});

//GET /pending-payments
app.get('/pending-payments', (req, res) => {
    const rawData = fs.readFileSync('pending_payments.json');
    const pendingPayments = JSON.parse(rawData);
        
    const currency = req.query.currency;

    if (!currency || !pendingPayments[currency]) {
        console.log("Server error")
        return res.status(400).json({ error: 'A type of currency required.' });      
    }

    console.log("Data given")
    res.json({ value: pendingPayments[currency]});
});

//GET /payment-data
app.get('/payment-data', (req, res) => {
    try {
        const { office, agent, executive } = req.query;
        const rawData = fs.readFileSync('payments_data.json');
        const data = JSON.parse(rawData);

        if (office || agent || executive !== undefined) {
            const filteredData = data.filter(entry => {
                const entryOffice = entry.office;
                const entryAgent = entry.agent;

                return (
                    (!office || (entryOffice && entryOffice.toLowerCase() === office.toLowerCase())) &&
                    (!agent || (entryAgent && entryAgent.toLowerCase() === agent.toLowerCase())) &&
                    (executive === undefined || entry.executive === (executive === 'true'))
                );
            });
            
            res.json(filteredData);
        } else {
            res.json(data);
        }

        console.log("Data given")
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//GET /data-options
app.get('/data-options', (req, res) => {
    try {
        const rawData = fs.readFileSync('payments_data.json');
        const jsonData = JSON.parse(rawData);

        const officeOptions = getUniqueOptions(jsonData, 'office');
        const agentOptions = getUniqueOptions(jsonData, 'agent');

        const options = {
        officeOptions,
        agentOptions,
        };

        res.json(options);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});