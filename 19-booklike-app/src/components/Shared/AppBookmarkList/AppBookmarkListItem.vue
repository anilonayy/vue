<template>
    <div class="bg-white flex flex-col gap-x-3 rounded-md shadow-sm">
            <div class="p-3">
              <a href="#" class="hover:text-black font-bold text-l mb-1 text-gray-600 text-center">{{ bookmark.title || "-" }}</a>
              <div class="flex items-center justify-center mt-2 gap-x-1">
                <button @click="likeBookmark" class="like-btn group " :class="{ 'bookmark-item-active' : isLiked.bool }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="fill-current group-hover:text-white" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                    <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
                  </svg>
                </button>
                <button @click="saveBookmark" class="bookmark-btn group" :class="{ 'bookmark-item-active' : isBookmarked.bool }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="fill-current group-hover:text-white" enable-background="new 0 0 24 24" viewBox="0 0 24 24" width="24" height="24">
                    <rect fill="none" />
                    <path d="M17,11v6.97l-5-2.14l-5,2.14V5h6V3H7C5.9,3,5,3.9,5,5v16l7-3l7,3V11H17z M21,7h-2v2h-2V7h-2V5h2V3h2v2h2V7z" />
                  </svg>
                </button>
                <div class="relative group">
                  <button class="details-btn !-z-[1] group">
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current group-hover:text-gray-700" height="24" viewBox="0 0 24 24" width="24">
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zM6 12h2v2H6zm0-3h2v2H6zm0-3h2v2H6zm4 6h5v2h-5zm0-3h8v2h-8zm0-3h8v2h-8z" />
                    </svg>
                    <p class="details-container">{{ bookmark.description }}</p>
                  </button>
                </div>
              </div>
              <div class="text-xs text-gray-400 mt-2 flex justify-between">
                <a href="#" class="hover:text-black"> {{ userName}} </a>
                <span>14 Mart</span>
              </div>
            </div>
            <div class="bg-red-200 p-1 text-red-900 text-center text-sm"> {{ categoryName }} </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
export default {
    props : {
      bookmark :{
        type: Object,
        required :true,
        default : ()  => {}
      }
    },
    computed :{
      categoryName() {
        return this.bookmark?.category?.name || "-";
      },
      userName(){
        return this.bookmark?.user?.fullName || "-";
      },



      isLiked()
      {
        let user_like = this._userLikes.find(like => like.bookmarkId === this.bookmark.id ) || false;

        return {
          bool : Boolean( user_like),
          object : user_like
        };
      },
      isBookmarked()
      {
        let user_bookmark =   this._userBookmarks.find(bookmark => bookmark.bookmarkId === this.bookmark.id ) || false;
        return {
          bool : Boolean( user_bookmark),
          object : user_bookmark
        };
      },

      userLikes ()
      {
        return this._userLikes
      },
      userBookmarks(){
        return this._userBookmarks;
      },
      ...mapGetters(["_getCurrentUser","_userLikes","_userBookmarks"])
    },
    methods :{
      likeBookmark()
      {
        let likes = [...this._userLikes];
        this.$appAxios({
          url : this.isLiked.bool ?  `/user_likes/${this.isLiked.object.id}` :  "/user_likes/",
          method : this.isLiked.bool ? "DELETE" : "POST",
          data :{
            userId : this._getCurrentUser.id,
            bookmarkId : this.bookmark.id
          } 
        }).then(like_response => {
            this.isLiked.bool ?  likes = likes.filter(l => l.id!==this.isLiked.object.id)  :  likes.push(like_response.data) ;
            this.$store.commit("setLikes",likes);
            console.log(likes);
        })
        
      },
      saveBookmark()
      {
        let bookmarks = [...this._userBookmarks];
        this.$appAxios({
          url : this.isBookmarked.bool ?  `/user_bookmarks/${this.isBookmarked.object.id}` :  "/user_bookmarks/",
          method : this.isBookmarked.bool ? "DELETE" : "POST",
          data :{
            userId : this._getCurrentUser.id,
            bookmarkId : this.bookmark.id
          } 
        }).then(bookmark_response => {
            this.isBookmarked.bool ?  bookmarks = bookmarks.filter(l => l.id!==this.isBookmarked.object.id)  :  bookmarks.push(bookmark_response.data) ;
            this.$store.commit("setBookmarks",bookmarks);
            console.log(bookmarks);
        })
        
      },
    }
}
</script>