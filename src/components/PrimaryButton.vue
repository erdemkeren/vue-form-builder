<template>
    <Button :type="type" class="btn-primary" :on-click="onClick">
        <slot></slot>
    </Button>
</template>

<script>
    import Button from "@/components/Button";

    export default {
        name: "PrimaryButton",
        props: ['type', 'onClick'],
        components: {Button},
    }
</script>

<style scoped>
    .btn-primary {
        background: #cfefff;
        color: #50b8ff;
        border-color: #50b8ff;
    }
</style>