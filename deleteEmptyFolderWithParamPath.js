//example 'node main test' where test - its url to your folder
const fs = require('fs');
const folder = process.argv[2]
if(!folder){ 
	//if folder does not exist
	console.log('no folder for delete')
}
else{
  fs.rmdir(folder,(err)=>{
    if(err) {
    	//if folder does not empty
    	console.log(err)
    }
    //if deleting is success
    console.log(`delete folder - ${folder}`)
  })
}