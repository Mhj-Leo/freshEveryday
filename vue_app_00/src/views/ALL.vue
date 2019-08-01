<template>
    <div>
        <router-view/>
        <TabBarIcon></TabBarIcon>
    </div>
</template>
<script>
import TabBarIcon from "../components/freshEveryday/TabBarIcon"
export default {
    data() {
        return {
            
        }
    },
    components:{
                TabBarIcon
            },
}
</script>