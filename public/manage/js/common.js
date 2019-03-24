// 实现一些公共的js功能

// 什么时候开始  什么时候停
// 当ajax请求请求开始的时候，显示进度条
// 当ajax请求结束的时候，隐藏进度条
// jquery.ajax的全局事件
// jquery的ajax全局事件 会 在任意一个ajax请求请求执行的时候触发
// 6 个全局事件
// ajaxStart:   开始进度条
// ajaxSend:
// ajaxSuccess:
// ajaxError:
// ajaxComplete
// ajaxStop  ：   结束进度条
// NProgress.start()
// NProgress.done()
// https://www.cnblogs.com/yangtoude/p/jquery-ajax-formdata-upload.html
NProgress.configure({
  // 禁用进度环
  showSpinner: false
})
$(document).ajaxStart(function() {
  NProgress.start()
  // console.log('ajax开始发送了')
})
$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done()
  }, 500)
  // console.log('ajax结束发送了')
})



// 二级菜单的显示和隐藏
$('.second').prev().on("click", function() {
  // console.log('哈哈')
  $(this).next().stop().slideToggle()
})

// 菜单的显示和隐藏
$('.topbar .left').click(function() {
  $('.lt_aside,.lt_main,.topbar').toggleClass('now')
  // $('.lt_main').toggleClass('now')
  // $('.topbar').toggleClass('now')
})


// 退出功能
$('.topbar .right').on('click', function() {
  $('#logoutModal').modal('show')
})

// 给确定按钮注册事件，注意： 不要在事件中注册事件
$('.confirm').on("click", function() {
  // 发送ajax请求，告诉服务器需要退出
  // $.ajax({
  //   type: 'get',
  //   url: '/employee/employeeLogout',
  //   success: function(info) {
  //     if (info.success) {
  //       location.href = 'login.html'
  //     }
  //   }
  // })


  // 参数1： 直接就是url地址
  // 参数2： 可选的data
  // 参数3： success的回调
  $.get('/employee/employeeLogout', function(info){
    if (info.success) {
      location.href = 'login.html'
    }
  })
  // $.post(url, data, function(){})
})


/** 
 * 通过的分页功能
 * @param {*} info 分页的数据
 * @param {*} render 点击分页后的回调函数
 */
function paginator(info, render) {
  // 分页
  $('#paginator').bootstrapPaginator({
    bootstrapMajorVersion: 3,
    // size: 调整尺寸
    size: 'normal',
    // 当前页
    currentPage: info.page,
    // 总页数
    totalPages: Math.ceil(info.total / info.size),
    // 显示多少页
    numberOfPages: 10,
    // 控制每个按钮的显示内容
    itemTexts: function( type, page, current) {
      // console.log(type, page, current)
      switch(type) {
        case 'first':
          return '首页'
        case 'prev':
          return '上一页'
        case 'next':
          return '下一页'
        case 'last':
          return '尾页'
        default: 
          return page
      }
    },
    // 使用bootstrap的tooltip组件
    useBootstrapTooltip: true,
    onPageClicked: function(a, b, c, p) {
      page = p
      render()
    }
  })
}


// function page(info, render) {
//   $('#paginator').bootstrapPaginator({
//     bootstrapMajorVersion: 3,
//     // 调整尺寸
//     size: 'large',
//     currentPage: info.page,
//     totalPages: Math.ceil(info.total / info.size),
//     onPageClicked: function(a, b, c, page) {
//       // page = p
//       render(page)
//     }
//   })
// }