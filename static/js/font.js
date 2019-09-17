(function (docs, win) {
  var deviceWidth = document.documentElement.clientWidth
  if (deviceWidth > 768) {
    deviceWidth = 768
  } else if (deviceWidth < 320) {
    deviceWidth = 320
  }
  var resizeEvts = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalcs = function () {
    deviceWidth = document.documentElement.clientWidth
    if ( deviceWidth > 768 ) {
      deviceWidth = 768
    } else if ( deviceWidth < 320 ) {
      deviceWidth = 320
    }
    document.documentElement.style.fontSize = deviceWidth / 10 + 'px'
  }
  recalcs()
  if (!docs.addEventListener) return
  win.addEventListener(resizeEvts, recalcs, false)
})(document, window)
