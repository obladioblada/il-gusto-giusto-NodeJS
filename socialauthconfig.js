module.exports = {

    'facebookAuth':{
        'clientID'        :'2048218198788522',
        'clientSecret'    :'a53f3c030fd7e3637dc5ed48fe4dd095',
        'callbackURL'     :'http://localhost:3000/user/auth/facebook/callback',
        'profileURL'      :'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name']
    },


    'twitterAuth':{
        'consumerKey'     :'vLjESHuk4RCJrYT5872zwQIRz',
        'consumerSecret'   :'CuULgNgngNkNbs4QeDVl5XaTeciAUKfnjQqRqVfGisDYZrOcq7',
        'callbackURL'     :'http://localhost:3000/user/auth/twitter/callback'
    },

    'googleAuth':{
        'clientID'        :'57424888862-fce2qft293o7t89d94k7d3ps9krr8bbt.apps.googleusercontent.com',
        'clientSecret'    :'hEZr12h-Ns8Fo6gg_t_3IX5p',
        'callbackURl'     :'http://localhost:3000/user/auth/google/callback'
    }

};
