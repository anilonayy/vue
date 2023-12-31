import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
    state: {
        user :null,
        saltKey : "booklik123!456?"
    },

    mutations : {
        setUser(state,user)
        {
            state.user = user || {};
        },
        logoutUser(state)
        {
            state.user = null;
        },
        setLikes(state,likes){
            state.user.likes  = likes;
        },
        setBookmarks(state,bookmarks)
        {
            state.user.bookmarks = bookmarks;
        }
    },

    getters :{
        _getCurrentUser(state){
            const user = state.user;
            delete user?.password;
            return user;
        },
        _currentUserId : state => state.user?.id, 
        _isAuthenticated : state => state.user !== null,
        _saltKey : state => state.saltKey,
        _userLikes : state => state.user?.likes || [],
        _userBookmarks : state => state.user?.bookmarks || []
        
        
    },

    plugins : [createPersistedState({
        // key : "user" // spesific key name for local store. but this is unecessary
      
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
          }
    })]
});