<template>
    <input type="text" :value="value" :placeholder="placeholder" class="input" @keyup="e => keyup(e.target.value)" />
</template>

<script>
    export default {
        name: "Input",
        props: {
            value: String,
            placeholder: String,
            keyup: Function,
        }
    }
</script>

<style scoped>
    .input {
        color: #7c7c7c;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 16px;
        border: 0;
        min-width: 40%;
        padding-left: 10px;
        outline-width: 0;
    }
</style>