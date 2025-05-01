const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db').promise();
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Used Haversine formula to calculate and sort by the geographical distance between the user's coordinates and each school's coordinates.
function calculateDistance(lat1, lon1, lat2, lon2) {
    const rad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    const lat = rad(lat2 - lat1);
    const lon = rad(lon2 - lon1);

    const a = Math.sin(lat/2) * Math.sin(lat/2) +
              Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
              Math.sin(lon/2) * Math.sin(lon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

// Add School API:
app.post('/addSchool', async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || latitude == null || longitude == null) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Latitude and Longitude must be numbers' });
        }

        await db.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        res.status(201).json({ message: 'School added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// List Schools API:
app.get('/listSchools', async (req, res) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: 'Invalid latitude or longitude' });
        }

        const [schools] = await db.execute('SELECT * FROM schools');

        const schoolsWithDistance = schools.map((school) => {
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school, distance: parseFloat(distance.toFixed(2)) };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolsWithDistance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
