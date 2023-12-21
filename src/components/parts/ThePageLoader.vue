<template>
    <div class="page-loader show">
        <div class="spinner-border text-primary float-end loading" role="status">
            <div class="lds-dual-ring"></div>
        </div>
    </div>
</template>
<style lang="scss">
    .page-loader {
        display: none;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        &.show {
            z-index: 1030;
            display: flex;
            position: relative;
            .spinner {
                z-index: 1040;
            }
        }
        
    }
</style>