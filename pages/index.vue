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

    <div class="flex">
      <button
        class="button mt-4 ml-auto"
        type="button"
        @click="update"
        :disabled="uploading"
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
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

    return {
      interests,
      update,
      uploading,
      display_query_result,
    }
  },
})
</script>
