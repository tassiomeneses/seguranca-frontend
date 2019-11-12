<template>
  <v-app>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-form ref="form" @submit.prevent="search">
            <v-expansion-panels accordion focusable>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <div>
                    <v-icon color="darken-1">filter_list</v-icon> Filtros de Pesquisa
                  </div>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-layout row>
                    <v-flex lg4 sm4 xs12>
                      <v-text-field
                        v-model="model.name"
                        label="Nome"
                        @click:clear="model.name = null"
                        clearable
                      ></v-text-field>
                    </v-flex>

                    <v-flex lg4 sm4 xs12>
                      <v-text-field
                        v-model="model.login"
                        label="Login"
                        @click:clear="model.login = null"
                        clearable
                      ></v-text-field>
                    </v-flex>

                    <v-flex lg4 sm4 xs12>
                      <v-text-field
                        v-model="model.email"
                        label="Email"
                        @click:clear="model.email = null"
                        clearable
                      ></v-text-field>
                    </v-flex>


                    <v-flex lg4 sm4 xs12>
                      <v-select
                        v-model="model.active"
                        :items="active.items"
                        item-text="name"
                        item-value="value"
                        label="Status"
                        clearable
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-btn color="green float-right white--text" type="submit">
                    <v-icon>search</v-icon> Pesquisar
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-form>
        </v-flex>

        <v-flex lg12 sm12 xs12>
          <router-link :to="{ name: 'user-register' }">
            <v-btn color="primary mb-2">
              <v-icon left dark>add</v-icon>
              Adicionar
            </v-btn>
          </router-link>

          <v-card>
            <v-card-text>
              <v-data-table
                v-model="user.selected"
                :items="user.items"
                :headers="user.headers"
                :loading="user.loading"
                :options.sync="pagination"
                :server-items-length="user.total"
                :footer-props="{ showFirstLastPage: true, showCurrentPage: true }"
              >
                <template v-slot:item.active="{ item }">
                  {{ item.active ? 'Ativo' : 'Inativo' }}
                </template>


                <template v-slot:item.actions="{ item }">
                  <v-tooltip bottom >
                    <template v-slot:activator="{ on }">
                      <router-link :to="{ name: 'user-edit', params: { id: item.id } }">
                        <v-btn v-on="on" x-small text icon>
                          <v-icon small>edit</v-icon>
                        </v-btn>                     
                      </router-link>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>

                  <v-tooltip bottom >
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" x-small text icon @click.stop="selected = item">
                        <v-icon small>delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Inativar</span>
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Confirmar inativação.</v-card-title>
            <v-card-text>Você tem certeza que deseja inativar o usuário <span class="body-1">{{ selected.name }}</span> ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="selected = {}">Cancelar</v-btn>
              <v-btn color="green darken-1" text @click="remove">Confirmar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Vue from 'vue'
import GlobalStore from '@/store/modules/global'
import UserService from '@/services/user.service'
import { throwError, Subject } from 'rxjs'
import { tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

export default Vue.extend({
  data () {
    return {
      model: {},
      selected: {},
      user: {
        total: 0,
        items: [],
        loading: true,
        headers: [
           { text: 'Id', value: 'id' },
          { text: 'Nome', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Status', value: 'active' },
          { text: 'Ações', value: 'actions', sortable: false, align: 'center' }
        ]
      },
      active: {
        items: [
          { name: 'Ativo', value: true },
          { name: 'Inativo', value: false }
        ]
      },
      pagination: {},
    }
  },
  computed: {
    dialog: {
      get () { return !!this.selected.id },
      set (show) {
        if (show) {
          this.selected = {}
        }
      }
    }
  },
  methods: {
    search () {
      this.user.loading = true
      const { sortBy, sortDesc, page, itemsPerPage } = this.pagination
      const { id, name, login, email, active } = this.model
      const total = itemsPerPage < 0 ? this.user.total : itemsPerPage

      const model = {
        id,
        name,
        login,
        email,
        active,
        propertiesReturn: ['id', 'name', 'login', 'email', 'gender', 'birthPlace', 'nationality', 'birthDate', 'active'],
        sort: sortBy.length > 0 ? sortBy : ['name'],
        ascendingSort: !sortDesc[0]
      }
      UserService
        .pageFindBy(model, page, total)
        .subscribe(
          result => {
            const { content, totalElements } = result
            console.log(result)
            this.user.items = content
            this.user.total = totalElements
            this.user.loading = false
          },
          error => {
            throwError(error)
            this.user.loading = false
          }
        )
    },
    remove () {      
      const { id, name } = this.selected
      UserService
        .remove(id)
        .subscribe((result) => {
          this.selected = {}
          this.search()
          GlobalStore.setSnackBar({
            show: true,
            message: `O usuário ${name} foi inativado com sucesso.`,
            type: 'success'
          })
        })
    }
  },
  watch: {
    pagination: {
      handler () {
        this.search()
      },
      deep: true
    },
  },
  mounted () {
    this.search()
  }
})
</script>
