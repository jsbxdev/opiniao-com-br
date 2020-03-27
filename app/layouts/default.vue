<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app elevate-on-scroll color="white">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn icon>
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
      title: 'Lanchonete Opinião'
    }
  },
  middleware: 'database'
}
</script>
