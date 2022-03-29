const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.post('/votes', ({ body }, res) => {
    // data validation
    const errors = inputCheck(body, 'voters_id', 'candidates_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO votes (voters_id, candidates_id) VALUES (?,?)`;
    const params = [body.voters_id, body.candidates_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

router.get('/votes', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name, COUNT(candidates_id) AS count
                FROM votes
                LEFT JOIN candidates ON votes.candidates_id = candidates.id
                LEFT JOIN parties ON candidates.party_id = parties.id
                GROUP BY candidates_id ORDER BY count DESC`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;