const { series,parallel,src,dest,watch } = require('gulp');
const babel = require('gulp-babel');
const jsonminify = require('gulp-jsonminify');
const base64 = require('gulp-base64');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const notifier = require('gulp-notify');
const fs = require('fs');
const callfile = require('child_process');
const plumber = require('gulp-plumber');
const clean = require('gulp-clean');
const del = require('del');


// 环境变量区分
// preproduction 测试环境
// production 生产环境
// development 开发环境
const env = process.env.NODE_ENV || 'developmen'
let envValue =  'dist';// env === 'production' ? 'dist' : env === 'preproduction' ? 'prep' : 'test'
console.log('当前环境：'+env+'对应打包地址：'+envValue)




// 编译JS
function jsCompile(event) {
    return src(['src/**/*.js', '!src/config/config.js', '!src/config/config.dev.js'])
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(dest(envValue))
}

// 编译wxs
function wxsCompile() {
    return src(['src/**/*.wxs'])
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(dest(envValue))
}

// 编译json
function jsonCompile() {
    return src(['src/**/*.json'])
        .pipe(jsonminify())
        .pipe(dest(envValue))
}

// 编译less
function lessCompile() {
    return src(['src/**/*.less', '!src/template/*/*.less'])
    .pipe(plumber())
    .pipe(base64({
        extensions: ['svg', 'png', 'jpg', 'gif'],
        maxImageSize: 20 * 1024,
        exclude:[/^(http|https)/]
    }))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(rename({ extname: '.wxss' }))
    .pipe(dest(envValue));
}

// 编译xml
function xmlCompile() {
    return src(['src/**/*.xml'])
        .pipe(plumber())
        .pipe(rename({ extname: '.wxml' }))
        .pipe(dest(envValue));
}

// 编译配置文件
function projectConfig() {
    return src(['project.config.json'])
        .pipe(plumber())
        .pipe(dest(envValue))
        .pipe(notifier('工具打开成功'));
}

// 打开开发工具
function openTool(done) {
    var wechartToolPath = "";
    var ishave = fs.existsSync('wechartToolPath.js');
    if (ishave) {
        var wechartpatr = require('./wechartToolPath');
        wechartToolPath = wechartpatr.path

    } else {
        fs.writeFile('wechartToolPath.js', `const wechartTool={ \n path:'' \n} \n module.exports=wechartTool;`)
    }

    // 项目当前目录 =》 编译目录（开发工具需求的目录）
    var projectPath = __dirname + '/' + 'dist';

    callfile.execFile(`${wechartToolPath}/Contents/Resources/app.nw/bin/cli`, ['-o', projectPath], (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return
        }
        if (stderr) {
            console.log(stderr);
            return
        }

        console.log('工具打开成功\n' + stdout)
    })
    done();
}


// 编译
const build = parallel(jsCompile,wxsCompile,lessCompile,jsonCompile,xmlCompile);

const onError = function(err) {
    notifier.onError({
        title: 'Gulp',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>',
        timeout: 5,
        sound: 'Beep'
    })(err);
};

function watchDel (path,stats){
    console.log(`文件 ${path} 被删除`);
    let xdPath = path.replace('src/','').replace('.xml','.wxml').replace('.less','.wxss');
    let delpath = `${envValue}/${xdPath}`;
    del(delpath)
    console.log(`删除了相对应的编译文件 ${delpath}`);
}
// 监听
function watchAll() {
    // 监听JS和WXS
    let JSwatcher = watch(['src/**/*.js'],jsCompile);
    
    let WXSwatcher =  watch(['src/**/*.wxs'], wxsCompile);
    
    // 监听xml
    let XMLwatcher = watch('src/**/*.xml', xmlCompile);

    // 监听less
    let LESSwatcher = watch('src/**/*.less', lessCompile);

    // 监听json
    let JSONwatcher = watch('src/**/*.json', jsonCompile);

    JSwatcher.on('unlink', watchDel);
    WXSwatcher.on('unlink', watchDel);
    XMLwatcher.on('unlink', watchDel);
    LESSwatcher.on('unlink', watchDel);
    JSONwatcher.on('unlink', watchDel);
}




// 删除build目录的内容
function cleanBuild() {
    console.log('清理旧的编译文件');
    return src(envValue)
        .pipe(clean());
}





// 编译所有文件，并且打开开发者工具
// 编译项目文件，编译配置文件，打开开发工具，监听项目变化
exports.dev = series(cleanBuild,build,projectConfig,openTool,watchAll); // 开发
exports.pro = series(cleanBuild,build,projectConfig,openTool,watchAll); // 生产
exports.prep = series(cleanBuild,build,projectConfig,openTool,watchAll); // 测试
exports.default = series(cleanBuild,build,projectConfig,openTool,watchAll); // 默认（开发）