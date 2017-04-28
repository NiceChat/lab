;(function(win, lib) {
    var doc = win.document;
    var docEl = window.docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    // 如果存在已经设置的meta标签，那就根据设置的meta属性来设置
    if (metaEl) {
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/)
        if (match) {
            scale = parseInt(match[1])
            dpr = parseInt(1 / scale)
        }    
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content')
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/)
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/)
        }
        if (initialDpr) {
            dpr = parseFloat(initialDpr[1])
            scale = parseFloat((1 / dpr).toFixed(2))
        }
        if (maximumDpr) {
            dpr = parseFloat(maximumDpr[1])
            scale = parseFloat((1 / dpr).toFixed(2))
        }
    }

    // 没有设置viewport和flexiable
    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi)
        var isIPhone = win.navigator.appVersion.match(/iphone/gi)
        var devicePixelRatio = win.devicePixelRatio
        if (isIPhone) {
            // ios下，对于大于3的比率的屏采用3倍，采用2倍的方案，其余采用1倍的方案
            if (devicePixelRatio >= 3 && (!dpr || dpr>=3)) {
                dpr = 3
            } else if(devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2
            } else {
                dpr = 1
            }
        } else {
            // 安卓设备是1
            dpr = 1
        }
        scale = 1 / dpr
    }

    docEl.setAttribute('data-dpr', dpr)
    // 创建viewport 并生成对应的缩放比例
    if (!metaEl) {
        metaEl = document.createElement('meta')
        metaEl.setAttribute('name','viewport')
        metaEl.setAttribute('content', 'initial-scale='+ scale +', maximum-scale='+ scale +', minimum-scale='+ scale +', user-scalable=no')
        // header 里面添加meta
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl)
        } else {
            console.warn('我干根本找不到header呀！')
        }
    }
    // 设置html的fontSize大小
    function refreshRem () {
        window.doc = docEl.getBoundingClientRect()
        var width = docEl.getBoundingClientRect().width
        console.log("当前的html的宽度：", width)
        var rem = width / 10
        docEl.style.fontSize = rem + 'px'
    }
    refreshRem()
    win.addEventListener('resize', function () {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
    })

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px'
    } else {
        doc.addEventListener('DOMContentLoaded', function (e){
            doc.body.style.fontSize = 12 * dpr + 'px'
        }, false)
    }

    flexible.dpr = win.dpr = dpr
    flexible.refreshRem = refreshRem
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));