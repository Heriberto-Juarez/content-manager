import fileUpload from 'express-fileupload';
import shortUUID from 'short-uuid';
import path from 'path'
import fs from 'fs'

export class UploadService {
    
    uploadFolder = '';

    constructor(){
        this.uploadFolder = path.join(__dirname, '../../upload');
        this.buildPath(this.uploadFolder)
    }

    buildPath(pathToBuild : string){
        if (!fs.existsSync(pathToBuild)){
            fs.mkdirSync(pathToBuild)
        }
    }

    upload(file : fileUpload.UploadedFile, subdirectory : string){
        const fullUploadPath = path.join(this.uploadFolder, subdirectory);
        this.buildPath(fullUploadPath)
        return new Promise<string>((resolve, reject)=>{
            const extension = path.extname(file.name);
            const newName = `${shortUUID().generate()}${extension}`
            file.mv(path.join(fullUploadPath, newName), (err)=>{
                if (err){
                    reject(err);
                }else{
                    resolve(newName);
                }
            })

        })

    }

}