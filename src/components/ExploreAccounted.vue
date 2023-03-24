<template>
<div id="container">
    <ion-item button v-for="row in accounted_list" :key="row.doc.id">
        <ion-grid class="ionlist_custom" @click="getDetailsAboutAction(row.id)">
            <ion-row class="ionlist_custom">
                <ion-col size="8">
                    <ion-label><b>{{ row.doc.category }}</b></ion-label>
                    <div style="margin-top: 0.6vh;"> 
                        <ion-label v-if="row.doc.type == 'income'"><span style="opacity: 0.62">Доходы - {{row.doc.date}}</span></ion-label>
                        <ion-label v-if="row.doc.type == 'expense'"><span style="opacity: 0.62">Расходы - {{row.doc.date}}</span></ion-label>
                    </div>
                    
                </ion-col>
                <ion-col size="4">
                    <ion-label style="font-size: 20px; margin-top: 0.9vh;"><span style="opacity: 0.99"><span v-if="row.doc.type == 'income'"><span>+</span></span>
                        <span v-if="row.doc.type == 'expense'"><span>-</span></span>{{ row.doc.amount }} ₽</span></ion-label>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-item>
    <ion-modal
        @willDismiss="Modal_onWillDismiss"
        :is-open="modalState == 'detailsForAction'"
        :initial-breakpoint="0.55"
        :breakpoints="[0, 0.25, 0.5, 0.75]"
    >
      <ion-content class="ion-padding">
        <div class="ion-margin-top">
            <ion-grid>
                <ion-row>
                    <ion-col size="7">
                        <ion-label style="font-size: 1.8rem;">
                            <b><span v-if="modalPayload.type == 'income'" style="color: green">+{{ modalPayload.amount }}<span style="opacity: 0.85; font-size: 1.4rem;"> ₽</span></span><span v-if="modalPayload.type == 'expense'" style="color: black">-{{ modalPayload.amount }}<span style="opacity: 0.85; font-size: 1.4rem;"> ₽</span></span></b>
                        </ion-label><br/>
                        <div style="margin-top: 1.3vh">
                            <ion-label > {{ modalPayload.date }} </ion-label>
                        </div>
                        
                    </ion-col>
                    <ion-col size="5">
                        <img src="../assets/3d-business-cash-and-coins.png"/>
                    </ion-col>
                </ion-row>
            </ion-grid>
            
          
        </div>
      </ion-content>
    </ion-modal>
</div>
</template>

  
<style scoped>

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>

  
<script lang="ts">
import {
    //IonIcon,
    IonModal, IonContent, IonGrid, IonRow, IonCol, IonLabel
} from '@ionic/vue';
import {
    trashBinOutline
} from 'ionicons/icons';
import ExploreAccounted from '@/components/ExploreAccounted.vue';
import {
    defineComponent
} from 'vue';

export default defineComponent({
    components: {
        //IonIcon,
        IonModal
    },
    watch: {
      '$route' () {
        this.loadData();
      }
    },
    data() {
        return {
            accounted_list: [
            ],
            modalState: null,
            modalPayload: null
        }
    },
    setup() {
      return { trashBinOutline }
    },
    mounted() {
        // eslint-disable-next-line
        const parent_this = this;
        this.loadData()
    },
    methods: {
        async Modal_onWillDismiss(){
            this.modalState = "none"
        },
        getDetailsAboutAction(id = 1){
            console.info(id)
            this.modalState = "detailsForAction"
            this.prepareInfoAboutAction(id)
        },
        prepareInfoAboutAction(id = 1){
            // eslint-disable-next-line
            const parent_this = this;
            
            this.$database_actions.get(id + "").then(function (doc) {
                parent_this.modalPayload = doc
                console.log("the doc is fetched", parent_this.modalPayload)
            }).catch(function (err) {
                console.log(err);
            });
        },
        loadData(){
            // eslint-disable-next-line
            const parent_this = this;

            parent_this.$database_actions.allDocs({
                include_docs: true,
                attachments: true,
                sort: ['date']
            }, function (err, response) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("Documents fetches succesfully.", response);
                    parent_this.accounted_list = response.rows
                    console.log(JSON.stringify(parent_this.accounted_list))
                }
            });
        },
        actionProvider(type = "") {

            switch (type) {
                case "addEl":
                    this.$router.push({
                        path: '/tabs/newBudgetEvent',
                        replace: false
                    });
                    break;

                default:
                    break;
            }
        },

    }
})
</script>
