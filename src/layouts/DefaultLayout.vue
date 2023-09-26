<template>
  <v-layout>
    <v-app-bar elevation="1" density="compact">
      <v-app-bar-title>
        <router-link to="/">Fisher Online Companion</router-link>
      </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Rigs" to="/rigs"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Transition mode="out-in">
              <Suspense>
                <component :is="Component"></component>
              </Suspense>
            </Transition>
          </template>
        </RouterView>
      </v-container>
    </v-main>
  </v-layout>
</template>
