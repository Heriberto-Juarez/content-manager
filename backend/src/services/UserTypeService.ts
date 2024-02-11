interface IUserType {
    key: string,
    displayText: string;
}

enum AllUserTypes {
    ADMIN="Administrador",
    READER="Creador",
    CREATOR="Lector"
}

export class UserTypeService {

    /**
     * List all user types available for the public use (not including admin)
     */
    listAvailableTypes() : string[]{
        const all = Object.values(AllUserTypes)
        return all.filter((type)=>{
            return type != AllUserTypes.ADMIN
        })
    }

    existsType(type : string){
        return Object.values(AllUserTypes).some((currentType)=>currentType === type)
    }

    isAdmin(role : string){
        return role == AllUserTypes.ADMIN;
    }

    isCreator(role : string){
        return role == AllUserTypes.CREATOR;
    }

    isReader(role : string){
        return role == AllUserTypes.READER;
    }
}