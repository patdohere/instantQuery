window.fbAsyncInit = function () {

  FB.Event.subscribe('auth.statusChange', function (response) {
      $(document).trigger('fbStatusChange', response);
  });

  FB.init({
      appId: '269480466517914', // App ID
      channelUrl: '//localhost:8080/assets/facebook/channel.html', // Channel File
      status: true, // check login status
      cookie: true, // enable cookies to allow the server to access the session
      xfbml: true  // parse XFBML
  });

  FB.getLoginStatus(function(response) {
    console.log('FB status: '+ response);
    if (response.status === 'connected') {
      
    } else if (response.status === 'not_authorized') {
      
    } else {
      
    }
  });
};

// Load the SDK Asynchronously
(function (d) {
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {
      return;
  }
  js = d.createElement('script');
  js.id = id;
  js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));