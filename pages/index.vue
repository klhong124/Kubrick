<template>
  <div class="flex flex-col xl:flex-row">
    <div class="flex lg:mt-[200px] mb-12">
      <Title title="Kubrick|Front-End Developer|Coding Challenge" />
    </div>

    <div class="mx-auto mt-10">
      <div class="card h-[550px]">
        <!-- liquid effect -->
        <div class="liquid" ref="liquid"></div>
        <div class="absolute z-10 w-full h-full">
          <!-- card -->
          <div class="p-5 sm:p-8">
            <!-- title -->
            <div class="flex">
              <h2
                class="sm:text-2xl text-xl font-bold leading-7 text-gray-900 dark:text-white"
              >
                My interests
              </h2>
              <DarkModeButton class="ml-auto" />
            </div>
            <!-- inputs -->
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
            <!-- error message -->
            <div class="my-2">
              <small v-if="error_message" class="text-red-600 dark:text-red-400"
                >*{{ error_message }}</small
              >
            </div>
            <!-- upload button -->
            <div class="flex absolute bottom-5 right-5">
              <button
                class="button ml-auto"
                type="button"
                @click="validate()"
                :disabled="uploading"
              >
                <span v-if="!uploading">Update</span>
                <i class="mdi mdi-loading mdi-spin" v-else></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Query card -->
      <div class="card mt-5 p-5 sm:p-8 dark:bg-gray-700 bg-[#e4e4e4] h-[300px]">
        <!-- title -->
        <h2 class="text-lg font-bold leading-7 text-gray-900 dark:text-white">
          Query Result:
        </h2>
        <!-- message -->
        <small class="dark:text-white"
          >*The query will sleep() for 1 sec in order to show the loading
          lifecycle behaviour.</small
        >
        <!-- SkeletonLoader -->
        <transition
          name="fade"
          :duration="{ enter: 500, leave: 0 }"
          mode="out-in"
        >
          <SkeletonLoader v-if="uploading" />
          <!-- query Result -->
          <pre v-else class="dark:text-white">{{ display_query_result }}</pre>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useStore } from '@nuxtjs/composition-api'
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
    const error_message = ref(null)
    const store = useStore()
    const liquid = ref(null)

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
        liquid.value.style.bottom = null
        display_query_result.value = data.update_interests
      }
    })
    const validate = () => {
      // clear error message and edit state
      error_message.value = null
      store.commit('setEditing', null)
      // check if condition doesn't fulfil
      let invalidation =
        !interests.value.full_name ||
        !interests.value.favourite_movie ||
        !interests.value.favourite_book
      if (invalidation) {
        createErrorMessage()
      } else {
        liquid.value.style.bottom = '-150px'
        update()
      }
    }
    // create error message
    const createErrorMessage = () => {
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
        error_message.value = `Please fill in the missing information : ${arr.join(
          ', '
        )}`
      }
    }

    return {
      interests,
      uploading,
      display_query_result,
      validate,
      error_message,
      liquid,
    }
  },
})
</script>
