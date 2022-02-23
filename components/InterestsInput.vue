<template>
  <div>
    <div class="flex items-center justify-between">
      <label :for="title" class="interest_label">{{ title }}</label>
      <button class="icon_button" type="button" @click="editing = !editing">
        <i class="mdi mdi-close" :class="{'mdi-close':editing, 'mdi-pencil mr-1':!editing}"></i>
        {{editing?'':'Edit'}}
      </button>
    </div>
    <div v-if="editing">
      <input :name="title" v-model="modelValue" @input="updateValue" placeholder="Shawshank Redemption" class="interest_input" />
    </div>
    <div v-else>
      <p class="interest_answer">
      {{ modelValue }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      editing: true,
    };
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
