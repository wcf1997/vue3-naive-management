<template>
  <div>
    <n-data-table
      :columns="columns"
      :data="tableData"
      :pagination="false"
      :bordered="false"
      :loading="loading"
      :render-cell="
        (value, rowData, columns) => {
          return h('span', {}, [
            h(
              'span',
              { class: 'mobile-td-name md:hidden inline-block text-[#999]' },
              columns.title + '：'
            ),
            h('span', {}, value)
          ]);
        }
      "
      v-bind="attrs"
    />
    <div
      class="flex justify-end"
      v-if="
        !attrs ||
        (attrs && typeof attrs.pagination !== 'boolean') ||
        attrs.pagination
      "
    >
      <n-pagination
        class="mt-15px"
        v-model:page="pageInfo.index"
        v-model:page-size="pageInfo.size"
        :item-count="pageInfo.total"
        show-size-picker
        :page-sizes="[10, 20, 30, 40]"
        @update-page="onPageChange"
        @update:page-size="onSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NDataTable, NPagination } from "naive-ui";
import { h, onBeforeUnmount, onUnmounted } from "vue";
import { useTableInject } from "v3-usehook";

const {
  columns,
  tableData,
  pageInfo,
  handlePageChange,
  handleSizeChange,
  loading,
  attrs
} = useTableInject();

function onPageChange(page: number) {
  handlePageChange(page);
}

function onSizeChange(size: number) {
  handleSizeChange(size);
}
</script>

<style scoped lang="less"></style>
