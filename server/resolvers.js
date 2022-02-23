const resolvers = {
    Query: {
        interests: () => {
            return {
                full_name:"Ryan Kwan",
                favourite_movie:"Ryan Kwan",
                favourite_book:"Ryan Kwan",
            };
        }
    },
    Mutation:{
        update_interests: async(_,{interests})=>{
            //upload data to database
            !interests && (interests = {})
            interests['updated_at'] = new Date();
            // set delay
            await new Promise(r => setTimeout(r, 1000));
            return interests
        }
    }
};

module.exports = resolvers;