<template>
  <div class="min-h-[80px] py-4">
    <div class="flex items-center justify-between">
      <label :for="title" class="interest_label">{{ title }}</label>
      <button
        class="icon_button"
        type="button"
        @click="setEditing(is_editing ? null : title)"
      >
        <i
          class="mdi mdi-close"
          :class="{ 'mdi-close': is_editing, 'mdi-pencil mr-1': !is_editing }"
        ></i>
        {{ is_editing ? '' : 'Edit' }}
      </button>
    </div>
    <div v-if="is_editing">
      <input
        class="interest_input"
        ref="input_ref"
        :value="value"
        @input="$emit('input', $event.target.value)"
        type="text"
      />
    </div>
    <div v-else>
      <p class="interest_answer">
        {{ value }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    value: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  computed: {
    is_editing: (app) => {
      return app.title == app.editing
    },
    ...mapState(['editing']),
  },
  updated() {
    this.$refs['input_ref']?.focus()
  },
  methods: {
    ...mapMutations(['setEditing']),
  },
}
</script>
