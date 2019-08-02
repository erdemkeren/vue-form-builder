<template>
    <Button :type="type" class="btn-secondary" :on-click="onClick">
        <slot></slot>
    </Button>
</template>

<script>
    import Button from "@/components/Button";

    export default {
        name: "SecondaryButton",
        props: ['type', 'onClick'],
        components: {Button},
    }
</script>

<style scoped>
    .btn-secondary {
        color: #888888;
        background-color: #f8f8f8;
    }
</style>