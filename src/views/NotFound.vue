<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <div class="text-md-center">
          <h1>404</h1>
          <h2 class="my-3 headline">Ops.. Recurso pesquisado não encontrato.</h2>
          <div>
            <router-link to="/">
              <a title="Retornar a página inicial" class="page_notfound__link">Retornar a página inicial</a>
            </router-link>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style lang="scss" scoped>
  h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: #252932;
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
      rgba(61, 61, 61, 0.3) 3px 3px;
  }
</style>
