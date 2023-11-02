<template>
  <div class="pass-container">
    <div class="wrap flex justify-center flex-col">
      <div class="bg">
        <svg
          width="900"
          height="900"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="grain" x="-50vw" y="-50vh" width="100vw" height="100vh">
              <feFlood flood-color="#ffffff" result="neutral-gray" />

              <feTurbulence
                in="neutral-gray"
                type="fractalNoise"
                baseFrequency="2.5"
                numOctaves="100"
                stitchTiles="stitch"
                result="noise"
              />

              <feColorMatrix
                in="noise"
                type="saturate"
                values="0"
                result="destaturatedNoise"
              ></feColorMatrix>

              <feComponentTransfer in="desaturatedNoise" result="theNoise">
                <feFuncA type="table" tableValues="0 0 0.25 0"></feFuncA>
              </feComponentTransfer>

              <feBlend
                in="SourceGraphic"
                in2="theNoise"
                mode="soft-light"
                result="noisy-image"
              />
            </filter>

            <linearGradient
              id="linearGradientId"
              gradientTransform="rotate(60 0.5 0.5)"
            >
              <stop offset="0%" stop-color="#0093E9" />
              <stop offset="100%" stop-color="#80D0C7" />
            </linearGradient>

            <clipPath id="shape">
              <path
                fill="currentColor"
                d="M903,650.5Q859,801,716.5,861.5Q574,922,445,870.5Q316,819,214,730Q112,641,105,497.5Q98,354,187,232.5Q276,111,426,90Q576,69,688,158.5Q800,248,873.5,374Q947,500,903,650.5Z"
              ></path>
            </clipPath>
          </defs>

          <g filter="url(#grain)" clip-path="url(#shape)">
            <path
              fill="url(#linearGradientId)"
              d="M903,650.5Q859,801,716.5,861.5Q574,922,445,870.5Q316,819,214,730Q112,641,105,497.5Q98,354,187,232.5Q276,111,426,90Q576,69,688,158.5Q800,248,873.5,374Q947,500,903,650.5Z"
            />
          </g>
        </svg>
      </div>

      <div class="form-body">
        <h1 class="text-xl font-semibold mb-4 mb-16">源·汽修服务 🖥</h1>

        <div class="flex justify-center items-center">
          <div ref="lottieEl" class="w-450px lg:block hidden mr-20px"></div>
          <div class="form-box">
            <n-tabs
              class="card-tabs"
              :value="currentTab"
              size="large"
              animated
              pane-wrapper-style="margin: 0 -4px"
              pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
              tab-style="display:none"
            >
              <n-tab-pane name="login">
                <div class="text-xl font-semibold mb-4 text-center">登录</div>
                <n-form ref="formRef" :model="modelRef" :rules="rules">
                  <n-form-item path="loginId" label="用户名">
                    <n-input
                      v-model:value="modelRef.loginId"
                      :input-props="{ autocomplete: 'on' }"
                    />
                  </n-form-item>
                  <n-form-item path="pw" label="密码">
                    <n-input
                      v-model:value="modelRef.pw"
                      type="password"
                      show-password-toggle
                      :input-props="{ autocomplete: 'on' }"
                    />
                  </n-form-item>
                  <div class="flex justify-end -mt-10px mb-10px">
                    <n-checkbox v-model:checked="remember"> 记住我 </n-checkbox>
                  </div>
                  <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                      <div>
                        <n-button
                          attr-type="submit"
                          round
                          type="primary"
                          @click="handleValidateButtonClick"
                          block
                          :loading="loading"
                        >
                          {{ loading ? "登录中..." : "登录" }}
                        </n-button>
                        <n-button
                          round
                          default="default"
                          @click="hadnleReset"
                          block
                          class="mt-15px"
                        >
                          重置
                        </n-button>
                      </div>
                    </n-col>
                  </n-row>
                </n-form>
              </n-tab-pane>
              <!-- <n-tab-pane name="school" class="">
                <NSpace class="h-356px text-center" vertical justify="center">
                  <n-form>
                    <n-form-item path="school" label="请选择校区">
                      <n-select
                        :options="schools"
                        label-field="xqname"
                        value-field="xqid"
                        v-model:value="currentSchool"
                        @keydown.enter.prevent
                      />
                    </n-form-item>
                  </n-form>

                  <button
                    class="button"
                    :class="{ loading: loading2 }"
                    :disabled="loading2"
                    @click="handleSelectSchool"
                  >
                    <span v-show="!loading2"> 进入</span>
                    <span class="spinner" v-show="loading2"></span>
                  </button>
                </NSpace>
              </n-tab-pane> -->
            </n-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import lottie from "lottie-web";

import {
  NForm,
  NFormItem,
  NButton,
  NRow,
  NCol,
  NInput,
  NEllipsis,
  NSelect,
  NTabPane,
  NTabs,
  NCheckbox,
  type FormInst,
  useMessage,
  type FormRules,
  NSpace
} from "naive-ui";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/stores/user-store";
import cache from "@/utils/cache";
// import { aclsStore } from "@/stores/acl-store";
import { useTryCatch } from "v3-usehook";
import { userService } from "@/services/user/user-service";
import type { IUserInfo } from "@/services/user/type";
import { encryption, encryptionLong } from "@/utils/encrypt";

interface ModelType {
  loginId: any;
  pw: string;
}
// tab栏
const currentTab = ref("login");
// 机器人动画
let lottieEl = ref();
let path = "/files/lottie.json";
// 用户信息
let userInfo: IUserInfo;
const router = useRouter();
// 记住用户名密码
const remember = ref(false);
// 用户store
const user = userStore();
const loading = ref<boolean>(false);
const loading2 = ref<boolean>(false);
// 校区list
const schools = ref<any[]>([]);
const currentSchool = ref();

onMounted(() => {
  lottie.loadAnimation({
    container: lottieEl.value, // the dom element that will contain the animation
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: path // the path to the animation json
  });
});
const formRef = ref<FormInst | null>(null);
const message = useMessage();
const modelRef = ref<ModelType>({
  loginId: "",
  pw: ""
});
if (cache.getLSCache("rme")) {
  const login = cache.getLSCache("rme");
  modelRef.value = login.account;
  remember.value = login.remember;
}

const rules: FormRules = {
  loginId: [
    {
      required: true,
      message: "请输入用户名"
    }
  ],
  pw: [
    {
      required: true,
      message: "请输入密码"
    }
  ]
};

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate(async errors => {
    if (!errors) {
      loading.value = true;
      let [res, err] = await useTryCatch(
        userService.doLogin,
        encryptionLong({ ...modelRef.value, endTime: Date.now() })
      );
      // user.setSchoolInfo(res.data.loginId)
      // if (res && res.success) {
      //   await aclsStore().getAcls(res.data.loginId);
      // }
      if (err) {
        loading.value = false;
      }
      if (res.success) {
        // 记住密码
        handleRemberpw();
        userInfo = {
          ...res.data
        };
        user.setUserInfo(userInfo);
        router.push("/home");
      }
    } else {
      console.log(errors);
      message.error("验证失败");
    }
    loading.value = false;
  });
}

async function handleSelectSchool() {
  loading2.value = true;
  let shool = schools.value.find(v => v.xqid === currentSchool.value);
  user.setUserInfo({ ...userInfo, ...shool });
  // await aclsStore().getAcls(shool.rid);
  loading2.value = false;
  router.push("/home");
  // dictsStore().getDicts();
}

// 处理记住密码
function handleRemberpw() {
  if (remember.value) {
    cache.setLSCache("rme", {
      account: modelRef.value,
      remember: remember.value
    });
  } else {
    cache.removeLSCache("rme");
  }
}
function hadnleReset() {
  modelRef.value = { loginId: "", pw: "" };
}
</script>

<style scoped lang="less">
.pass-container {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f0f2f5;
  width: 100vw;
  .wrap {
    flex: 1;
    padding: 32px 0;
    .bg {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
    .form-body {
      margin: 0 auto;
      border-radius: 10px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      padding: 20px 20px 20px 40px;
      position: relative;
      z-index: 10;
      background: #fcfcfc;
      .img {
        width: 400px;
        margin-right: 50px;
      }
      .form-box {
        height: 456px;
        width: 250px;
        margin: auto;
        .login-form {
          margin-top: 40px;
        }
      }
    }
  }
}
.button {
  position: relative;
  height: 34px;
  width: 100%;
  border-radius: 34px;
  background-image: none;
  border: none;
  outline: none;
  background-color: #3366ffff;
  color: white;
  text-transform: uppercase;
  // font-size: px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s ease-out;
}
// .button::after {
//   content: '';
//   display: block;
//   position: absolute;
//   width: 160px;
//   height: 40px;
//   background-color: black;
//   z-index: -1;
//   left: calc(50% - 80px);
//   top: 10px;
//   opacity: 0.3;
//   filter: blur(5px);
//   transition: all 0.2s ease-out;
// }
.button:hover::after {
  opacity: 0.5;
  filter: blur(20px);
  transform: translatey(10px) scalex(1.2);
}
.button:active {
  background-color: #598bffff;
}
.button:active::after {
  opacity: 0.3;
}
.loading {
  border-radius: 50px;
  width: 50px;
}
.button.loading::after {
  width: 40px;
  left: 5px;
  top: 12px;
  border-radius: 100%;
  margin: 0 auto;
}
.spinner {
  display: block;
  width: 25px;
  height: 25px;
  position: absolute;
  top: 0;
  // left: calc(50% - 17px);
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: transparent;
  box-sizing: border-box;
  border-top: 4px solid white;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-radius: 100%;
  animation: spin 0.6s ease-out infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
