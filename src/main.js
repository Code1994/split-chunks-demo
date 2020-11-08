// 同步chunk
import _ from 'lodash'
// 同步chunk
import axios from 'axios'

// ③引入d.js 用来测试同入口文件的公共代码分包
import '@/assets/js/d.js'

const btn = document.createElement('button')
btn.innerText = 'import a.js'
btn.onclick = function () {
  // 异步chunk a>>>jquery
  import('@/assets/js/a.js')
  // 异步chunk b>>>jquery
  import('@/assets/js/b.js')
  // 异步chunk 加载
  // import('axios')
  import('@/assets/js/c.js')
}
document.body.appendChild(btn)

console.log('main.js')
