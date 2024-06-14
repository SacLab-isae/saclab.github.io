const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const eventsFile = './events.json';

app.use(express.static('.'));
app.use(express.json());

app.get('/events', (req, res) => {
    fs.readFile(eventsFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading events file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/events', (req, res) => {
    fs.readFile(eventsFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading events file');
        } else {
            const events = JSON.parse(data);
            events.push(req.body);
            fs.writeFile(eventsFile, JSON.stringify(events), err => {
                if (err) {
                    res.status(500).send('Error writing events file');
                } else {
                    res.status(200).send('Event added');
                }
            });
        }
    });
});

app.delete('/events/:date', (req, res) => {
    fs.readFile(eventsFile, (err, data) => {
        if (err) {
            res.status(500).send('Error reading events file');
        } else {
            let events = JSON.parse(data);
            events = events.filter(event => event.date !== req.params.date);
            fs.writeFile(eventsFile, JSON.stringify(events), err => {
                if (err) {
                    res.status(500).send('Error writing events file');
                } else {
                    res.status(200).send('Event deleted');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
