import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = "https://iproject-mofi-production.up.railway.app";

export const useUsersStore = defineStore("users", {
  state: () => ({
    isLoggedIn: localStorage.access_token ? true : false,
    loggedInUsername: "",
    errors: [],
    isPremium: false,
  }),
  persist: true,
  getters: {},
  actions: {
    async handleRegister(data) {
      data.username === "" ? (data.username = null) : data.username;
      data.email === "" ? (data.email = null) : data.email;
      data.password === "" ? (data.password = null) : data.password;
      try {
        await axios({
          method: "post",
          url: baseUrl + "/register",
          data: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        });
        this.errors = [];
        this.$router.push({ name: "login" });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    async handleLogin(data) {
      try {
        const response = await axios({
          method: "post",
          url: baseUrl + "/login",
          data: {
            email: data.email,
            password: data.password,
          },
        });
        this.errors = [];
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("username", response.data.username);

        this.loggedInUsername = response.data.username;
        this.isLoggedIn = true;
        this.isPremium = response.data.premium;

        this.$router.push({ name: "home" });
        // console.log(response);
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    async handleLogout() {
      localStorage.clear();
      this.isLoggedIn = false;
      this.loggedInUsername = "";
      this.errors = [];
      this.isPremium = false;

      this.$router.push({ name: "login" });
    },
    async clearErrors() {
      this.errors = [];
    },
    async handleUpgrade() {
      try {
        const response = await axios({
          method: "patch",
          url: baseUrl + "/upgrade",
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.isPremium = true;

        let timerInterval;
        Swal.fire({
          icon: "success",
          title: "Thank you for your purchase",
          html: "Back to home in 5 second.",
          timer: 5000,
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
            this.$router.push({ name: "home" });
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            this.$router.push({ name: "home" });
          }
        });
      } catch (error) {
        // console.log(error);
      }
    },
    async upgradeToPremium() {
      try {
        const response = await axios({
          method: "post",
          url: baseUrl + "/generate-midtrans-token",
          headers: {
            access_token: localStorage.access_token,
          },
        });
        const cb = this.handleUpgrade;
        window.snap.pay(response.data.token, {
          onSuccess: function (result) {
            cb();
          },
        });
      } catch (error) {
        // console.log(error);
      }
    },
    async handleDiscordLogin(code) {
      try {
        const response = await axios.post(
          "https://discord.com/api/oauth2/token",
          new URLSearchParams({
            client_id: "1092810792748994621",
            client_secret: "rjzQMB3_yahssIusyRGiqfub4tJnNeLk",
            grant_type: "authorization_code",
            redirect_uri: "https://iproject-mofi.web.app/login",
            code: code,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const user = await axios({
          method: "post",
          url: baseUrl + "/oauth/discord-login",
          headers: {
            access_token: response.data.access_token,
          },
        });
        // console.log(response.data.access_token);
        // console.log(user.data);

        localStorage.setItem("access_token", user.data.access_token);
        localStorage.setItem("username", user.data.username);

        this.loggedInUsername = user.data.username;
        this.isLoggedIn = true;
        this.isPremium = user.data.premium;

        this.$router.push({ name: "home" });
      } catch (error) {
        // console.log(error);
      }
    },
  },
});
