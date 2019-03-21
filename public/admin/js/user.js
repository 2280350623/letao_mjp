$(function () {
    // var page=1;
    var pageSize = 5;
    var id,isDelete;
    render(1);
    // 渲染
    function render(page) {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var html=template('user_tpl', info);
                $('tbody').html(html);
                // 分页
                paginator(info, render);
            }
        })
    }

    // 禁止和启用功能
    $('tbody').on('click','.btn',function(){
        // 弹出模态框
        $('#userModal').modal('show');
        // 获取用户的id及按钮状态
        console.log($(this).parent());
        id=$(this).parent().data('id');
        isDelete=$(this).text('启用')?1:0
    })
})