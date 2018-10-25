

var fs = require('fs');
var path = require('path');

// Return a list of files of the specified fileTypes in the provided dir, 
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']
function getFilesFromDir(argumentprocess) {
  var fileType = argumentprocess[2];
  var wordInFile = argumentprocess[3];
  var fileName = argumentprocess[1];
  fileName = fileName.split('\\');
  fileName = fileName[fileName.length - 1];
  fileName = fileName.split('.')[0];
  
  if(argumentprocess[2] == undefined && argumentprocess[3] == undefined ){
    return `USAGE: node ${fileName} [EXT] [TEXT]`
  } else {
    var root = process.cwd();
    var dot = ".";
    fileType = dot.concat(fileType);
    root = root.concat('\\');
    var dir = "./";
    var listOfFiles = [];

    function walkDir(currentPath) {
       var files = fs.readdirSync(currentPath);
       for (var i in files) {
         var curFile = path.join(currentPath, files[i]); 
              
         if (fs.statSync(curFile).isFile() && fileType.indexOf(path.extname(curFile)) != -1) {
           var content = fs.readFileSync(curFile,'utf8');
           var wordToSearch = (content.indexOf(wordInFile) > -1) //check if the word is in the file
           if(wordToSearch){
             listOfFiles.push(curFile.replace(dir, ''));
            }
           
         } else if (fs.statSync(curFile).isDirectory()) {
          walkDir(curFile);
         }
       }//for
     };
     walkDir(dir);
     if(listOfFiles.length == 0){
       return "No file was found";
     } else {
       for (var item in listOfFiles){
         listOfFiles[item] = root.concat(listOfFiles[item]);
       }//for 
 
       return listOfFiles; 
     }//else

   }
    
 }//getFilesFromDir func
   
//print the txt files in the current directory
var message = getFilesFromDir(process.argv);//[".js"],"file"
console.log(message);
