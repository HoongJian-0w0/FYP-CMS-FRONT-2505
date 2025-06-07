<template>
  <el-dialog
    :model-value="props.visible"
    :title="props.title"
    :width="props.width + 'px'"
    :before-close="handleClose"
    append-to-body
  >
    <div :style="{height: props.height + 'px'}">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
interface DialogProps {
  title?: string,
  visible: boolean,
  width?: number,
  height?: number
}

const props = withDefaults(defineProps<DialogProps>(), {
  title: 'Dialog',
  visible: false,
  width: 630,
  height: 280,
});

const emit = defineEmits(["onClose", "onConfirm"]);

function handleClose() {
  emit("onClose");
}

function handleConfirm() {
  emit("onConfirm");
}
</script>

<style lang="scss" scoped>

</style>