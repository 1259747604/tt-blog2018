const koaBody = require("koa-body");
const {join} = require("path");
/*上传文章图片*/
exports.uploadArtImg = koaBody({
    multipart:true,
    formidable: {
        // 上传存放的路径
        uploadDir: join(__dirname, `../static/artImg`),
        // 保持后缀不变
        keepExtensions: true,
        // 文件大小
        maxFileSize: 10 * 1024 * 1024,
        onFileBegin: (name, file) => {
            // 取后缀  如：.js  .txt
            const reg = /\.[A-Za-z]+$/g;
            const ext = file.name.match(reg)[0];

            // 修改上传文件名
            file.path = join(__dirname, "../static/artImg/") + Date.now() + ext;
            file.name = Date.now() + ext;
        },
        onError(err){
            ctx.err = err;
        }
    }
});

/*上传MP3*/
exports.uploadMusic = koaBody({
    multipart:true,
    formidable: {
        // 上传存放的路径
        uploadDir: join(__dirname, `../static/music`),
        // 保持后缀不变
        keepExtensions: true,
        // 文件大小
        maxFileSize: 30 * 1024 * 1024,
        onFileBegin: (name, file) => {
            // 取后缀  如：.js  .txt
            const reg = /\.[A-Za-z0-9]+$/g;
            const ext = file.name.match(reg)[0];

            // 修改上传文件名
            const time = Date.now();
            file.path = join(__dirname, "../static/music/") + time + ext;
            file.name = time + ext;
        },
        onError(err){
            console.log(err);
        }
    }
});

/*上传歌词*/
exports.uploadLrc = koaBody({
    multipart:true,
    formidable: {
        // 上传存放的路径
        uploadDir: join(__dirname, `../static/lrc`),
        // 保持后缀不变
        keepExtensions: true,
        // 文件大小
        maxFileSize: 30 * 1024 * 1024,
        onFileBegin: (name, file) => {
            // 取后缀  如：.js  .txt
            const reg = /\.[A-Za-z0-9]+$/g;
            const ext = file.name.match(reg)[0];

            // 修改上传文件名
            const time = Date.now();
            file.path = join(__dirname, "../static/lrc/") + time + ext;
            file.name = time + ext;
        },
        onError(err){
            console.log(err);
        }
    }
});