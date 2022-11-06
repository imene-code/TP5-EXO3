const fs = require('fs');

function Grep(regEx,...Files){
   
    const regex = new RegExp(regEx);
    
    for(f in Files){

        const isDir = fs.statSync(`./${Files[f]}`).isDirectory();
        
        if(!isDir){
            const data = fs.readFileSync(`${Files[f]}`, 'utf8');		
            if(regex.test(data)){
                
                return `found in: ${Files[f]}`;
            }
        }else{
            let recFiles = fs.readdirSync(Files[f]);
            for(file in recFiles){
                recFiles[file] = `./${Files[f]}/${recFiles[file]}`;
            }
            
            return Grep(regEx,...recFiles);
        }
        

    }
    return "Not found";
}
console.log(Grep("aze",'tstA','tstB','tstC','D'))