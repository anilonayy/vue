<template>
    <div class="flex flex-row">
        <side-bar />
         <div>
            <div class="socket">
                <input @keydown.enter="SEND_MESSAGE" type="text" style="border:1px solid red;">
            </div>
         </div>
         
        <!-- <component :is="$route.meta.componentName" :bookmarkList="bookmarkList" /> -->
        <!-- <AppBookmarkList :bookmarkList="bookmarkList" /> -->
    </div>
</template>



<script>
import SideBar from '@/components/Account/SideBar.vue'
// import Likes from '@/components/Account/Likes.vue';
// import Favorites from '@/components/Account/Favorites.vue';
// import Settings from '@/components/Account/Settings.vue';

export default {
    data() {
        return {
            bookmarkList: [],
        }
    },

    created() {
        this.$appAxios.get(`/bookmarks?_expand=category&_expand=user`)
        .then(response => {
            this.bookmarkList = response?.data || [];
        });
    },
 


    components: {
        SideBar,
        // Likes,
        // Favorites,
        // Settings
    }
}
</script>