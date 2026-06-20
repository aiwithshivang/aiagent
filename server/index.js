import express from 'express';
import cors from 'cors';
import { db, initDb } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

initDb();

// Get Global Stats
app.get('/api/stats', (req, res) => {
  db.get("SELECT * FROM stats WHERE id = 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Trigger a new Task
app.post('/api/tasks/fire', (req, res) => {
  db.run("UPDATE stats SET tasks_fired = tasks_fired + 1 WHERE id = 1", function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get("SELECT tasks_fired FROM stats WHERE id = 1", (err, row) => {
      res.json({ success: true, tasks_fired: row.tasks_fired });
    });
  });
});

// Get Invoices
app.get('/api/invoices', (req, res) => {
  db.all("SELECT * FROM invoices ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Process a new Invoice
app.post('/api/invoices', (req, res) => {
  const { client, amount, status } = req.body;
  const id = 'INV-' + Math.floor(Math.random() * 10000);
  db.serialize(() => {
    db.run("INSERT INTO invoices (id, client, amount, status) VALUES (?, ?, ?, ?)", [id, client, amount, status]);
    db.run("UPDATE stats SET invoices_sent = invoices_sent + 1, cost_savings = cost_savings + 5.0 WHERE id = 1", function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
