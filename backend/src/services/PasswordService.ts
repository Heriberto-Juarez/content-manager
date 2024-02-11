import bcrypt from 'bcrypt'

export class PasswordService {
    hash(password : string) : Promise<string>{
        return new Promise((resolve, reject)=>{
            bcrypt.genSalt(10, function(err, salt) {
                if (err){
                    reject();
                }else {
                    bcrypt.hash(password, salt, function(err, hash) {
                        if (err){
                            reject(err);
                        }else{
                            resolve(hash)
                        }
                    });
                }
            });
        })
    }

    verify(passwordHash : string, plainPassword : string) : Promise<boolean> {
        return new Promise((resolve, reject)=>{
            bcrypt.compare(plainPassword, passwordHash, function (_, result) {
                resolve(result)
            })
        })
    }
}