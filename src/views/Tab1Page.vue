<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>История</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">История</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreAccounted name="Tab 1 page" />

      <ion-fab slot="fixed" vertical="bottom" horizontal="end" style="margin-bottom: 1vh; margin-right: 3vw;">
        <ion-fab-button @click="actionProvider('addEl')">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue';
import { chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe, addOutline } from 'ionicons/icons';
import ExploreAccounted from '@/components/ExploreAccounted.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { IonPage, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonTitle, IonToolbar, ExploreAccounted },
    setup() {
      return { chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe, addOutline }
    },
    mounted(){
      // eslint-disable-next-line
      const parent_this = this;

      parent_this.$database_actions.allDocs({
  include_docs: true,
  attachments: true
}, function(err, response) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("Documents fetches succesfully.",response);
                }
            });
    },
    methods: {
      actionProvider(type = ""){
        
        switch (type) {
          case "addEl":
            this.$router.push( { path:'/tabs/newBudgetEvent', replace: false } );
            break;
        
          default:
            break;
        }
      },
      
      
    }
})
</script>
