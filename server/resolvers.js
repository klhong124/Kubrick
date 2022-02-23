const resolvers = {
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