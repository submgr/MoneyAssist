<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="fileTrayOutline" />
          <ion-label>Операции</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/analytics">
          <ion-icon aria-hidden="true" :icon="statsChartOutline" />
          <ion-label>Аналитика</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/sync">
          <ion-icon aria-hidden="true" :icon="cloudyOutline" />
          <ion-label>Синхронизация</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, statsChartOutline, cloudyOutline, fileTrayOutline } from 'ionicons/icons';
</script>
