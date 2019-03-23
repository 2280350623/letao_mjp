$(function () {
    var pageSize = 5;
    render(1);
    // 渲染表格
    function render(p) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: p,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $('tbody').html(template('tpl1', info))
                paginator(info, render)
            }
        })
    }

    // 点击按钮添加模态框
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100,
            },
            success: function (info) {
                // console.log(info);
                $('.dropdown-menu').html(template('tpl2', info))
                paginator(info, render)
            }
        })
    })

    // 一级菜单选择功能
    $('.dropdown-menu').on('click', 'li', function () {
        var id = $(this).data('id')
        console.log(id)
        // console.log($(this));
        // console.log($('.menu_name').text());
        // 修改按钮的内容
        $('.menu_name').text($(this).children().text())
        // 动态修改 隐藏域的value值
        $('[name=categoryId]').val(id)
        // 手动修改一级分类校验成功
        $form.data('bootstrapValidator').updateStatus('categoryId','VALID')
    })

    // 图片的上传功能
    $('#btn').fileupload({
        // 图片上传成功后的回调函数
        // e 事件对象
        // data 返回的数据
        done: function (e, data) {
            var result = data.result.picAddr;
            $('.img_box img').attr('src', result);
            $('[name=brandLogo]').val(result)
            // 手动修改上传图片校验成功
            $form.data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    })

    // 表单校验
    var $form = $('form');
    $form.bootstrapValidator({
        // 指定不校验的类型，默认对禁用的 隐藏 不可见的不做校验
        excluded: [],
        // 指定谁进行校验，对应表单中的name属性
        fields: {
            // 对categoryName进行校验
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一个一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类的名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message:'请上传二级分类的图片'
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

    // 注册表单校验成功的事件
    $form.on('success.form.bv',function(e){
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function(info){
                if(info.success){
                    // 隐藏模态框
                    // 重置表单样式
                    // 重新渲染
                    $('#addModal').modal('hide');
                    $form.data('bootstrapValidator').resetForm(true)
                    render(1)
                    // 重置下拉框的文字和图片
                    $('.menu_name').text('请选择一级分类')
                    $('.img_box img').attr('src','images/none.png')
                }
            }
        })
    })
})