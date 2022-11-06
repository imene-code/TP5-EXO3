const fs = require('fs');
const path = require('path');
function Grep(regEx,...Files){
   
    const regex = new RegExp(regEx);
    const found = []
    for(f in Files){

        const isDir = fs.statSync(`./${Files[f]}`).isDirectory();
        
        if(!isDir){
            const data = fs.readFileSync(`${Files[f]}`, 'utf8');
            if(regex.test(data)){
                
                found.push(Files[f])
            }
        }else{
            let recFiles = fs.readdirSync(Files[f]);
            for(file in recFiles){
                recFiles[file] = `./${Files[f]}/${recFiles[file]}`;
            }
            
               let res = Grep(regEx,...recFiles);
               res.forEach((e)=>{
                found.push(path.basename(e))
               })
        }
        

    }
    
    return found? found :"NONE";
}
console.log(Grep("aze",'tstA','tstB','tstC','D'))
