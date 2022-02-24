<template>
  <div class="flex flex-col xl:flex-row">
    <div class="flex lg:mt-[200px] mb-12">
      <Title title="Kubrick|Front-End Developer|Coding Challenge" />
    </div>

    <div class="mx-auto mt-10">
      <div class="card">
        <div class="flex">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 dark:text-white"
          >
            My interests
          </h2>
          <DarkModeButton class="ml-auto" />
        </div>

        <div class="grid grid-cols-1 gap-4 divide-y divide-gray-400">
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

        <div class="flex mt-8">
          <small v-if="error_message" class="text-red-600 dark:text-red-400"
            >*{{ error_message }}</small
          >
          <button
            class="button ml-auto"
            type="button"
            @click="update"
            :disabled="uploading || invalidation"
          >
            <span v-if="!uploading">Update</span>
            <i class="mdi mdi-loading mdi-spin" v-else></i>
          </button>
        </div>
      </div>
      <div class="card mt-5">
        <h2 class="text-lg font-bold leading-7 text-gray-900 dark:text-white">
          Query Result:
        </h2>
        <small class="dark:text-white"
          >*The query will sleep() for 1 sec in order to show the loading
          lifecycle behaviour.</small
        >
        <SkeletonLoader v-if="uploading"/>
        <pre v-else class="dark:text-white">{{ display_query_result }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { useMutation } from '@vue/apollo-composable/dist'
import UPDATE_MUTATION from '~/graphql/UPDATE_MUTATION.gql'

export default defineComponent({
  setup() {
    // init vue data
    const interests = ref({
      full_name: 'Ryan Kwan',
      favourite_movie: '',
      favourite_book: '',
    })
    const display_query_result = ref(null)

  //  vue-apollo setup on plugins/apollo-client.js and graphql/index.js
  //  for the graphql server, you may refer to ~/server/*
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
    // disable upload button if below condition doesn't fulfil
    const invalidation = computed(() => {
      return (
        !interests.value.full_name ||
        !interests.value.favourite_movie ||
        !interests.value.favourite_book
      )
    })
    // create error message
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
        return `Please fill in the missing information : ${arr.join(', ')}`
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
