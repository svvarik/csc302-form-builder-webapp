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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertForm = exports.getFormID = void 0;
const insertForm = (form, db) => __awaiter(void 0, void 0, void 0, function* () {
    const formCollection = db.collection("forms");
    try {
        yield formCollection.insertOne(form.getJson());
        return 200;
    }
    catch (err) {
        return 401;
    }
});
exports.insertForm = insertForm;
const getFormID = () => {
    const formID = Date.now();
    return String(formID);
};
exports.getFormID = getFormID;
//# sourceMappingURL=integration.js.map