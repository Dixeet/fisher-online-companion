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
        Choose your current bait / lure by clicking on
        <v-btn class="flex-grow-1 mr-1" rounded="0" size="x-small" color="primary" variant="tonal">
          Bait
        </v-btn>
        <v-btn class="flex-grow-1" rounded="0" size="x-small" color="primary" variant="tonal">
          Lure
        </v-btn>
      </li>
      <li>
        If you want you can set your current position in the game (grid coordinate eg: D5, A11
        etc..)
      </li>
      <li>
        When you catch a fish, click
        <v-btn
          alt="Quick add a catch"
          size="small"
          color="primary"
          variant="tonal"
          density="comfortable"
          rounded="0"
        >
          <template #prepend>
            <v-icon size="large">
              <i-game-fishing></i-game-fishing>
            </v-icon>
          </template>
          Add a catch
        </v-btn>
        on the fish you caught. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;It will add your current bait / lure and position as a new catch for
        this fish.
      </li>
      <li>
        Instead of adding a fish everytime you catch one. You can open your keepnet, and add every
        fish with their associated bait.
      </li>
      <li>On each fish, you can check the list of every catch you made grouped by bait / lure.</li>
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
