"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const router = express_1.default.Router();
// User sign up
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield user_1.User.findOne({
            email
        });
        if (user)
            res.status(400).json({ msg: "User already exists" });
        user = new user_1.User({
            email,
            password
        });
        const response = yield user.save();
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error saving user"
        });
    }
}));
// User log in
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield user_1.User.findOne({
            email
        });
        if (user && user.password == password)
            res.end();
        res.status(400).json({ msg: "Incorrect email or password" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Server error"
        });
    }
}));
module.exports = router;
