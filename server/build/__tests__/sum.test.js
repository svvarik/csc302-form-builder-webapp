"use strict";
// Dummy test
Object.defineProperty(exports, "__esModule", { value: true });
const sum_1 = require("../src/sum");
test('basic', () => {
    expect(sum_1.sum()).toBe(0);
});
test('basic again', () => {
    expect(sum_1.sum(1, 2)).toBe(3);
});
//# sourceMappingURL=sum.test.js.map