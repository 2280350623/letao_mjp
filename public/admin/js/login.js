$(function () {
    var $form = $('#form');
    $form.bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验
        fields: {
            //用户名
            username: {
                //校验规则
                validators: {
                    //非空校验
                    notEmpty: {
                        //为空时提示
                        message:"用户名不能为空"
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message:"用户名长度须为2-6位"
                    },
                    // callback
                }
            },
            //密码
            paddword: {
                //校验规则
                validators: {
                    //非空校验
                    notEmpty: {
                        //为空时提示
                        message:"密码不能为空"
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message:"密码长度须为6-12位"
                    }
                    // callback
                }
            }
        }
    })
})