/**
 * YDUI 可伸缩布局方案
 * rem计算方式：设计图尺寸px / 100 = 实际rem  例: 100px = 1rem
 * 核心的思想： 假设一个在750宽设计图上占240，那么它在375上占多少？
 * 很明显 240:750 = x:375 那么x=（375/750）* 240 为了计算方便
 * （375/750）* 100给扩大100倍 然后给实际像素240/100给缩小100倍
 * 375就是clientWidth 750就是designWidtih
 * 然后就是设置屏幕的上下限[320，420] iphone5:320px iphone
 */
!function (window) {
  // 设计文档的宽度
  var docWidth = 750
  var doc = window.document
  var docEl = doc.documentElement
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  var recalc = (function refreshRem() {
    var clientWidth  = docEl.getBoundingClientRect().width
    console.log("当前的html的宽度：", clientWidth)
    var font = (clientWidth / docWidth) * 20 * 5
    console.log(font)
    // 8.55: 小于320px不再缩小， 11.2: 大于420不再放大
    docEl.style.fontSize = Math.max(Math.min((clientWidth / docWidth) * 20, 11.2), 8.55) * 5 + 'px'
    return refreshRem
  })()
  // 添加倍屏标识，安卓为1
  docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1)
  if (/iP(hone|ad|od)/.test(window.navigator.userAgent)) {
    // 添加IOS标识
    doc.documentElement.classList.add('ios')
    /* IOS8以上给html添加hairline样式，以便特殊处理 */
    if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8) {
      doc.documentElement.classList.add('hairline');
    }
  }
  if (!doc.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
} (window)
