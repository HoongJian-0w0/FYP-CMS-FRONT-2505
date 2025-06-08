import { reactive } from 'vue'
import type { DialogModel } from '@/type/BaseType.ts'

export default function useDialog() {

  const dialog = reactive<DialogModel>({
    title: 'Dialog',
    visible: false,
    width: 630,
    height: 280,
  })

  function handleClose() {
    dialog.visible = false
  }

  function handleConfirm() {
    dialog.visible = false
  }

  function handleShow() {
    dialog.visible = true
  }

  return {
    dialog,
    handleClose,
    handleConfirm,
    handleShow
  }

}