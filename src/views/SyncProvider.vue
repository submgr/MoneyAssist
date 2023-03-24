<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>Синхронизация</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Синхронизация</ion-title>
            </ion-toolbar>
        </ion-header>

        <div style="margin-left: 5vw; margin-top: 20vh;">
            <ion-label>Войдите в учетную запись Google, чтобы сохранить свой прогресс в облаке.</ion-label>
        </div>
        <ion-button @click="authenticateWithGoogle" style="margin-right: 5%; margin-left: 5%; margin-top: 6%; --opacity: 0.7;" expand="block">
            <ion-icon class="send-button" slot="end" :icon="logoGoogle"></ion-icon>
            Войти с Google
        </ion-button>
    </ion-content>
</ion-page>
</template>

  
<script lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

import {
    defineComponent
} from 'vue';

import {
    GoogleAuth
} from '@codetrix-studio/capacitor-google-auth';

import globaldata from '../modules/global';

import PouchDB from "pouchdb"

import axios from 'axios'

export default defineComponent({
    // eslint-disable-next-line
    components: {
        IonPage,
    },

    setup() {
        return {}
    },
    mounted() {
        GoogleAuth.initialize({
            clientId: '33960040607-coalo6hl8cscmu8mngtb3rf6jgnibr5q.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
            grantOfflineAccess: true,
        });

    },
    methods: {
        async authenticateWithGoogle() {
            const userResponse = await GoogleAuth.signIn()
            const accessToken = userResponse.authentication.accessToken;
            const idToken = userResponse.authentication.idToken;
            // eslint-disable-next-line
            const parent_this = this;
            axios.get(globaldata.api.hostname + "service/auth_withGoogle", {
                params: {
                    accessToken: accessToken,
                    idToken: idToken
                }
            }).then((response) => {
                if (response.data.status == "okay") {
                    localStorage.setItem("usercode", response.data.userid)
                    parent_this.database_actions = new PouchDB('http://pouch.deqstudio.com/database_actions:' + response.data.userid)
                    this.$router.push({
                        path: '/tabs/home',
                        replace: true,
                        query: {
                            auth_token: response.data.auth_token,
                            auth_userid: response.data.userid
                        }
                    });
                    //this.message_modal_text = `Выполнен вход.`
                    //this.message_modal_isOpen = true;
                } else {
                    this.message_modal_text = `Произошла ошибка при входе с помощью учетной записи Google. Попробуйте еще раз или воспользуйтесь другим способом входа.\n\nСведения: ` + JSON.stringify(response)
                    this.message_modal_isOpen = true;
                }
            }).catch(function (error) {
                parent_this.message_modal_text = `Сервер временно недоступен.\n\nСведения: ` + error
                parent_this.message_modal_isOpen = true;
            });
            // add the code for the functionality your need
        }
    },
    data() {
        return {

        }
    },
})
</script>
