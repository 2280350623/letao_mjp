$(function () {
    // var page=1;
    var pageSize = 5;
    var id,isDelete;
    render(1);
    // 渲染
    function render(p) {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: p,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $('tbody').html(template('user_tpl', info));
                // 分页
                paginator(info, render);
            }
        })
    }

    // 禁止和启用模态框
    $('tbody').on('click','.btn',function(){
        // 弹出模态框
        $('#userModal').modal('show');
        // 获取用户的id及按钮状态
        // console.log($(this).parent());
        id=$(this).parent().data('id');
        isDelete=$(this).hasClass('btn-success')?1:0
    })

    // 模态框功能实现
    $('.comply').on('click',function(){
        // 发送ajax请求
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(info){
                console.log(Math.ceil(id / pageSize));
                if(info.success){
                    //关闭模态框
                    $('#userModal').modal('hide')
                    // 重新渲染表格
                    render(Math.ceil(id / pageSize))
                }
            }
        })
    })
})