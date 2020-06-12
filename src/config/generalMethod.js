import { Message } from 'element-ui'
import Moment from 'moment'
import Vue from 'vue'
// 工具类
let obj = {
    //字符串空值
    isStrNUll: function (str) {
        return str !== null && str !== '' && str !== undefined
    },
    // 往storage内存入对象
    setStorage: function (key, obt) {
        localStorage.setItem(key, JSON.stringify(obt))
    },
    // 从storage内取出对象
    getStorage: function (key) {
        return JSON.parse(localStorage.getItem(key))
    },
    //将首字母转成大写
    convertToCamelCase(str) {
        return str[0].toUpperCase() + str.substring(1)
    },
    //将首字母转成小写
    toLowerCase(str) {
        return str ? str[0].toLowerCase() + str.substring(1) : ''
    },
    // 获取url内某个参数
    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    // 获取url内所有参数（将该url作为参数之一）
    parseQueryString(url) {
        var obj = {};
        var keyvalue = [];
        var key = "",
            value = "";
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        for (var i in paraString) {
            keyvalue = paraString[i].split("=");
            key = keyvalue[0];
            value = keyvalue[1];
            if (value.includes('[')) {
                value = value.replace("[", "").replace("]", "").split(",")
            }
            obj[key] = value;
        }
        // obj.requestUrl = url
        return obj;
    },
    // 将对象转换为url参数
    convertObj(data) {
        var _result = [];
        for (var key in data) {
            var value = data[key];
            if (value.constructor == Array) {
                value.forEach(function (_value) {
                    _result.push(key + "=" + _value);
                });
            } else {
                _result.push(key + '=' + value);
            }
        }
        return _result.join('&');
    },
    //将二进制转换成base64
    arrayBufferToBase64(raw) {
        var base64 = '';
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var bytes = new Uint8Array(raw);
        var byteLength = bytes.byteLength;
        var byteRemainder = byteLength % 3;
        var mainLength = byteLength - byteRemainder;
        var a, b, c, d;
        var chunk;
        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
            d = chunk & 63; // 63 = 2^6 - 1
            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }
        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength];
            a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2;
            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4 // 3 = 2^2 - 1;
            base64 += encodings[a] + encodings[b] + '==';
        }
        else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
            a = (chunk & 16128) >> 8 // 16128 = (2^6 - 1) << 8;
            b = (chunk & 1008) >> 4 // 1008 = (2^6 - 1) << 4;
            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2 // 15 = 2^4 - 1;
            base64 += encodings[a] + encodings[b] + encodings[c] + '=';
        }
        return "data:image/jpeg;base64," + base64;
    },
    // url参数DES解密
    urlParamDecode(obj) {
        let d_obj = {}
        Object.keys(obj).forEach(x => {
            let param = DES.decrypt(obj[x], 'eWordIMCIS').toString(CryptoJS.enc.Utf8)
            d_obj[x] = decodeURI(param.replace(/\"/g, "")).replace(/[\\]/g, '');
        })
        return d_obj
    },
    // 将字符串黏贴到黏贴版
    copyToClipboard(str) {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
            document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    },
    // 将数据集合内的数组处理成字符串
    tranArrtoStr(s) {
        let obj = Object.assign({}, s)
        Object.keys(obj).forEach(x => {
            if (Array.isArray(obj[x])) {
                if (obj[x].length === 0) {
                    delete obj[x]
                } else {
                    obj[x] = obj[x].toString()
                }
            }
        })
        return obj
    },
    // 将数据集合内的字符串处理成数组
    tranStrtoArr(s) {
        let obj = Object.assign({}, s)
        Object.keys(obj).forEach(x => {
            if (typeof obj[x] === 'string' && obj[x].indexOf(',') !== -1) {
                obj[x] = obj[x].split(',')
            }
        })
        return obj
    },
    // 比较对象是否有变动
    compareObjChange(original, now) {
        let rFlag = false
        for (let key in now) {
            if (now[key] !== original[key]) rFlag = true
        }
        return rFlag
    },
    // 重设vue原型
    resetStore(k, v) {
        let protoObj = Object.getPrototypeOf(Object.getPrototypeOf(this))
        protoObj[k] = v
    },
    // 通过天数获取时间范围(字符串)
    getTimeRangeByDays(days) {
        const end = new Date()
        const start = new Date()
        if (days > 1) {
            start.setTime(start.getTime() - 3600 * 1000 * 24 * (days - 1))
        }
        const start1 = Moment(start).format('YYYY-MM-DD 00:00:00')
        const end1 = Moment(end).format('YYYY-MM-DD 23:59:59')
        return [start1, end1]
    },
    getAllRangeDays() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getYear());
        const start1 = Moment(start).format('YYYY-MM-DD 00:00:00');
        const end1 = Moment(end).format('YYYY-MM-DD 23:59:59');
        return [start1, end1]
    },
    // 通过天数获取时间范围(日期)
    getDateByDate() {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getYear());
        return [start, end]
    },

    getDateByDays(days) {
        const end = new Date();
        const start = new Date();
        if (days > 1) {
            start.setTime(start.getTime() - 3600 * 1000 * 24 * (days - 1));
        }
        return [start, end];
    },
    // 时间范围转换为字符串
    dateRangeToString(range) {
        if (!range || range.length != 2) return ''
        return Moment(range[0]).format('YYYY-MM-DD') + '~' + Moment(range[1]).format('YYYY-MM-DD')
    },
    // 获取当前时间根据格式
    getNowTime(f) {
        let fmt = f || 'yyyy-MM-dd hh:mm:ss'
        let date = new Date();
        // var timestamp = (new Date()).getTime();
        const o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds(), // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    },
    // 防抖
    debounce(func, wait = 50) {
        let timer = null
        return function (...args) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                func.apply(this, args)
            }, wait)
        }
    },
    // 节流
    throttle(fn, wait) {
        let inThrottle, lastFn, lastTime;
        return function () {
            const context = this, args = arguments;
            if (!inThrottle) {
                fn.apply(context, args);
                lastTime = Date.now();
                inThrottle = true;
            } else {
                clearTimeout(lastFn);
                lastFn = setTimeout(function () {
                    if (Date.now() - lastTime >= wait) {
                        fn.apply(context, args);
                        lastTime = Date.now();
                    }
                }, wait - (Date.now() - lastTime));
            }
        };
    },

    // 比较相等(无法比较原型链上面的属性)
    equals(a, b) {
        if (a === b) return true;
        if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
        if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
        if (a === null || a === undefined || b === null || b === undefined) return false;
        if (a.prototype !== b.prototype) return false;

        let keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) return false;
        return keys.every(
            key => equals(a[k], b[k])
        )
    },
    // 获取长度
    getSize(val) {
        return Array.isArray(val)
            ? val.length
            : val && typeof val === 'object'
                ? val.size || val.length || Object.keys(val).length
                : typeof val === 'string'
                    ? new Blob([val]).size
                    : 0;
    },
    //拉平数组
    deepFlatten(arr) {
        [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))
    },
    //提取html 内容
    stripHTMLTags(str) {
        str.replace(/<[^>]*>/g, '')
    },
    //生成uuid
    uuid() {
        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    },
    // 阻止失焦
    proventBlur(e) {
        e.preventDefault()
    },

    // 导出表格的方法
    exportOutXLSX() {
        let dom = document.querySelector('#exportTable')
        let wb = XLSX.utils.table_to_book(dom, { raw: true }) // raw-解决默认把内容是数字的字符串当做数字处理导致数字前的0丢失的问题
        let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
        saveAs(new Blob([xlsxToArrayBuffer(wbout)], { type: 'application/octet-stream' }), 'testSheet.xlsx')
    },
    // 保存下载excel
    saveAs(obj, fileName) {
        var tmpa = document.createElement('a')
        tmpa.download = fileName || '下载'
        tmpa.href = URL.createObjectURL(obj) //绑定a标签
        tmpa.click() //模拟点击实现下载
        setTimeout(function () {
            //延时释放
            URL.revokeObjectURL(obj) //用URL.revokeObjectURL()来释放这个object URL
        }, 100)
    },
    xlsxToArrayBuffer(s) {
        if (typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(s.length)
            var view = new Uint8Array(buf)
            for (var i = 0; i != s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xff
            }
            return buf
        } else {
            var buf = new ArrayBuffer(s.length)
            for (var i = 0; i != s.length; ++i) {
                buf[i] = s.charCodeAt(i) & 0xff
            }
            return buf
        }
    },
    // 深拷贝
    deepClone(obj) {
        let clone = Object.assign({}, obj);

        Object.keys(clone).forEach(
            key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
        );

        return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
    },
    // 回到顶部
    scrollToTop() {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    }

}
export default obj