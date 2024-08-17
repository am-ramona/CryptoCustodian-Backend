"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
exports.token = process.env.DATABASE_USERNAME;
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const Admin = mongoose_1.default.mongo.Admin;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
const uri = `mongodb+srv://Ramona:1234@cluster0.azwzwo3.mongodb.net/Foodstyles_todos?retryWrites=true&w=majority`;
// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // poolSize: parseInt(process.env.POOL_SIZE!),
};
// mongoose.set("useFindAndModify", false)
mongoose_1.default
    //   .connect(process.env.MONGO_URI!, options as ConnectOptions)
    .connect(uri, options)
    .then((MongooseNode) => {
    const nativeConnetion = MongooseNode.connections[0];
    /* I use the default nativeConnection object since my connection object uses a single hostname and port. Iterate here if you work with multiple hostnames in the connection object */
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    //now call the list databases function
    new Admin(nativeConnetion.db).listDatabases(function (err, results) {
        console.log(results); //store results and use
    });
})
    .catch(error => {
    throw error;
});
