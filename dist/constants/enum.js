"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortProduct = exports.RegisterType = exports.RoleEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["USER"] = "USER";
    RoleEnum["ADMIN"] = "ADMIN";
    RoleEnum["GUEST"] = "GUEST";
})(RoleEnum = exports.RoleEnum || (exports.RoleEnum = {}));
var RegisterType;
(function (RegisterType) {
    RegisterType["GOOGLE"] = "Google";
    RegisterType["FACEBOOK"] = "Facebook";
    RegisterType["NORMAL"] = "Normal";
})(RegisterType = exports.RegisterType || (exports.RegisterType = {}));
var SortProduct;
(function (SortProduct) {
    SortProduct["ProductId"] = "productId";
    SortProduct["Price"] = "price";
    SortProduct["Discount"] = "discount";
    SortProduct["Quantity"] = "quantity";
    SortProduct["Rating"] = "rating";
})(SortProduct = exports.SortProduct || (exports.SortProduct = {}));
(0, graphql_1.registerEnumType)(SortProduct, {
    name: 'SortProduct',
});
//# sourceMappingURL=enum.js.map