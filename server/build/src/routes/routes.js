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
exports.register = void 0;
const integration = __importStar(require("../integration"));
const Form_1 = __importDefault(require("../classes/Form"));
const register = (app, db) => {
    /**
     * @swagger
     * /:
     *   get:
     *     summary: Retrieve Hello World
     *     description: Test if the homepage endpoint is working correctly
     */
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    /**
     * @swagger
     * /save:
     *   post:
     *     summary: Save form body into database
     *     description: Given a JSON in requried format, read the json into Objects and save to database
     *     parameters:
     *       - name: Form
     *         description: A JSON representing a Form
     *         in: Form Body
     *         required: true
     *         type: JSON
     *     responses:
     *       200:
     *         description: All Good!
     */
    app.post('/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const form = Form_1.default.build(req.body);
        const status = yield integration.insertForm(form, db);
        res.sendStatus(status);
    }));
    /**
     * @swagger
     * /newForm:
     *   get:
     *     summary: Get a new unique formID
     *     description: Generate a new unique form ID and return it
     */
    app.get('/newForm', (_, res) => {
        const formID = integration.getFormID();
        res.send(formID);
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map