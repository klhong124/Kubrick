<template>
  <div class="max-w-md">
    <h1 class="text-2xl font-bold leading-7 text-gray-900">My interests</h1>

    <div class="grid grid-cols-1 gap-4 divide-y mt-4">
      <InterestsInput title="Full name" v-model="full_name" />
  
      <InterestsInput title="Favourite movie" v-model="favourite_movie" />
      <InterestsInput title="Favourite book" v-model="favourite_book" />
    </div>

<div class="flex">
    <button class="button mt-4 ml-auto" type="button" @click="update">Update</button>
</div>
  </div>
</template>

<script>

import {
  defineComponent,
  ref,
} from "@nuxtjs/composition-api";
import { useLazyQuery, useResult } from '@vue/apollo-composable/dist';
import example from '~/graphql/example.gql'

export default defineComponent({
  setup() {
    const full_name = ref("Joe Bloggs");
    const favourite_movie = ref("");
    const favourite_book = ref("");
    const uploading = ref (false)
    const { result, loading, error ,load} = useLazyQuery(example);
    const users = useResult(result, null, data => data.users);

// console.log($axios);
    const update = ()=>{
      load()
      
    }


    return {
      full_name,
      favourite_movie,
      favourite_book,
      uploading,
      update,
    };
  },
});
</script>
