"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var server_1 = require("@/server");
(0, dotenv_1.config)();
server_1["default"].listen(server_1.port);
