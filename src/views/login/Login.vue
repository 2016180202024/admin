<template>
    <div class="login-container base">
        <div class="login-header">
            <el-menu :default-active="loginType" mode="horizontal" @select="handleLoginTypeSelect">
                <el-menu-item index="nameAndPassword">账号密码登录
                </el-menu-item>
                <el-menu-item index="identifyCode">快速登录</el-menu-item>
            </el-menu>
        </div>
        <div class="login-form">
            <el-form :model="loginForm" status-icon :rules="loginFormRules" autoComplete="on" ref="loginForm"
                     label-position="left">
                <el-form-item prop="username">
                    <el-input
                            size="medium"
                            v-model="loginForm.username"
                            autoComplete="on"
                            type="text"
                            prefix-icon="icon-forest-fire-user-icon_xinyong_xianxing_jijin-"
                            placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password" v-if="loginType==='nameAndPassword'">
                    <el-input
                            size="medium"
                            v-model="loginForm.password"
                            :type="pwdType"
                            autoComplete="on"
                            prefix-icon="icon-forest-fire-user-mima"
                            placeholder="密码不少于6位"></el-input>
                </el-form-item>
                <el-form-item prop="validateCode" v-if="loginType==='nameAndPassword'">
                    <el-input
                            size="medium"
                            v-model="loginForm.validateCode"
                            autoComplete="on"
                            style="width: 65%;margin-right: 3%"
                            prefix-icon="icon-forest-fire-user-yanzhengma"
                            placeholder="验证码"></el-input>
                    <img class="picture-code" @click="switchPictureCode" :src="pictureInfo.img"
                         width="30%" height="30px" style="margin-bottom: 10px">
                </el-form-item>
                <el-form-item prop="identifyCode" v-if="loginType==='identifyCode'">
                    <el-input
                            size="medium"
                            v-model="loginForm.identifyCode"
                            autoComplete="on"
                            style="width: 60%;margin-right: 3%"
                            prefix-icon="icon-forest-fire-user-duanxinyanzhengma"
                            placeholder="验证码"></el-input>
                    <el-popover
                            placement="bottom-start"
                            style="width: 35%"
                            :disabled="ifPopper"
                            trigger="click"
                            content="请输入正确的手机号">
                        <el-button class="btn_sendCode" v-loading="sendLoading" slot="reference" v-if="isSendAuthCode"
                                   @click="getAuthCode()"
                                   type="primary" size="medium"
                                   style="width: 35%;position: absolute;right: 0;height: 90%;top:5%">获取验证码
                        </el-button>
                        <el-button class="btn_sendCode" slot="reference" v-if="!isSendAuthCode"
                                   @click="showAuthCodeMessage()"
                                   type="primary" size="medium"
                                   style="width: 35%;position: absolute;right: 0;height: 90%;top:5%">重新发送: {{authTime}}秒
                        </el-button>
                    </el-popover>
                </el-form-item>
                <el-form-item style="margin-left: 0%">
                    <el-row>
                        <el-button
                                v-loading="loginLoading"
                                size="medium"
                                type="primary"
                                @keyup.enter.native="handleLogin('loginForm')"
                                @click.native.prevent="handleLogin('loginForm')"
                                style="width: 100%">登 录
                        </el-button>
                    </el-row>
                    <el-row style="height: 15px">
                        <router-link v-if="loginType==='nameAndPassword'" to="/home/findPassword"
                                     style="display: block;color: rgba(64,158,255,1);cursor: pointer;position: absolute;right: 0.5%">
                            忘记密码
                        </router-link>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {Base64} from 'js-base64'
import {getPictureCode, sendAuthCode} from '../../scripts/api/login'
import {
  getUserNameOptionType,
  sendAuth,
  encryptPassword,
  sendAuth4IdentifyCode
} from '../../scripts/utils/userUtils'
import {showMessage} from '../../scripts/utils/utils'
import {isTelenumber} from '../../scripts/utils/validateUtils'

export default {
  name: 'Login',
  created () {
    this.getPictureCode()
  },
  data: function () {
    const validateUsername = (rule, value, callback) => {
      if (!isTelenumber(value)) {
        callback(new Error('请输入正确的手机号！'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('输入的密码少于6位'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码为空'))
      } else if (value.length !== 4) {
        callback(new Error('验证码长度为4'))
      } else {
        callback()
      }
    }
    const validateIdentifyCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('短信验证码为空'))
      } else if (value.length !== 6) {
        callback(new Error('短信验证码长度为6'))
      } else {
        callback()
      }
    }
    return {
      loginType: 'nameAndPassword',
      ifPopper: true,
      isSendAuthCode: true,
      sendLoading: false,
      authTime: '0',
      loginForm: {
        username: '',
        password: '',
        validateCode: '',
        identifyCode: ''
      },
      loginFormRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePass}],
        validateCode: [{required: true, trigger: 'blur', validator: validateCode}],
        identifyCode: [{required: true, trigger: 'blur', validator: validateIdentifyCode}]
      },
      loginLoading: false,
      pwdType: 'password',
      pictureInfo: {
        img: '',
        code: '',
        expiredTime: ''
      }

    }
  },
  methods: {
    handleLoginTypeSelect: function (index) {
      this.loginType = index
    },
    showAuthCodeMessage: function () {
      showMessage(this, '操作频繁，请' + this.authTime + '秒后再试', 'warning')
    },
    getAuthCode: function () {
      // 获取手机验证码
      if (isTelenumber(this.loginForm.username)) {
        this.sendLoading = true
        sendAuthCode(this.loginForm.username, 'login', 1).then((response) => {
          this.sendLoading = false
          let smsData = response.data
          if (smsData.success) {
            showMessage(this, smsData.message, 'success')
            this.ifPopper = true
            this.isSendAuthCode = false
            this.authTime = 60
            let authTimeTimer = setInterval(() => {
              this.authTime--
              if (this.authTime <= 0) {
                this.isSendAuthCode = true
                clearInterval(authTimeTimer)
              }
            }, 1000)
          } else {
            showMessage(this, smsData.message, 'error')
          }
        }).catch((error) => {
          console.log(error)
          // 500为手机号已被注册
        })
      } else {
        this.ifPopper = false
      }
    },
    getPictureCode () {
      getPictureCode().then((res) => {
        this.pictureInfo.img = res.data.img
        this.pictureInfo.code = Base64.decode(res.data.code)
        this.pictureInfo.expiredTime = res.data.expiredTime
      }).catch((error) => {
        this.$message.error('网络异常，图片验证码无法显示！')
        this.pictureInfo.img = ''
        this.pictureInfo.code = ''
        this.pictureInfo.expiredTime = ''
        console.log(error)
      })
    },
    switchPictureCode: function () {
      this.getPictureCode()
    },
    handleLogin: function (formName) {
      if (this.loginType === 'nameAndPassword') {
        // const self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.loginForm.validateCode.toUpperCase() !== this.pictureInfo.code.toUpperCase()) {
              this.loginForm.validateCode = ''
              showMessage(this, '验证码不正确！', 'error')
              this.getPictureCode()
            } else if (this.pictureInfo.expiredTime < new Date().getTime()) {
              showMessage(this, '验证码已过期！', 'error')
              this.getPictureCode()
            } else {
              // todo 登录功能实现----token 设置
              const AuthReq = {
                option: this.loginForm.username,
                password: encryptPassword(this.loginForm.password),
                optionType: getUserNameOptionType(this.loginForm.username)
              }
              sendAuth(AuthReq, this)
            }
          } else {
            showMessage(this, '请填写正确的登录信息！', 'error')
            return false
          }
        })
      } else if (this.loginType === 'identifyCode') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const AuthReq4IdentifyCode = {
              phone: this.loginForm.username,
              identifyCode: this.loginForm.identifyCode
            }
            sendAuth4IdentifyCode(AuthReq4IdentifyCode, this)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .el-input-style {
        /deep/ .el-input__inner {
            /* border-top-width: 0;
         border-bottom-width: 1px;
         border-left-width: 0;
         border-right-width: 0;*/
            background: #ffffff;
            border-radius: 0;
            font-size: 14px;
            color: #000000;
        }
    }

    .label-item-style {
        /deep/ .el-form-item__label {
            color: #000000;
        }
    }

    .el-tabs-style {
        /deep/ .el-tabs__item {
            font-size: 15px !important;
            color: grey;
        }
    }

    .el-hover {
        /deep/ .el-tabs__item:hover {
            color: #000000;
        }
    }

    .el-tabs-active {
        /deep/ .el-tabs__item.is-active {
            color: #000000;
        }
    }

    .picture-code {
        position: relative;
        top: 6px;
        cursor: pointer;
    }

    .login-header {
        margin: 0% 5% 1%;
        font-size: 18px;
        text-align: center;

        /deep/ .el-menu-item {
            font-size: 18px;
            padding: 0 10%;
            width: 50%;
        }
    }

    .login-container {
        background-color: white;
        border-radius: 3px;
        position: fixed;
        left: 40%;
        right: 40%;
        top: 35%;
        /*bottom: 40%;*/
        z-index: 1000;
    }

    .login-form {
        padding: 5% 10% 0% 10%;

        /deep/ .el-input__suffix {
            color: #67c23a;
        }
    }

    .el-button--medium {
        padding: 10px 10px
    }

    .btn_sendCode.el-button--medium {
        padding: 0px 0px
    }
</style>
