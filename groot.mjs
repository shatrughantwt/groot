import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto'
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
    hashObject(content){
        return crypto.createHash('sha1').update(content, 'utf-8').digest('hex');
    }
    async add(fileToBeAdd){
        const data = await fs.readFile(fileToBeAdd, {encoding: 'utf-8'});
        const fileHash = this.hashObject(fileData);
        console.log(fileHash);
        const newFileHashedObjectPath = path.join(this.objectsPath, fileHash)
        await fs.writeFile(objectPath, fileData)

        console.log(`Added ${fileToBeAdd}`)
    }

    async updateStagingArea(filePath, fileHash){
        const index = JSON.parse(await fs.readFile(this.indexPath, {encoding: 'utf-8'}));

        index.push({path: filePath, hash: fileHash})
        await fs.writeFile(this.indexPath, JSON.stringify(index))
    }
};

const groot = new Groot();
groot.add('sample.txt')