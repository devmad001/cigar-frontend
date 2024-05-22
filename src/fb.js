export const initFbsdk = () => {
    return new Promise(resolve => {
      window.fbAsyncInit = function() {
        // eslint-disable-next-line
        FB.init({
          appId : '271794977984475',
          cookie : true,
          xfbml : true,
          version : 'v10.0'
        });
      };
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      console.log(resolve);
    })
  }