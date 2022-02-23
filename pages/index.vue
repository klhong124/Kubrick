<template>
  <div class="max-w-md">
    <h1 class="text-2xl font-bold leading-7 text-gray-900">My interests</h1>

    <div class="grid grid-cols-1 gap-4 divide-y mt-4">
      <InterestsInput title="Full name" v-model="interests.full_name" />
      <InterestsInput
        title="Favourite movie"
        v-model="interests.favourite_movie"
      />
      <InterestsInput
        title="Favourite book"
        v-model="interests.favourite_book"
      />
    </div>

    <div class="flex my-4">
    <small v-if="error_message" class="text-red-500">*{{ error_message }}</small>
      <button
        class="button  ml-auto"
        type="button"
        @click="update"
        :disabled="uploading || invalidation"
      >
        <span v-if="!uploading">Update</span>
        <i class="mdi mdi-loading mdi-spin" v-else></i>
      </button>
    </div>

    <hr />
    <h2 class="text-lg font-bold leading-7 text-gray-900">Query Result:</h2>
    <small
      >*The query will sleep() for 1 sec in order to show the loading lifecycle
      behaviour.</small
    >

    <pre>{{ display_query_result }}</pre>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable/dist'
import UPDATE_MUTATION from '~/graphql/UPDATE_MUTATION.gql'

export default defineComponent({
  setup() {
    const interests = ref({
      full_name: 'Joe Bloggs',
      favourite_movie: '',
      favourite_book: '',
    })
    const display_query_result = ref(null)

    const {
      mutate: update,
      loading: uploading,
      onDone: updated,
    } = useMutation(UPDATE_MUTATION, () => ({
      variables: {
        interests: interests.value,
      },
    }))
    updated(({ data }, err) => {
      if (err) {
        // handle error
        throw new Error(err)
      } else {
        display_query_result.value = data.update_interests
      }
    })
    const invalidation = computed(() => {
      return (
        !interests.value.full_name ||
        !interests.value.favourite_movie ||
        !interests.value.favourite_book
      )
    })

    const error_message = computed(() => {
      let arr = []
      if (!interests.value.full_name) {
        arr.push('Full name')
      }
      if (!interests.value.favourite_movie) {
        arr.push('Favourite movie')
      }
      if (!interests.value.favourite_book) {
        arr.push('Favourite Book')
      }
      if (arr.length > 0) {
        return `Please fill the missing information : ${arr.join(', ')}`
      } else {
        return null
      }
    })

    return {
      interests,
      update,
      uploading,
      display_query_result,
      invalidation,
      error_message,
    }
  },
})
</script>
