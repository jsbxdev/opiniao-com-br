<template>
  <v-app>
    <v-app-bar
      fixed
      app
      shrink-on-scroll
      color="white"
      src="/banner.jpg"
      elevation="0"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to bottom, rgba(255,255,255,0), rgba(255,255,255,.3)"
        ></v-img>
      </template>
      <v-spacer></v-spacer>
      <v-btn icon @click="share">
        <v-icon>{{ icons.mdiShareVariant }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer
      app
      absolute
      color="white"
      class="text-center d-flex justify-center grey--text"
      elevation="2"
    >
      <span>Lanchoente Opinião &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mdiShareVariant } from '@mdi/js'
export default {
  data() {
    return {
      icons: {
        mdiShareVariant
      },
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Lanchonete Opinião',
      shareData: {
        title: 'Lanchonete Opinião',
        text: 'Conheça o nosso cardápio!',
        url: 'https://lanchoneteopiniao.com.br'
      }
    }
  },
  methods: {
    async share() {
      try {
        await navigator.share(this.shareData)
      } catch (e) {}
    }
  },
  middleware: 'database'
}
</script>
