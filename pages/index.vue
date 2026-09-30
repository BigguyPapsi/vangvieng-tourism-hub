<template>
  <div>
    <h1>รายการสินค้า</h1>
    <ul>
      <li v-for="item in products" :key="item.id">
        {{ item.name }} - {{ item.price }} บาท
      </li>
    </ul>
  </div>
</template>

<script>
import products from '~/data/products.json'

export default {
  data() {
    return {
      products
    }
  }
}
</script>