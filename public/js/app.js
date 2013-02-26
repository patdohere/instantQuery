Ember.Facebook = Ember.Mixin.create({
  appId: void 0,
  facebookParams: Ember.Object.create(),
  init: function() {
    this._super();
    return window.FBApp = this;
  },
  facebookConfigChanged: (function() {
    var _this = this;
    this.removeObserver('appId');
    window.fbAsyncInit = function() {
      return _this.fbAsyncInit();
    };
    return $(function() {
      var js;
      $('body').append($("<div>").attr('id', 'fb-root'));
      js = document.createElement('script');
      $(js).attr({
        id: 'facebook-jssdk',
        async: true,
        src: "//connect.facebook.net/en_US/all.js"
      });
      return $('head').append(js);
    });
  }).observes('facebookParams', 'appId'),
  fbAsyncInit: function() {
    var facebookParams,
      _this = this;
    facebookParams = this.get('facebookParams');
    facebookParams = facebookParams.setProperties({
      appId: this.get('appId' || facebookParams.get('appId') || void 0),
      status: facebookParams.get('status') || true,
      cookie: facebookParams.get('cookie') || true,
      xfbml: facebookParams.get('xfbml') || true,
      channelUrl: facebookParams.get('channelUrl') || void 0
    });
    FB.init(facebookParams);
    this.set('FBloading', true);
    FB.Event.subscribe('auth.authResponseChange', function(response) {
      return _this.updateFBUser(response);
    });
    return FB.getLoginStatus(function(response) {
      return _this.updateFBUser(response);
    });
  },
  login: function() {
     FB.login(function(response) {
       if (response.authResponse) {
          IQ.set('session', FB.getAuthResponse().accessToken);

          var user = null;

          FB.api('/me', function(response) {
            this.user = response;
          });

          data = IQ.User.createRecord({
            userID: user.id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name
          });

          IQ.set('session', data);

          console.log('Welcome!  Fetching your information.... ');
       } else {
          IQ.set('session', null);
          console.log('User cancelled login or did not fully authorize.');
       }
     }, {scope: 'email'});
  },
  logout: function() {
    IQ.set('session', null);
    FB.logout();
  }
});

IQ = Ember.Application.createWithMixins(Ember.Facebook);

IQ.set('NAME', 'instantQuery');
IQ.set('VERSION', '0.0.1');
IQ.set('appID', '269480466517914');
IQ.set('channelURL', 'assets/facebook/channel.html');
IQ.set('session', null);