<template lang="">
  <section
    class="vh-100"
    style="
      background: #0f2027; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #2c5364,
        #203a43,
        #0f2027
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to right,
        #2c5364,
        #203a43,
        #0f2027
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    "
  >
    <div class="container h-100">
      <div class="row justify-content-sm-center h-100">
        <div class="col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-10 my-auto">
          <div class="card shadow-lg">
            <div class="card-body p-5">
              <h3 class="card-title fw-bold mb-4">Login</h3>
              <p
                class="text-danger"
                v-for="(err, index) in errors"
                :key="index"
                :class="err.path !== 'invalid' ? 'd-none' : ''"
                v-text="err.path === 'invalid' ? err.message : ''"
              ></p>
              <form
                @submit.prevent="handleLogin(data)"
                class="needs-validation"
                novalidate=""
                autocomplete="off"
              >
                <div class="mb-3">
                  <label class="mb-2 text-muted" for="email"
                    >E-Mail Address</label
                  >
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    v-model="data.email"
                    autofocus
                  />
                  <p
                    class="text-danger"
                    v-for="(err, index) in errors"
                    :key="index"
                    :class="err.path !== 'email' ? 'd-none' : ''"
                    v-text="err.path === 'email' ? err.message : ''"
                  ></p>
                  <!-- <div class="invalid-feedback">Email is invalid</div> -->
                </div>

                <div class="mb-3">
                  <div class="mb-2 w-100">
                    <label class="text-muted" for="password">Password</label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    v-model="data.password"
                  />
                  <p
                    class="text-danger"
                    v-for="(err, index) in errors"
                    :key="index"
                    :class="err.path !== 'password' ? 'd-none' : ''"
                    v-text="err.path === 'password' ? err.message : ''"
                  ></p>
                  <!-- <div class="invalid-feedback">Password is required</div> -->
                </div>

                <div class="d-flex align-items-center">
                  <button type="submit" class="btn btn-dark w-100">
                    Login
                  </button>
                </div>
              </form>
              <div class="mt-3 text-center">
                <p>
                  Don't have an account yet?
                  <a href="" @click.prevent="changePage()">Register</a>
                </p>
              </div>
              <div class="row">
                <div class="col"><hr /></div>
                <div class="col-auto">or Sign In with</div>
                <div class="col"><hr /></div>
              </div>
              <div
                id="discord-login-button"
                class="d-flex text-center justify-content-center text-white rounded-top rounded-bottom"
              >
                <a
                  id="login"
                  href="https://discord.com/api/oauth2/authorize?client_id=1092810792748994621&redirect_uri=https%3A%2F%2Fiproject-mofi.web.app%2Flogin&response_type=code&scope=identify%20email"
                  class="px-5 py-2 text-decoration-none text-white"
                >
                  <i class="fa-brands fa-discord me-2"></i>
                  <span>Sign In with Discord</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUsersStore } from "../stores/users";

export default {
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(useUsersStore, ["errors"]),
  },
  methods: {
    ...mapActions(useUsersStore, [
      "handleLogin",
      "handleDiscordLogin",
      "clearErrors",
    ]),
    changePage() {
      this.clearErrors();
      this.$router.push("/register");
    },
  },
  created() {
    if (this.$route.query.code) {
      this.handleDiscordLogin(this.$route.query.code);
    }
  },
};
</script>

<style>
#discord-login-button {
  background-color: #7289da;
  transition: 0.2s;
}
#discord-login-button:hover {
  transition: 0.2s;
  background-color: #7289da;
  opacity: 0.9;
}
</style>
