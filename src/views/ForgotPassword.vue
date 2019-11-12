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
                    
                    <h5 class="login-page-form__title">Digite seu email para alterar sua senha</h5>
                  </div>
                  <v-text-field
                    append-icon="person"
                    label="Email"
                    type="email"
                    outline
                    v-model="formModel.username"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions clas>
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
import AuthenticationService from '@/services/authentication.service'

import { required } from 'vuelidate/lib/validators'
import { throwError } from 'rxjs'
import { tap } from 'rxjs/operators'

export default Vue.extend({
  components: {
    AppSnackBar
  },
  data: () => ({
    loading: false,
    formModel: {
      valid: false,
      username: ''
    },
    rules: {
      required: value => !!value || 'Esse campo deve ser preenchido'
    },
    error: '',
    returnUrl: ''
  }),
  validations: {
    username: { required }
  },
  created () {
    this.returnUrl = this.$route.query.returnUrl || '/'
  },
  methods: {
    onSubmit () {
      this.formModel.valid = this.$refs.form.validate()

      if (this.formModel.valid) {
        const { username } = this.formModel

        AuthenticationService
          .forgotPassword(username, this.returnUrl)
          .pipe(tap((value) => { this.loading = true }))
          .subscribe(
            response => {
              GlobalStore.setSnackBar({ show: true, message: 'Um email com um link para mudar sua senha foi enviado em seu email.', type: 'success' })
              this.clear()
            },
            error => {
              throwError(error)
              this.loading = false
            }
          )
      }
    },
    clear () {
      this.formModel = { valid: false, username: '' }
      this.$refs.form.resetValidation()
      this.loading = false
    }
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
