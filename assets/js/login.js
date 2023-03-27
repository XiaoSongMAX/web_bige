$(function () {
  // 点击'去注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击'去注册账号的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从 layui中获取form 对象
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6位到12位,且不能出现空格'],
    repwd: function (value) {
      // 通过形参拿到的是确认密码的内容
      // 然后进行一次等于的判断
      // 如果失败 return一个失败
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    },
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.post(
      'http://www.liulongbin.top:3007/api/reguser',
      {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }

        layer.msg('注册成功')
        // 模拟人的点击行为
        $('#link_login').click()
      }
    )
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: 'http://www.liulongbin.top:3007/api/login',
      method: 'post',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        console.log(res.token)

        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      },
    })
  })
})
