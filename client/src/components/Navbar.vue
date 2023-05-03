<template lang="">
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-lg"
    data-bs-theme="dark"
  >
    <div class="container">
      <RouterLink class="navbar-brand" to="/home">MOFI</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/home"
              >Home</RouterLink
            >
          </li> -->
        </ul>
        <div class="d-flex">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              class="nav-item me-3"
              v-if="localStorage.access_token && isPremium"
            >
              <a class="nav-link" style="color: gold"><b>Premium</b></a>
            </li>
            <li
              class="nav-item me-3"
              v-if="localStorage.access_token && !isPremium"
            >
              <RouterLink
                to="/upgrade-to-premium/pricing"
                class="nav-link"
                style="color: white"
                ><b>Upgrade to Premium</b></RouterLink
              >
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <RouterLink class="nav-link" aria-current="page" to="/login"
                >Login or Register</RouterLink
              >
            </li>
            <li class="nav-item dropdown" v-if="isLoggedIn">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ loggedInUsername }}
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item text-danger"
                    href="#"
                    @click.prevent="handleLogout()"
                    ><b>Logout</b></a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUsersStore } from "../stores/users";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      localStorage: localStorage,
    };
  },
  computed: {
    ...mapState(useUsersStore, ["isLoggedIn", "loggedInUsername", "isPremium"]),
  },
  methods: {
    ...mapActions(useUsersStore, ["handleLogout"]),
  },
};
</script>
