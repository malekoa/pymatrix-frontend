<template>
    <div class="h-screen">
        <div class="flex justify-between items-center px-4 w-full absolute h-16 bg-gray-200 shadow">
            <span class="font-bold italic">Logo</span>
            <span class="text-sm space-x-4">
                <router-link to="/" :class="activeTab == 'Home' ? 'font-bold' : 'null'" @click="setActiveTab('Home')">Home</router-link>
                <router-link to="/about" :class="activeTab == 'About' ? 'font-bold' : 'null'" @click="setActiveTab('About')">About</router-link>
            </span>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            activeTab: 'Home',
        }
    },
    methods: {
        setActiveTab(newTab) {
            this.activeTab = newTab;
        },
    },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
