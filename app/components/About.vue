<template>
  <v-card elevation="0">
    <v-container class="px-6">
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="title font-weight-black">Lanchonete Opinião</h1>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="body-2">Palmital - SP</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card link @click="openWhatsApp">
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon size="26">{{ icons.mdiMoped }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="body-2 font-weight-medium">
                  Disk Entrega
                </v-list-item-title>
                <v-list-item-title class="body-2">
                  WhatsApp:
                  <span>018 3351 3545</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mdiMoped, mdiWhatsapp } from '@mdi/js'
export default {
  data() {
    return {
      icons: {
        mdiMoped,
        mdiWhatsapp
      }
    }
  },
  methods: {
    openWhatsApp() {
      window.open('https://wa.me/551833513545', '_blank')
    }
  }
}
</script>

<style></style>
