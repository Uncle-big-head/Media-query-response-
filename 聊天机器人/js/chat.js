$(function () {
  //发送聊天
  $('#btnSend').on('click', function() {
    var text = $('#ipt').val().trim()//获取用户输入内容
    if (text.length <= 0) {
        return $('#ipt').val('')
    }
    //如果用户输入了聊天内容，则将聊天内容追加到页面上显示
    $('#talk_list').append('<li class="right_word"><img src="img/211223205127.jpg" /><span>' + text + '</span></li>')
    $('#ipt').val('') //发送后清空输入窗口
    resetui()
    getMsg(text);//在发送完消息后，获取机器人返回的消息
})


  //机器人返回信息
  function getMsg(value) {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/robot',
        data: {
            spoken: value
        },
        success: function(res) {
            if (res.message === 'success') {
                var msg = res.data.info.text;//获取机器人回复的消息
                //同样的，将消息添加到li中
                $('#talk_list').append('<li class="left_word"><img src="img/4448.jpg" /> <span>' + msg + '</span></li>')
                getVoice(msg);//调用语音接口
            }
        }
    })
}
//转语言
/* 3.将机器人的聊天内容转化为语音播放 */
function getVoice(text) {
  $.ajax({
      type: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
          text: text
      },
      success: function(res) {
          if (res.status === 200) {
              $('#voice').attr('src', res.voiceUrl)
          }
      }
  })
}
})