import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import MovieDetailsView from "../views/MovieDetailsView.vue";
import PricingView from "../views/PricingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/movie/watch/:id",
      name: "movie",
      component: MovieDetailsView,
    },
    {
      path: "/upgrade-to-premium/pricing",
      name: "upgrade",
      component: PricingView,
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  if (to.name === "login" && localStorage.access_token) {
    next("home");
  } else if (to.name === "register" && localStorage.access_token) {
    next("home");
  } else {
    next();
  }
});

export default router;
