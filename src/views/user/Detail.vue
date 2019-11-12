<template>
  <v-app>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <template v-if="model.id">
            <v-btn color="primary" class="ma-1" @click="update">
              <v-icon class="mr-1">save</v-icon>Atualizar
            </v-btn>
          </template>

          <template v-else>
            <v-btn color="primary" class="ma-1" @click="save">
              <v-icon class="mr-1">save</v-icon>Cadastrar
            </v-btn>
          </template>

          <router-link to="/usuario">
            <v-btn class="ma-1">Voltar</v-btn>
          </router-link>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col class="ma-1">
                <v-card>
                  <v-card-title class="blue-grey lighten-4 black--text">
                    <h4 class="title font-weight-light mb-2">
                      <v-icon color="black">create</v-icon>Dados do Usuário
                    </h4>
                  </v-card-title>

                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex lg12 sm12 xs12>
                        <v-text-field
                          v-model="model.name"
                          label="Nome"
                          @click:clear="model.name = null"
                          :rules="[ v => !!v || 'O nome é obrigatório.' ]"
                          clearable
                        ></v-text-field>
                      </v-flex>

                      <v-flex lg6 sm6 xs12>
                        <v-text-field
                          v-model="model.email"
                          label="Email"
                          @click:clear="model.email = null"
                          :rules="[ v => !!v || 'O email é obrigatório.', rules.email]"
                          hint="email.exemplo@dominio.com.br"
                          clearable
                        ></v-text-field>
                      </v-flex>

                      <v-flex lg6 sm6 xs12>
                        <v-text-field
                          v-model="model.cpf"
                          v-mask="'###.###.###-##'"
                          label="CPF"
                          @click:clear="model.cpf = null"
                          :rules="[ v => !!v || 'O CPF é obrigatório.' ]"
                          clearable
                        ></v-text-field>
                      </v-flex>

                      <v-flex lg6 sm6 xs12>
                        <v-col cols="12" lg="6">
                          <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="model.birthDate"
                                label="Data Nascimento"  
                                persistent-hint
                                :rules="[ v => !!v || 'A data nascimento é obrigatório.' ]"
                                prepend-icon="event"
                                @blur="date = parseDate(model.birthDate)"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="model.birthDate" no-title @input="menu1 = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-flex>

                      <v-layout row wrap>
                        <v-flex lg6 sm6 xs12>
                          <v-text-field
                            v-model="model.nationality"
                            label="Nacionalidade"
                            @click:clear="model.nationality = null"
                            clearable
                          ></v-text-field>
                        </v-flex>

                        <v-flex lg6 sm6 xs12>
                          <v-text-field
                            v-model="model.birthPlace"
                            label="Naturalidade"
                            @click:clear="model.birthPlace = null"
                            clearable
                          ></v-text-field>
                        </v-flex>
                      </v-layout>

                      <v-flex lg2 sm6 xs12>
                        <v-radio-group v-model="model.gender" :mandatory="false">
                          <v-row justify="center">
                            <v-radio label="Masculino" value="M"></v-radio>
                          </v-row>
                        </v-radio-group>
                      </v-flex>

                      <v-flex lg2 sm6 xs12>
                        <v-radio-group v-model="model.gender" :mandatory="false">
                          <v-radio label="Feminino" value="F"></v-radio>
                        </v-radio-group>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Vue from "vue";
import GlobalStore from "@/store/modules/global";
import UserService from "@/services/user.service";
import { mask } from "vue-the-mask";
import { throwError, Subject } from "rxjs";
import {
  tap,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";
import { consoleInfo } from 'vuetify/src/util/console';

export default Vue.extend({
  directives: {
    mask
  },
  data: vm => ({
    id: null,
    date: "",//new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),   
    menu1: false,
    model: {
      profileList: []
    },
    valid: true,
    validAuth: true,
    rules: {
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "E-mail inválido.";
      }
    },
    controlProfiles: [],
    headers: [
      { sortable: false, align: "center", text: "Ações", value: "actions" }
    ]
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    loginFormated() {
      if (this.model.email && this.model.email.includes("@")) {
        return this.model.email.split("@")[0] || null;
      }
      return null;
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      console.log('passsou aquiii111111111' +  `${day}/${month}/${year}`)
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      console.log('passsou aquiii')
      //return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    show(id) {
      UserService.show(id).subscribe(result => {
        this.model = result;
      });
    },
    removeFunctionality(id) {
      const index = this.functionality.selected.findIndex(f => f.id === id);
      this.functionality.selected.splice(index, 1);
    },
    addLine() {
      this.validAuth = this.$refs.formAuth.validate();
      if (this.validAuth) {
        const controlProfile = {
          functionalityList: this.functionality.selected
        };
        if (index >= 0) {
          controlProfile.id = this.controlProfiles[index].id;
          this.controlProfiles.splice(index, 1, controlProfile);
        } else {
          this.controlProfiles.push(controlProfile);
        }

        this.clear();
      }
    },
    clear() {
      this.$refs.formAuth.resetValidation();
    },
    save() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        if (this.controlProfiles.length > 0) {
          this.model.controlProfiles = this.controlProfiles;
        }
        UserService.save(this.model).subscribe(result => {
          this.model = { profileList: [] };
          this.controlProfiles = [];
          this.$refs.form.resetValidation();
          this.showMessage("cadastrado");
        });
      }
    },
    update() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.model.controlProfiles = this.controlProfiles;

        UserService.update(this.id, this.model).subscribe(result => {
          this.$router.push("/usuario");
          this.showMessage("atualizado");
        });
      }
    },
    showMessage(message) {
      GlobalStore.setSnackBar({
        show: true,
        message: `Usuário ${message} com sucesso.`,
        type: "success"
      });
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    loginFormated(val) {
      this.model.login = val;
    }
  },
  mounted() {
    const { id } = this.$route.params;
    if (id) {
      this.id = id;
      this.show(id);
    }
  }
});
</script>
