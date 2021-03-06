App.room = App.cable.subscriptions.create({channel: "RoomChannel", id: location.pathname.slice(1)}, {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    $('#messages').append(data['message']);
  },

  speak: function(message) {
    this.perform('speak', {message: message});
  }
}, $(document).on('keypress', '[data-behavior~=room_speaker]', function(event) {
  if (event.keyCode === 13) {
    App.room.speak(event.target.value);
    event.target.value = '';
    event.preventDefault();
  }
}));

$(function() {
  // 送信ボタン押下時の処理
  $('#submit_btn').on('click', function() {
    var element = $('#input_msg');
    App.room.speak(element.val());
    element.val('');
  });
});
