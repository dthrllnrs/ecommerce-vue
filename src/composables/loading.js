import { ref, onUnmounted } from 'vue'

export const useLoading = (props = {}) => {
    let showLoading = ref(false);

    onUnmounted(() => {
        showLoading.value = false;
    })

    return { showLoading }
}