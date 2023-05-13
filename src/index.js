/**
 * 迷你打印
 * @param {string | object} printConfig 打印配置项。
 *   printConfig 为 string 类型时表示元素 id；
 *   printConfig 为 object 类型时可选值如下：
 *     id       - 元素 id；
 *     extraCss - 打印时生效的外部 css 文件的路径，该路径相对于当前使用插件的文件。默认值：'print.css'。
 *   其他说明：
 *     所有类名为 no-print 的元素将不会被打印。
 * @returns
 */
// 用于缓存创建的 iframe，减少创建次数
let iframe = null
function miniPrint(printConfig) {
  // 打印所需目标元素的 id
  const id = typeof printConfig === 'string' ? printConfig : printConfig.id

  // 获取一份目标元素的深拷贝
  const targetEl = document.getElementById(id)?.cloneNode(true)

  // 找不到目标元素，则退出
  if (!targetEl) return Promise.reject(`无法找到 id 为 ${id} 的元素。`)

  // 获取所有类名为 no-print 的元素，并将它们隐藏
  const noPrintElList = targetEl.getElementsByClassName('no-print')
  for (const noPrintEl of noPrintElList) {
    noPrintEl.style.display = 'none'
  }

  if (!iframe) {
    // 创建 <iframe> 作为打印容器
    iframe = document.createElement('iframe')

    // 隐藏 <iframe>
    iframe.style.cssText = `
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border: 0;
     `

    // <iframe> 添加至 <body>
    document.body.appendChild(iframe)
  }

  // contentWindow 属性返回当前 iframe 的 Window 对象。可以使用这个 Window 对象去访问这个 iframe 的文档和它内部的 DOM。
  const iframeWindow = iframe.contentWindow
  const iframeDocument = iframeWindow.document

  // 创建 <link> 标签，引入打印所需的外部样式文件
  const linkEl = document.createElement('link')
  linkEl.rel = 'stylesheet'
  linkEl.type = 'text/css'
  linkEl.media = 'print'

  // 当前正在使用插件的文件路径
  const currentPath = getCurrentVuePath()

  linkEl.href = printConfig.extraCss ? currentPath + '/' + printConfig.extraCss : currentPath + '/print.css'
  iframeDocument.head.appendChild(linkEl)

  // 目标元素添加至 <iframe> 中
  iframeDocument.body.innerHTML = targetEl.outerHTML

  // 确保样式加载完成后再打印
  linkEl.onload = function () {
    iframeWindow.print()
  }

  // 文档已开始打印或打印预览已关闭之后触发
  iframeWindow.addEventListener('afterprint', function () {
    // 清空 iframe
    iframeDocument.body.innerHTML = ''
  })
}

// 获取当前正在使用该插件的 Vue 文件路径
function getCurrentVuePath() {
  // 获取当前正在使用该插件的 script 元素
  const scripts = document.getElementsByTagName('script')
  const currentScript = scripts[scripts.length - 1]

  // 获取当前 Vue 组件文件所在的路径
  const scriptSrc = currentScript.src
  const currentPath = scriptSrc.slice(0, scriptSrc.lastIndexOf('/'))

  return currentPath
}

export default miniPrint
