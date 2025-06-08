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
.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;

  .el-dialog__header {
    margin-right: 0px;
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #009688 !important;

    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .el-dialog__headerbtn {
    .el-dialog__close {
      color: #fff;
    }
  }

  .el-dialog__body {
    padding: 10px;
  }

  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>