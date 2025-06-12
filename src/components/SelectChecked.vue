<template>
  <el-select
    v-model="selectedOptions"
    multiple
    placeholder="Please Select"
    :popper-append-to-body="false"
    @remove-tag="removeTag"
    @change="handleChange"
  >
    <el-option
      v-for="item in props.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <el-checkbox
        :model-value="item.check"
        @change="() => isChecked(item)"
        @click.stop
      >
        {{ item.label }}
      </el-checkbox>
    </el-option>

    <div class="is-all">
      <div @click.stop="selectAll(true)">SelectAll</div>
      <div @click.stop="selectAll(false)">UnSelect</div>
    </div>
  </el-select>
</template>


<script lang="ts" setup>
import { ref, watch } from 'vue'

type SelectItem = {
  value: string | number
  label: string
  check: boolean
}

const props = defineProps<{
  options: SelectItem[]
}>()

const emit = defineEmits(['selected'])

const selectedOptions = ref<Array<string | number>>([])

function isChecked(item: SelectItem) {
  item.check = !item.check

  if (item.check && !selectedOptions.value.includes(item.value)) {
    selectedOptions.value.push(item.value)
  } else if (!item.check) {
    selectedOptions.value = selectedOptions.value.filter(v => v !== item.value)
  }

  emit('selected', selectedOptions.value)
}

function handleChange(values: Array<string | number>) {
  // Sync checkboxes when tag is clicked directly
  props.options.forEach(item => {
    item.check = values.includes(item.value)
  })
  emit('selected', values)
}

function removeTag(value: string | number) {
  props.options.forEach(item => {
    if (item.value === value) item.check = false
  })
  emit('selected', selectedOptions.value)
}

function selectAll(isAll: boolean) {
  if (isAll) {
    selectedOptions.value = []
    props.options.forEach(item => {
      item.check = true
      selectedOptions.value.push(item.value)
    })
  } else {
    props.options.forEach(item => {
      item.check = false
    })
    selectedOptions.value = []
  }

  emit('selected', selectedOptions.value)
}
</script>

<style lang="scss">
.is-all {
  display: flex;
  padding-left: 10px;

  div {
    cursor: pointer;
    margin: 6px 10px;
    transition: 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
