<template>
  <div>
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      :rules="rules"
      v-bind="formConfig"
    >
      <n-grid
        :cols="
          formConfig && formConfig.responsive
            ? '1 400:2 600:3 900:4 1200:5 '
            : 24
        "
        :x-gap="24"
      >
        <template v-for="item in _columns" :key="item.key">
          <n-form-item-gi
            :label="item.title"
            :path="item.key"
            v-bind="
              formConfig && formConfig.responsive
                ? {}
                : { span: formConfig?.colSpan || item.span || 24 }
            "
          >
            <component
              :ref="(el:any) => (refs[item.key] = el)"
              :is="componentMap[item.type || 'input']"
              :value="formValue[item.key]"
              :form-key="item.key"
              @update:value="($evnet:any) => handleModelValueChange(item.key, $evnet, item.type)"
              :placeholder="`请${
                !item.type || item.type === 'input' ? '输入' : '选择'
              }${item.title}`"
              :formValue="formValue"
              :config="item.config || {}"
              @onClear="handleClear"
              @onUploading="confirmLoading = true"
              @onUploadFinished="confirmLoading = false"
            ></component>
          </n-form-item-gi>
        </template>
        <slot></slot>
        <n-grid-item
          v-if="!formConfig?.hideFooter"
          v-bind="
            formConfig && formConfig.responsive
              ? {}
              : { span: STMode || formConfig?.inline ? 6 : 24 }
          "
          class="text-center mb-10px"
          :class="STMode ? '' : 'text-center'"
          :style="formConfig?.footerStyle"
        >
          <slot name="footer">
            <!-- <NSpace justify="center"> -->
            <n-button
              v-if="!formConfig?.autoSearch"
              :attr-type="'submit'"
              @click="handleValidateClick"
              type="primary"
              :loading="confirmLoading"
            >
              {{ formConfig?.submitText || "提交" }}
            </n-button>
            <n-button
              attr-type="button"
              @click="hadnleReset"
              class="ml-15px"
              v-if="!formConfig?.hideCancelButton"
            >
              {{ formConfig?.cancelText || "取消" }}
            </n-button>
            <slot name="buttonAppend"></slot>
            <!-- </NSpace> -->
          </slot>
        </n-grid-item>
      </n-grid>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { computed, readonly, ref } from "vue";
import {
  type FormInst,
  NForm,
  NButton,
  NGrid,
  NGridItem,
  NFormItemGi,
  type FormRules,
  type FormProps
} from "naive-ui";
import BaseInput from "./components/base-input/BaseInput.vue";
import BaseInputNumber from "./components/base-input-number/BaseInputNumber.vue";
import BaseSelect from "./components/base-select/BaseSelect.vue";
import BaseRadio from "./components/base-radio/BaseRadio.vue";
import BaseCascader from "./components/base-cascader/BaseCascader.vue";
import BaseTree from "./components/base-tree/BaseTree.vue";
import BaseDatePicker from "./components/base-date-picker/BaseDatePicker.vue";
import type { ISF_Item, TValidatorType } from "./types";
import { useTryCatch } from "v3-usehook";
import BaseUpload from "./components/base-upload/BaseUpload.vue";
import BaseCheckbox from "./components/base-checkbox/BaseCheckbox.vue";
import BaseTimePicker from "./components/base-time-picker/BaseTimePicker.vue";
import * as regular from "./validate";
import AliyunUpload from "./components/aliyun-upload/AliyunUpload.vue";
import BaseDynamicInput from "./components/base-dynamic-input/BaseDynamicInput.vue";

const emits = defineEmits(["onCancel", "onValuesChange"]);
const props = withDefaults(
  defineProps<{
    columns: ISF_Item[];
    formConfig?: FormProps & {
      colSpan?: number | string;
      responsive?: boolean;
      autoSearch?: boolean;
      hideCancelButton?: boolean;
      footerStyle?: any;
      cancelText?: string;
      hideFooter?: boolean;
      submitText?: string;
    };
    STMode?: boolean;
    initValue?: any;
    onSubmit?: (...args: any) => Promise<any>;
  }>(),
  {
    STMode: false,
    colSpan: 24,
    autoSearch: false,
    hideCancelButton: false,
    hideFooter: false
  }
);
const componentMap: any = {
  input: BaseInput,
  inputNumber: BaseInputNumber,
  select: BaseSelect,
  radio: BaseRadio,
  cascader: BaseCascader,
  tree: BaseTree,
  datePicker: BaseDatePicker,
  upload: BaseUpload,
  checkbox: BaseCheckbox,
  timePicker: BaseTimePicker,
  aliyunUpload: AliyunUpload,
  dynamicInput: BaseDynamicInput
};
const refs: any = {};
const confirmLoading = ref<boolean>(false);
const formRef = ref<FormInst | null>(null);
const formValue = ref<{ [propName: string]: any }>({});

const _columns = computed(() =>
  props.columns.filter(v => {
    if (v.hide instanceof Function) {
      return !v.hide(formValue.value);
    }
    return !v.hide;
  })
);
const rules: FormRules = {};
// 默认数据赋值
init();
function init() {
  if (props.initValue) {
    // 编辑时赋值默认数据
    formValue.value = { ...props.initValue };
  } else {
    // 新增时从表单配置中找default数据
    props.columns.forEach((v: ISF_Item) => {
      const config = v.config;
      if (config) {
        const isUpload = v.type === "upload" ? true : false;
        formValue.value[v.key] =
          config.defaultValue || config.defaultValue === 0
            ? config.defaultValue
            : isUpload
            ? []
            : null;
      }
    });
  }
}

/** 设置表单验证 */
setFormRules();
function setFormRules() {
  if (!props.columns) return;
  props.columns.forEach((v: ISF_Item) => {
    if (v.required) {
      const baseInfo = {
        required: true,
        trigger: ["blur", "change"],
        // 统一处理验证
        validator: !v.validator
          ? () => {
              if (
                !formValue.value[v.key] &&
                typeof formValue.value[v.key] !== "number"
              ) {
                return new Error(
                  !v.type || v.type === "input"
                    ? `请输入${v.title}`
                    : `请选择${v.title}`
                );
              }
            }
          : typeof v.validator === "string"
          ? () => regular[v.validator as TValidatorType](formValue.value[v.key])
          : () => (v.validator as any)(formValue.value[v.key], formValue.value)
      };
      const RULE: any = {
        ...baseInfo
      };
      rules[v.key] = [RULE];
    }
  });
}

/** 接管提交事件 */
function handleValidateClick(e?: MouseEvent) {
  e && e.preventDefault();
  formRef.value?.validate(async errors => {
    if (!errors) {
      confirmLoading.value = true;
      let [res] = await useTryCatch(
        props.onSubmit && props.onSubmit,
        formValue.value
      );
      if (res) {
        customFormReset();
      }
      confirmLoading.value = false;
    } else {
      console.log(errors);
    }
  });
}
function handleModelValueChange(propName: string, val: any, type: any) {
  formValue.value[propName] = val;
  /** autoSearchk下拉组件改变自动搜索 */
  if (props.formConfig && props.formConfig?.autoSearch) {
    if (type !== "input" && type !== "inputNumber") {
      handleValidateClick();
    }
  }
}
function handleClear(key: string) {
  delete formValue.value[key];
}
function hadnleReset() {
  // 表单组件的重置方法没生效
  formRef.value?.restoreValidation();
  customFormReset();
  emits("onCancel", readonly(formValue.value));
}

/** 自定义表单重置 */
function customFormReset() {
  formValue.value = {};
  const defaultValue: { [propName: string | number]: any } = {};
  props.columns.forEach((v: ISF_Item) => {
    const config = v.config;
    if (config) {
      const isUpload = v.type === "upload" ? true : false;
      defaultValue[v.key] =
        config.defaultValue || config.defaultValue === 0
          ? config.defaultValue
          : isUpload
          ? []
          : null;
    } else {
      defaultValue[v.key] = null;
    }
  });
  formValue.value = { ...defaultValue };
}
defineExpose({
  getProperty: (key: string): { setOptions: (options: any[]) => any } => {
    return refs[key];
  },
  setFormValue: (key: string, value: any) => {
    formValue.value[key] = value;
  },
  getFormValue() {
    return readonly(formValue.value);
  },
  validate() {
    return formRef.value?.validate();
  },
  setFormValues(values: any) {
    formValue.value = values;
  },
  resetForm() {
    customFormReset();
  }
});
</script>

<style scoped lang="less"></style>
