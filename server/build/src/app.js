"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes = __importStar(require("./routes/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("../swagger.json"));
const morgan_1 = __importDefault(require("morgan"));
const mongodb_1 = __importDefault(require("mongodb"));
dotenv_1.default.config();
const app = express_1.default();
// port to listen
const port = process.env.SERVER_PORT;
// Define swagger options
const options = {
    swaggerDefinition: swaggerDocument,
    // Paths to files containing OpenAPI definitions
    apis: ['../server/**/*.ts'],
};
const swaggerSpec = swagger_jsdoc_1.default(options);
// Connect to MongoDB
mongodb_1.default.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        // tslint:disable-next-line:no-console
        console.log("If you error here, you may have to register you IP for the MongoDB");
        // tslint:disable-next-line:no-console
        return console.log(err);
    }
    // tslint:disable-next-line:no-console
    console.log(`connected to database`);
    const client = db.db("testName");
    // App usages of imported libraries
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.use(morgan_1.default("tiny"));
    // Configure routes
    routes.register(app, client);
    // start the Express server
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${port}`);
    });
});
//# sourceMappingURL=app.js.map