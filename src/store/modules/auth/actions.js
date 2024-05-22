export default {
  async signup(context, payload) {
    return context.dispatch('auth', {
      userData: payload.userData,
      mode: 'signup'
    });
  },
  async login(context, payload) {
    return context.dispatch('auth', {
      userData: payload.userData,
      mode: 'login'
    })
  },
  async socialLogin(context, payload) {
    return context.dispatch('auth', {
      userData: payload.userData,
      mode: 'social'
    })
  },
  async auth(context, payload) {
    const mode = payload.mode;
    
    let url = "https://hiscigar.com/api/v1/sessions";
    if (mode === 'signup') {
      url = "https://hiscigar.com/api/v1/users";
    } else if (mode === 'social'){
      url = "https://hiscigar.com/api/v1/sessions/social_login";
    }

    const response = await fetch(
      url, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.userData)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
        const error = new Error(responseData.errors || 'Login Failed. Please try again');
        throw error;
    }

    localStorage.setItem('token', responseData.session_token);
    localStorage.setItem('userId', responseData.current_user.id);
    localStorage.setItem('userName', responseData.current_user.full_name);
    localStorage.setItem('avatar', responseData.current_user?.avatar_image);
    context.commit('setUserInfo', responseData);
    context.commit('setUserData', {
        token: responseData.session_token,
        userId: responseData.current_user.id,
        avatar: responseData.current_user?.avatar_image?.thumbnail?.url,
        userData: responseData.current_user,
        userName: responseData.current_user.full_name
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const avatar = localStorage.getItem('avatar');

    if (token && userId && userName) {
        context.commit('setUserData', {
            token, 
            userId,
            userName,
            avatar
        });
        context.dispatch('loadWishlist', "&sort_column=favorite_at&sort_type=desc");
        context.dispatch('loadOrderHistory');
        context.dispatch('getUserInfo')
    }
},
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('avatar');

    context.commit('setUserData', {
        userId: null,
        token: null,
        userData: null,
        userName: null,
        avatar: null
    })
  },
}
