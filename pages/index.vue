<template>
  <div>
    <h1>{{ $t("products.title") }}</h1>
    <ul>
      <li v-for="item in products" :key="item.id">
        {{ $tData(item.name) }} - {{ item.price }} {{ $t("products.currency") }}
      </li>
    </ul>
  </div>
</template>

<script>
import allData from "~/data/allData.json";

export default {
  data() {
    return {
      products: allData.items,
    };
  },
};
</script>
