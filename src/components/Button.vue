<template>
    <button :type="type" class='btn' :class="className" @click="onClick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "Button",
        props: ['type', 'onClick', 'className'],
    }
</script>

<style scoped>
    .btn {
        min-width: 100px;
        height: 40px;
        padding: 9px 12px;
        border-width: 1px;
        border-style: solid;
        font-weight: bold;
        border-radius: 10px;
        margin-right: 10px;
    }
</style>