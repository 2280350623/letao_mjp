$(function(){
    var pageSize=5;
    render(1);
    // 渲染
    function render(p){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data :{
                page:p,
                pageSize:pageSize,
            },
            success:function(info){
                // console.log(info);
                $('tbody').html(template('tpl',info));
                // 渲染分页
                paginator(info,render)
            }
        })
    }
    // 点击弹出模态框
    $('.btn_add').on('click',function(){
        // 弹出模态框
        $('#addModal').modal('show');
    })
    // 表单校验
    var $form=$('form');
    $form.bootstrapValidator({
        // 指定对谁进行校验，对应表单中的name属性
        fields:{
            // 对categoryName进行校验
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'一级分类的名称不能为空'
                    }
                }
            }
        },
        feedbackIcons:{
            valid:'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        }
    })

    // 表单注册校验成功事件
    $form.on('success.form.bv',function(e){
        // 阻止浏览器的默认行为
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(info){
                // console.log(info);
                if(info.success){
                    // 模态框隐藏
                    // 重置表单样式和内容
                    // 重新渲染列表,新增加的数据在第一页
                    $('#addModal').modal('hide')
                    $('form').data('bootstrapValidator').resetForm(true)
                    render(1)
                }
            }
        })
    })
})