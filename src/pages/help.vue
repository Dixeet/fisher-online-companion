<template>
  <div>
    <h2 id="getting-started" class="text-h5">Getting started</h2>
    <v-divider class="mb-5" />
    <ol>
      <li>Choose your current location (lake, river...)</li>
      <li>
        Click on "Go Fishing" or <v-icon><i-game-boat-fishing></i-game-boat-fishing></v-icon> on the
        top bar
      </li>
      <li>
        Add fishes to the location
        <v-icon color="success" size="small"
          ><i-mdi-plus-circle-outline></i-mdi-plus-circle-outline
        ></v-icon>
      </li>
      <li>
        Click on "Tackles" and create one or more tackle (if you leave the name empty, by default it
        will copy the rod name)
      </li>
      <li>
        On the tackles page click on one of
        <v-icon color="success" size="small"><i-mdi-check></i-mdi-check></v-icon> to select the
        tackle as your current tackle. You can then modify your current tackle on the left bar.
      </li>
      <li>
        Go back to the main page ("Go Fishing" or
        <v-icon><i-game-boat-fishing></i-game-boat-fishing></v-icon>)
      </li>
      <li>
        If you want you can set your current position in the game (grid coordinate eg: D5, A11
        etc..)
      </li>
      <li>
        When you catch a fish in game, click
        <v-icon>
          <i-game-lucky-fisherman></i-game-lucky-fisherman>
        </v-icon>
        on the fish to add a catch. By default it will copy your current tackle, and current
        position but you can modify them or select another saved tackle.
      </li>
      <li>
        Click on
        <v-icon color="tertiary" size="large">
          <i-game-fishing></i-game-fishing>
        </v-icon>
        to quickly add a catch (copy current tackle and current position)
      </li>
      <li>
        Click on
        <v-icon>
          <i-game-fish-bucket></i-game-fish-bucket>
        </v-icon>
        to list all your catches and get some statistics (top 5 most used bait/lure, and position)
      </li>
    </ol>
    <h2 id="informations" class="text-h5 mt-5">Informations</h2>
    <v-divider class="mb-5" />
    <p>
      No data is collected, everything is store directly into your browser. You can however export /
      import your data.
    </p>
    <h2 id="manage-database" class="text-h5 mt-5">Manage Data / Import / Export</h2>
    <v-divider class="mb-5" />
    <ul>
      <li>
        Click on
        <v-icon>
          <i-mdi-database-edit></i-mdi-database-edit>
        </v-icon>
        on the left bar
      </li>
      <li>
        You can "Delete Database", be carefull this will delete the entire database, including your
        own entries. You will have to reload the page.
      </li>
      <li>Clear your data : delete your own selected data from the database</li>
      <li>Import / Export : allows you to save and import your data</li>
    </ul>
  </div>
</template>

<script setup></script>

<style></style>
