import { aircrat } from './app';
import { app } from './app';
app.post('/api/aircraft', (req, res) => {
    res.send(aircrat);
});
