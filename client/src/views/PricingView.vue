<template lang="">
  <div
    class="container vh-100 d-flex align-items-center justify-content-center"
  >
    <div class="flex-column text-white">
      <h1>Upgrade to Premium now</h1>
      <div class="card-deck mb-3 text-center mt-5">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Premium</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              IDR 59.999 <small class="text-muted">for lifetime</small>
            </h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>Access to thousand Movie</li>
              <li>Fast speed streaming</li>
              <li>Phone and email support</li>
              <li>Help center access</li>
            </ul>
            <button
              v-if="!localStorage.access_token"
              @click.prevent="$router.push({ name: 'login' })"
              type="button"
              class="btn btn-lg btn-block btn-dark"
            >
              Go Premium
            </button>
            <button
              v-else-if="localStorage.access_token && !isPremium"
              @click.prevent="upgradeToPremium()"
              type="button"
              class="btn btn-lg btn-block btn-dark"
            >
              Go Premium
            </button>
            <h3 v-if="localStorage.access_token && isPremium">
              You already Premium
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "pinia";
import { useUsersStore } from "../stores/users";
import { mapState } from "pinia";

export default {
  data() {
    return {
      localStorage: localStorage,
    };
  },
  computed: {
    ...mapState(useUsersStore, ["isPremium"]),
  },
  methods: {
    ...mapActions(useUsersStore, ["upgradeToPremium"]),
  },
};
</script>
<style lang=""></style>
