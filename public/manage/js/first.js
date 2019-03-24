var page = 1
$(function() {
  var pageSize = 5
  // 渲染
  render()

  /* 
    添加分类
    1. 给按钮注册点击事件
    2. 准备一个添加的模态框
    3. 显示这个模态框
    4. 实现表单校验功能
    5. 表单校验通过，发送ajax请求，添加一级分类
    6. 添加成功后，关闭模态框，重新渲染
  */
  $('.btn_add').on('click', function() {
    $('#addModal').modal('show')
  })

  // 表单校验功能
  var $form = $('form')
  $form.bootstrapValidator({
    // 指定对谁进行校验， 对应表单中的name属性
    fields: {
      // 对categoryName进行校验
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类的名称不能为空'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    }
  })


  // 给表单注册表单校验成功的=事件
  $form.on('success.form.bv', function(e) {
    // 阻止浏览器的默认行为
    e.preventDefault()
    // console.log('哈哈')
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $form.serialize(),
      success: function(info) {
        console.log(info)
        if (info.success) {
          $('#addModal').modal('hide')
          // 重置表单样式
          $form.data('bootstrapValidator').resetForm(true)
          // 重新渲染第一页， 因为最新增加的数据在第一页
          page = 1
          render()
        }
      }
    })
  })

  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        // console.log(info)
        $('tbody').html( template('tpl', info) )
        paginator(info, render)
      }
    })
  }
})