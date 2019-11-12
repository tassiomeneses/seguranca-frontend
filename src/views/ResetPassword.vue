<template>
  <v-app id="login">
    <app-snack-bar></app-snack-bar>
    <v-content class="login-page">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm4 md4 lg3.5>
            <v-card class="elevation-1 pa-3 login-page-card" max-width="365">
              <v-form
                ref="form"
                v-model="formModel.valid"
                lazy-validation
                @submit.prevent="onSubmit"
                class="login-page-form">
                <v-card-text>
                  <div class="layout column align-center">

                    <h5 class="login-page-form__title">Digite sua nova senha</h5>
                  </div>
                  <v-text-field
                    append-icon="lock"
                    label="Senha"
                    type="password"
                    outline
                    v-model="formModel.password"
                    :rules="[ v => !!v || 'A senha é obrigatória.' ]"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    label="Confirmar Senha"
                    type="password"
                    outline
                    v-model="formModel.confirm_password"
                    :rules="[ v => !!v && v === formModel.password || 'As senhas não são iguais.' ]"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    block
                    large
                    type="submit"
                    color="primary"
                    class="login-page-form__submit"
                    :loading="loading"
                  >Enviar</v-btn>
                  <div v-if="error" class="alert alert-danger">{{ error }}</div>
                </v-card-actions>
                <v-card-text>
                  <template v-if="returnUrl">
                    <a :href="returnUrl" class="float-center">Voltar</a>
                  </template>

                  <template v-else>
                    <a @click="history.back()" class="float-center">Voltar</a>
                  </template>
                </v-card-text>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue'
import GlobalStore from '@/store/modules/global'
import AppSnackBar from '@/components/AppSnackBar'
import UserService from '@/services/user.service'
import AuthenticationService from '@/services/authentication.service'
import { User } from '@/models/user'
import { router } from '@/router'

import JwtDecode from 'jwt-decode'
import { throwError } from 'rxjs'
import { tap } from 'rxjs/operators'
import { required } from 'vuelidate/lib/validators'

export default Vue.extend({
  components: {
    AppSnackBar
  },
  data: () => ({
    loading: false,
    formModel: {
      valid: false,
      password: '',
      confirm_password: ''
    },
    rules: {
      required: value => !!value || 'Esse campo deve ser preenchido'
    },
    error: '',
    user: {},
    token: null,
    returnUrl: ''
  }),
  validations: {
    password: { required },
    confirm_password: { required }
  },
  methods: {
    onSubmit () {
      this.formModel.valid = this.$refs.form.validate()

      if (this.formModel.valid) {
        const { password } = this.formModel

        AuthenticationService
          .resetPassword({ id: this.user.id, password, token: this.token })
          .pipe(tap((value) => { this.loading = true }))
          .subscribe(
            response => {
              GlobalStore.setSnackBar({ show: true, message: 'Sua senha foi alterada com sucesso!', type: 'success' })
              this.clear()
            },
            error => {
              throwError(error)
              this.loading = false
            }
          )
      }
    },
    initUser () {
      try {
        const user = GlobalStore.user || {}
        this.token = this.$route.query['token'] || AuthenticationService.token
        this.user = user.firstAccess ? user : this.decodeUser()
      } catch (err) {
        GlobalStore.setSnackBar({ show: true, message: `Token Inválido`, type: 'error' })
        router.push({ name: 'login' })
      }
    },
    decodeUser () {
      const { sub, name, username, email } = JwtDecode(this.token)
      return new User(sub, name, username, email)
    },
    clear () {
      this.formModel = { valid: false, password: '', confirm_password: '' }
      this.$refs.form.resetValidation()
      this.loading = false
    }
  },
  mounted () {
    this.initUser()
    this.returnUrl = this.$route.query.returnUrl || '/'
  },
  activated () {
    this.clear()
  }
})
</script>

<style scoped lang="scss">
#login {
  .login-page {
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;

    &-card {
      padding: 30px;
      margin: auto;
    }

    &-form {
      margin-top: 10px;
      margin-bottom: 10px !important;

      &__logo {
        width: 75%;
        margin: 0px auto 20px auto;
        display: table;
      }

      &__title {
        text-align: center;
        font-weight: 400;
        margin: 5px auto;
      }
    }
  }
}
</style>
