"use strict";
exports.__esModule = true;
var react_1 = require("react");
var utilts_1 = require("../utilts");
var Part = function (_a) {
    var part = _a.part;
    switch (part.type) {
        case "normal":
            console.log('normal', part);
            return (react_1["default"].createElement("div", null,
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("b", null,
                        part.name,
                        " ",
                        part.exerciseCount),
                    react_1["default"].createElement("br", null),
                    part.description)));
        case "groupProject":
            console.log('groupProject', part);
            return (react_1["default"].createElement("div", null,
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("b", null,
                        part.name,
                        " ",
                        part.exerciseCount),
                    react_1["default"].createElement("br", null),
                    "Project exercises ",
                    part.groupProjectCount)));
        case "submission":
            console.log('submission', part);
            return (react_1["default"].createElement("div", null,
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("b", null,
                        part.name,
                        " ",
                        part.exerciseCount),
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("i", null, part.description),
                    react_1["default"].createElement("br", null),
                    "submit to ",
                    part.exerciseSubmissionLink)));
        default:
            console.log('default');
            return utilts_1.assertNever(part);
    }
};
exports["default"] = Part;
