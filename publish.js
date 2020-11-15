const OSS = require('ali-oss')
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
var filesList = [];
//加载env配置文件
const dotenv = require("dotenv")
dotenv.config()
 
function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {      
            readFileList(path.join(dir, item), filesList);  //递归读取文件
        } else {                
            filesList.push(fullPath);                     
        }        
    });
    return filesList;
}
var new_file_list = [];
readFileList(__dirname+'/public',filesList);
filesList.forEach(element => {
    new_file_list.push(element.replace(__dirname+'/',""))
});

const client = new OSS({
  bucket: process.env.AliyunOssBucket,
  // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
  region: process.env.AliyunOssRegion,
  // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
  accessKeyId: process.env.AliyunOssAccessKeyId,
  accessKeySecret: process.env.AliyunOssAccessKeySecret,
});

async function put (file_name) {
  try {
    //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
    let result = await client.put(file_name.replace("public/",""), file_name)
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

//put();
new_file_list.forEach(element => {
    put(element);
});