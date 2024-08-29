<template>

</template>

<script>
import {http} from '../../hooks/index.js'
console.log(http,'-----------');

http.get().then((res,err)=>{
    console.log(err);
})

export default {
    data(){
        return {

        }
    },
    created(){

    }
}

</script>