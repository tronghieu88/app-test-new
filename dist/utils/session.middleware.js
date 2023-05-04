"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const session = require("express-session");
exports.sessionMiddleware = session({
    secret: 'hello',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2000000 },
});
//# sourceMappingURL=session.middleware.js.map