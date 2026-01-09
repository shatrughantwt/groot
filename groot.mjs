import path from 'path';
import fs from 'fs/promises';
class Groot{
    constructor(repoPath = '.'){
        this.repoPath = path.join(repoPath, '.groot');
        this.objectsPath = path.join(repoPath, 'objects');
        this.headPath = path.join(repoPath, 'HEAD');
        this.indexPath = path.join(repoPath, 'index');
        this.init();
    }

    async init(){
        await fs.mkdir(this.objectsPath, {recursive: true});
        try {
            await fs.writeFile(this.headPath, "", {flag: 'wx'})
            await fs.writeFile(this.indexPath, JSON.stringify([]), {flag: 'wx'})
        } catch (error) {
            console.log("Aready initilised the .groot folder")
        }
    }
};

const groot = new Groot();