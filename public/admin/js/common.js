$(function () {
    // 配置禁用小圆环
    NProgress.configure({ showSpinner: false });

    //ajaxStart 所有的 ajax 开始调用
    $(document).ajaxStart(function () {
        NProgress.start()
        // console.log('ajax发送')
    })

    //ajaxStop 所有的 ajax 结束调用
    $(document).ajaxStop(function () {
        // 模拟网络延迟
        setTimeout(function () {
            NProgress.done()
        }, 500)
    })

    // 二级菜单的显示和隐藏
    $('.second').prev().on('click', function () {
        $(this).next().stop().slideToggle();
    })

    //菜单的显示和隐藏
    $('.lt_topbar .left').on('click', function () {
        $('.lt_aside,.lt_main,.lt_topbar').toggleClass('now');
    })

    // 实现退出功能
    $('.lt_topbar .right').on('click', function () {
        $('#logoutModal').modal('show');
    })

    // 给确定按钮注册事件
    $('.confirm').on('click', function () {
        // 参数1： 直接就是url地址
        // 参数2： 可选的data
        // 参数3： success的回调
        $.get('/employee/employeeLogout', function (info) {
            if (info.success) {
                location.href = 'login.html'
            }
        })
    })
})