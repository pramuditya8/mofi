<template lang="">
  <div id="card" class="col col-6 col-sm-6 col-md-3">
    <div
      @click.prevent="$router.push(`/movie/watch/${movie.id}`)"
      class="card"
      style="cursor: pointer; background-color: black"
    >
      <img
        id="card-img"
        class="card-img"
        :src="`https://image.tmdb.org/t/p/w780/${movie.poster_path}`"
        style="width: 100%; height: 100%; object-fit: contain; opacity: 0.6"
      />
      <div class="card-img-overlay text-white d-flex align-items-end">
        <h5 class="card-title">{{ movie.title }}</h5>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["movie"],
};
</script>
<style scoped>
@media screen and (max-width: 350px) {
  #card {
    width: 100%;
  }
}
</style>
