"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const uuid_1 = require("uuid");
class Client {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
}
exports.Client = Client;
//# sourceMappingURL=client.entity.js.map