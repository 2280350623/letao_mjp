$(function () {
    var $form = $('#form');
    $form.bootstrapValidator({
        //校验
        fields: {
            //用户名
            username: {
                //校验规则
                validators: {
                    //非空校验
                    notEmpty: {
                        //为空时提示
                        message: "用户名不能为空"
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度须为2-6位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            //密码
            password: {
                //校验规则
                validators: {
                    //非空校验
                    notEmpty: {
                        //为空时提示
                        message: "密码不能为空"
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度须为6-12位"
                    },
                    callback: {
                        message: "密码不正确"
                    }
                }
            }
        },
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    })

    // 给表单注册校验成功的事件
    $form.on('success.form.bv', function (e) {
        //阻止浏览器默认行为
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            success: function (info) {
                if (info.error === 1000) {
                    // alert('用户名不正确')
                    $(form).data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if (info.error === 1001) {
                    // alert('密码错误')
                    $(form).data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
                if (info.success) {
                    // 登录成功
                    location.href = 'index.html'
                }
            }
        })
    })
    // 重置
    $('[type=reset]').on('click',function(){
        // 重置表格。它隐藏所有错误元素和反馈图标。所有字段都标记为尚未验证。
        $(form).data('bootstrapValidator').resetForm(true);//如果true，该方法重置具有验证器规则的字段。
    })
})