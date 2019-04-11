var userUrl = 'http://localhost:3000'

var app = new Vue({
  el: '#app',
  data: {
    email: '',
    password: '',
    isLoggedIn: false
  },
  
  methods: {
    login() {
      axios.post(serverUrl + '/login', {
        email: this.email,
        password: this.password
      })
        .then( data => {
          console.log(data.token)
          localStorage.token = data.token;
          this.isLoggedIn = true;
        })
        .catch( err => {
          console.log(err);
        })
    }
  },
  
  created() {
    
  },
  
  computed: {

  },

  watch: {

  },

})