import mongoose from 'mongoose';
import gradesModel from './gradesModel.js';
require('dotenv').config();

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb+srv://igti:igti@bootcamp.rpzp5.mongodb.net/grades-app?retryWrites=true&w=majority';
db.gradesModel = gradesModel(mongoose);

export { db };
