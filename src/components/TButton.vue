<template>
    <button :type="type" class='t-btn' @click="onClick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "TButton",
        props: ['type', 'onClick'],
    }
</script>

<style scoped>
    .t-btn {
        display: block;
        border: 0;
        background-color: transparent;
        font-size: 16px;
        color: #7c7c7c;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        padding: 0;
        outline-width: 0;
    }
</style>