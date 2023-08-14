const express = require("express")
const Game = require("../models/Game")
const puzzlesRouter = express.Router()

//Get Puzzles

puzzlesRouter.get("/puzzles", async (req, res) => {
    try {
        let limit = req.query.limit

        const games = await Game.find({}).limit(limit)
        res.status(200).json({ status: 200, games })
    } catch (e) {
        res.status(500).json({ status: 500, error: e.message })
    }
})

//Add Puzzle

puzzlesRouter.post("/addPuzzle", async (req, res) => {
    try {
        const { game } = req.body;

        let gameValue = new Game({
            _id: game.id,
            size: game.size,
            type: game.type,
            numberOfLives: game.numberOfLives,
            solvedTable: game.solvedTable,
        })

        await gameValue.save();
        res.status(201).json({ status: 201 });
    } catch (e) {
        res.status(500).json({ status: 500, error: e.message });
    }
})

module.exports = puzzlesRouter;