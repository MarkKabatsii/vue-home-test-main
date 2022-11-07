<template>
  <div>
    <select
        v-model="selected"
        @change="chooseOptionValue(options.id, $event)"
    >
      <option
          :value="null"
          disabled selected
      >
        Choose category
      </option>
      <option
          v-for="option in options.labels"
          :key="option.id"
          :value="option.id"
      >
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "m-select",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    chooseAttributesFromSelect: {
      type: Function
    }
  },
  data() {
    return {
      selected: null,
    }
  },
  methods: {
    chooseOptionValue(id, event) {
      this.chooseAttributesFromSelect(id, event.target.value)
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/style/variables";

select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d5d5d5;
  background: linear-gradient(#fff, #f7fcfb);
  text-align: start;
  padding: 14px 18px 15px 21px;
  font-family: $secondary-font;
  font-weight: $fw-light;
  font-size: 15px;
  line-height: 31px;
  letter-spacing: .4px;
  color: $title-color;
  cursor: pointer;
}

</style>