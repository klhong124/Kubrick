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
      <input class="interest_input" :value="value" @input="$emit('input', $event.target.value)" placeholder="Shawshank Redemption" type="text">   
    </div>
    <div v-else>
      <p class="interest_answer">
      {{ value }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      editing: false,
    };
  },

};
</script>
