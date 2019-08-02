<template>
    <div class="select-label" v-bind:data-value="value">
        <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px">
            <g>
                <ellipse ry="10" rx="10" id="svg_1" cy="11" cx="11" stroke-width="1.5" v-bind:stroke="borderColor"
                         v-bind:fill="backgroundColor"/>
                <text v-bind:stroke="foregroundColor" xml:space="preserve" text-anchor="start"
                      font-family="Helvetica, Arial, sans-serif" font-size="10" id="svg_2" y="14.398351" x="7.942434"
                      stroke-width="0" v-bind:fill="foregroundColor">{{ letter }}</text>
            </g>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Option",
        props: {
            letter: String,
            borderColor: String,
            backgroundColor: String,
            foregroundColor: String,
            value: String,
        },
    }
</script>

<style scoped>
    .select-label {
        display: flex;
        align-items: center;
    }

    .select-options > .select-label {
        padding: 9px 12px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>