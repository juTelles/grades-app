import mongoose from 'mongoose';
import gradesModel from './gradesModel.js';
require('dotenv').config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.gradesModel = gradesModel(mongoose);

export { db };
