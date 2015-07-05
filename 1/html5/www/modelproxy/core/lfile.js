var fs = require('fs');//
var utils = require('./lutil.js').utils;

var lfile = {
	/**
	 * 移动文件
	 * @param {} files
	 * @param {} dstDir
	 */
	moveFiles : function(files, dstDir) {
		//目标目录创建
		this.sendLog("创建目标文件！");
		this.makedir(dstDir);
		this.sendLog("成功创建目标文件！");

		this.sendLog("移动目标文件！");
		//移动文件
		var newFilePath = null;
		for (var file in files) {
			//获取新文件的全地址
			newFilePath = this.getFileNewFullPath(dstDir, file);
			this.makedir(newFilePath);
			this.copyFile(file, newFilePath);
		}

		this.sendLog("成功移动目标文件！");
	},
	/**
	 * 获取文件全路径
	 * @param {} dstDir
	 * @param {} file
	 * @return {}
	 */
	getFileNewFullPath : function(dstDir, file) {
		var paths = null, split = '';
		if (file.match("htdocs")) {
			split = "htdocs";
		} else if (file.match("template")) {
			split = "template";
		}
		paths = file.split(split);

		var newPath = dstDir + "/" + split + paths[1];
		return newPath;
	},
	/**
	 * 监听文件的变化
	 * @param {} files
	 * @param {} timeInterval
	 * @param {} callback
	 */
	watchFileChange : function(files, timeInterval, callback) {
		var _this = this;
		this.sendLog("开始监听文件");
		this.watchTag && clearInterval(this.watchTag);
		this.watchTag = setInterval(function() {
					for (var file in files) {
						if (_this.isFileChange(files[file])) {
							_this.sendLog("文件：" + file + " 发生改变！");
							callback && callback(file, files[file]['md5']);
						}
					}
				}, timeInterval);
	},
	/**
	 * 文件是否改变
	 * @param {} fileObj
	 * @return {Boolean}
	 */
	isFileChange : function(fileObj) {
		var strMd5 = this.fmd5(fileObj.path);
		if (fileObj.md5 === strMd5) {
			return false
		} else {
			fileObj.md5 = strMd5;
			return true;
		}
	},
	md5 : function(str) {
		return require('crypto').createHash('md5').update(str).digest('hex');
	},
	fmd5 : function(filePath) {
		var file = fs.readFileSync(filePath).toString();
		return this.md5(file);
	},
	renameFile : function(src, dst) {
		fs.renameSync(src, dst);
	},
	copyFile : function(src, dst) {
		var is = fs.createReadStream(src);
		var os = fs.createWriteStream(dst);
		is.pipe(os);
	},
	makedir : function(dir) {
		var dirs = dir.split("/");
		var newDirs = [dirs[0]];
		var len = dirs.length;
		for (var i = 0; i < len; i++) {
			if (i === len - 2 && dirs[i + 1].match(/\./)) {
				return;
			}
			newDirs.push(dirs[i + 1]);
			if (!fs.existsSync(newDirs.join("/"))) {
				fs.mkdirSync(newDirs.join("/"), 0755)
			}
		}
	},
	rmdirSync : function(dir, cb) {
		cb = cb || function() {
		};
		function iterator(url, dirs) {
			var stat = fs.statSync(url);
			if (stat.isDirectory()) {
				dirs.unshift(url);//收集目录
				inner(url, dirs);
			} else if (stat.isFile()) {
				fs.unlinkSync(url);//直接删除文件
			}
		}
		function inner(path, dirs) {
			var arr = fs.readdirSync(path);
			for (var i = 0, el; el = arr[i++];) {
				iterator(path + "/" + el, dirs);
			}
		}

		var dirs = [];
		try {
			iterator(dir, dirs);
			for (var i = 0, el; el = dirs[i++];) {
				fs.rmdirSync(el);//一次性删除所有收集到的目录
			}
			cb()
		} catch (e) {//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
			e.code === "ENOENT" ? cb() : cb(e);
		}
	},
	modifyFileContent : function(file, regExp, cb) {
		//查找
		
		var _this = this;
		
		fs.readFile(file, 'utf-8', function(err, data) {
					if (err) {
						_this.sendLog(err, 'error');
						return;
					}
					data = data.replace(regExp, cb);
					console.log("\n"+data);
					//修改
					fs.writeFile(file, data, function(e) {//会先清空原先的内容
								if (e) {
									_this.sendLog(err, 'error');
								};

							})
				});

	},
	/**
	 * 在某目录中查找文件
	 * @param {} root
	 * @param {} type
	 * @return {}
	 */
	getAllFiles : function(root, type) {
     
		var reg = RegExp(type||'.');
		var result = {}, files = fs.readdirSync(root);
		var _this = this;
		files.forEach(function(file) {
					var pathname = root + "\/" + file, stat = fs
							.lstatSync(pathname)
					if (stat === undefined )
						return
					if (!stat.isDirectory()) {
						if (reg.test(pathname)) {
							result[pathname] = {
								md5 : _this.fmd5(pathname),
								path : pathname
							};
						}
					} else {
						utils.extend(result, _this.getAllFiles(pathname,reg));
					}
				});
		return result
	},
	setLog : function(JSlog) {
		this.JSlog = JSlog;
	},
	sendLog : function(text, type) {
		if (this.JSlog) {
			this.JSlog.sendLog(text, type);
		}
	}
}
exports.lfile = lfile;
