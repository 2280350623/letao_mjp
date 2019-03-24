var page = 1
$(function(){
  // 1. 等待DOM的加载
  // 2. 避免了全局污染
  
  var pageSize = 5
  var id, isDelete
  // 发送ajax请求
  render()


  // 启用和禁用功能
  // 1. 给启用和禁用注册点击事件
  // 2. 弹出模态框
  // 3. 给确定注册点击事件
  // 4. 发送ajax请求，启用获取禁用用户
  $('tbody').on('click', '.btn', function() {
    // 弹出模态框
    $('#userModal').modal('show')

    // 获取到用户的id 以及 启用禁用的状态  this.parentNode.dataset.id
    id = $(this).parent().data('id')
    
    // isDelete
    // var isDelete = $(this).text() === '启用' ? 1 : 0
    isDelete = $(this).hasClass('btn-success') ? 1 : 0
    // console.log(id, isDelete)
  })

  $('.update').on('click', function() {
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete 
      },
      success: function(info) {
        console.log(info)
        if (info.success) {
          // 关闭模态框
          $('#userModal').modal('hide')
          // 重新渲染
          render()
        }
      }
    })
  })


  // 渲染
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info)
        // 在模版引擎中可以直接访问info对象的属性
        var html = template('user_tpl', info)
        $('tbody').html(html)
        paginator(info, render)
      }
    })
  }

})