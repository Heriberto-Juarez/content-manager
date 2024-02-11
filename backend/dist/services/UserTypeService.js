"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeService = void 0;
var AllUserTypes;
(function (AllUserTypes) {
    AllUserTypes["ADMIN"] = "Administrador";
    AllUserTypes["READER"] = "Creador";
    AllUserTypes["CREATOR"] = "Lector";
})(AllUserTypes || (AllUserTypes = {}));
class UserTypeService {
    /**
     * List all user types available for the public use (not including admin)
     */
    listAvailableTypes() {
        const all = Object.values(AllUserTypes);
        return all.filter((type) => {
            return type != AllUserTypes.ADMIN;
        });
    }
    existsType(type) {
        return Object.values(AllUserTypes).some((currentType) => currentType === type);
    }
    isAdmin(role) {
        return role == AllUserTypes.ADMIN;
    }
    isCreator(role) {
        return role == AllUserTypes.CREATOR;
    }
    isReader(role) {
        return role == AllUserTypes.READER;
    }
}
exports.UserTypeService = UserTypeService;
//# sourceMappingURL=UserTypeService.js.map