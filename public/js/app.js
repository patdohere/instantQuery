Ember.Facebook = Ember.Mixin.create({
  FBUser: void 0,
  appId: void 0,
  facebookParams: Ember.Object.create(),
  fetchPicture: true,
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
  updateFBUser: function(response) {
    var _this = this;
    if (response.status === 'connected') {
      return FB.api('/me', function(user) {
        var FBUser;
        FBUser = Ember.Object.create(user);
        FBUser.set('accessToken', response.authResponse.accessToken);
        if (_this.get('fetchPicture')) {
          return FB.api('/me/picture', function(path) {
            FBUser.picture = path;
            _this.set('FBUser', FBUser);
            return _this.set('FBloading', false);
          });
        } else {
          _this.set('FBUser', FBUser);
          return _this.set('FBloading', false);
        }
      });
    } else {
      this.set('FBUser', false);
      return this.set('FBloading', false);
    }
  },
  login: function() {
     FB.login(function(response) {
       if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ' + response.name + '.');
         });
       } else {
         console.log('User cancelled login or did not fully authorize.');
       }
     }, {scope: 'email'});
  },
  logout: function() {
    FB.logout();
  }
});

IQ = Ember.Application.createWithMixins(Ember.Facebook);

IQ.set('NAME', 'instantQuery');
IQ.set('VERSION', '0.0.1');
IQ.set('appID', '269480466517914');
IQ.set('channelURL', 'assets/facebook/channel.html');
