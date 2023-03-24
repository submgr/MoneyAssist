<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Новая операция</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Новая операция</ion-title>
          </ion-toolbar>
        </ion-header>

        <div style="margin-top: 4vh; width: 94vw; margin-left: 3vw; margin-right: 3vw;">
            <ion-segment value="default">
                <ion-segment-button value="default" @click="actionProvider('type_income')">
                  <ion-label>Доход</ion-label>
                </ion-segment-button>
                <ion-segment-button value="segment" @click="actionProvider('type_expense')">
                  <ion-label>Расход</ion-label>
                </ion-segment-button>
            </ion-segment>
    
            <ion-item fill="solid" mode="md" style="margin-top: 3vh;">
                <ion-label position="floating">Размер {{currentBudgetElementRoleFriendly}}</ion-label>
                <ion-input @ionChange="verifyAmount()" v-model="amount" :clear-input="true" :autofocus="true" :inputmode="'numeric'" :maxlength="8" placeholder="Сумма"></ion-input>
            </ion-item>
            <ion-item fill="solid" mode="md" style="margin-top: 3vh;">
                <ion-label position="floating">Комментарий для себя</ion-label>
                <ion-input :clear-input="true" :inputmode="'text'" :maxlength="32" placeholder="Комментарий"></ion-input>
            </ion-item>

            <div style="margin-top: 3vh; margin-left: -5vw;">
                <div v-if="currentBudgetElementRole == 'expense'">
                    <ion-list>
                        <ion-item>
                          <ion-select :model="category" @ionChange="categoryUpdate($event)" interface="action-sheet" placeholder="ㅤВыберите категорию">
                            <ion-select-option @ionChange="categoryUpdate($event)" mode="ios" v-for="item in list_expenses" :key="item.friendlyname" :value="item.friendlyname">ㅤ{{ item.friendlyname }}</ion-select-option>
                          </ion-select>
                        </ion-item>
                      </ion-list>
                </div>
                <div v-if="currentBudgetElementRole == 'income'">
                    <ion-list>
                        <ion-item>
                          <ion-select :model="category" @ionChange="categoryUpdate($event)" interface="action-sheet" placeholder="ㅤВыберите источник дохода">
                            <ion-select-option  mode="ios" v-for="item in list_incomes" :key="item.friendlyname" :value="item.friendlyname">ㅤ{{ item.friendlyname }}</ion-select-option>
                          </ion-select>
                        </ion-item>
                      </ion-list>
                </div>
            </div>
            <ion-button @click="addCompletionHandler" expand="block" fill="outline" style="margin-top: 8vh;" color="tertiary">Добавитьㅤ|ㅤ<span v-if="currentBudgetElementRole == 'income'">+ </span><span v-if="currentBudgetElementRole == 'expense'">- </span>  {{ amount }} рублей</ion-button>
        </div>
  
        <ExploreContainer name="Tab 2 page" />
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import { IonItem, IonLabel, IonList, IonInput, toastController } from '@ionic/vue';
  import { IonSegment, IonButton, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue';

  import { ellipseOutline } from 'ionicons/icons';

  import { defineComponent } from 'vue';

  export default defineComponent({
    // eslint-disable-next-line
    components: { IonLabel, IonSegment, IonSegmentButton, IonInput, IonItem, IonButton, IonPage, IonSelect, IonSelectOption, toastController },
    
    setup() {
      return { ellipseOutline }
    },
    data () {
      return {
        amount: 0,
        category: "Другое",
        list_expenses: [
            { code: "2", friendlyname: 'Транспорт' },
            { code: "2", friendlyname: 'Развлечения' },
            { code: "1", friendlyname: 'Бизнес' },
            { code: "2", friendlyname: 'Дом' },
            { code: "2", friendlyname: 'Книги и образование' },
            { code: "2", friendlyname: 'Косметика и гигиена' },
            { code: "2", friendlyname: 'Здоровье и медицина' },
            { code: "2", friendlyname: 'Одежда и аксессуары' },
            { code: "2", friendlyname: 'Продукты' },
            { code: "2", friendlyname: 'Кафе и рестораны' },
            { code: "2", friendlyname: 'Ремонт и Бытовые услуги' },
            { code: "2", friendlyname: 'Платежи (ЖКХ, Интернет...)' },
            { code: "other", friendlyname: 'Другое' },
        ],
        list_incomes: [
            { code: "2", friendlyname: 'Бизнес' },
            { code: "2", friendlyname: 'Услуги' },
            { code: "2", friendlyname: 'Работа по договору' },
            { code: "1", friendlyname: 'Пожертвования' },
            { code: "2", friendlyname: 'Пассивный доход' },
            { code: "2", friendlyname: 'Другое' },
        ],
        currentBudgetElementRole: "income",
        currentBudgetElementRoleFriendly: "дохода"
      }
    },
    methods: {
        categoryUpdate(item){
            this.category = item.detail.value
        },
        async showToast(message = "Unknown error just happened.", duration = 1000){
            const toast = await toastController.create({
            message: message,
            duration: duration,
            });

            await toast.present();
        },
        addCompletionHandler(){
            let areThereAnyErrors = false

            if(this.amount == 0){
                if(this.currentBudgetElementRole == "income"){
                    this.showToast("Доход слишком маленький, он не может быть равен нулю.", 4000)
                }else{
                    this.showToast("Расход слишком маленький, он не может быть равен нулю.", 4000)
                }
                areThereAnyErrors = true
            }

            if(this.category == "none"){
                this.showToast('Выберите категорию, если ничего не подходит, воспользуйтесь вариантом "Другое"', 6000)
                areThereAnyErrors = true
            }

            if(areThereAnyErrors == true){
                // alert("err")
                // nothing!..
            } else{
                const today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = today.getFullYear();

                const today_final = mm + '/' + dd + '/' + yyyy + " " + today.getHours() + ":" + today.getMinutes();
                //Inserting Document
                const doc = {
                    type: this.currentBudgetElementRole,
                    amount: this.amount,
                    category: this.category,
                    date: today_final
                }
                console.log("doc", doc)
                // eslint-disable-next-line
                this.$database_actions.post(doc, function(err, response) {
                    if (err) {
                        return console.log(err);
                    } else {
                        console.log("Document created Successfully",response);
                    }
                });

                this.$router.push( { path:'/tabs/home', replace: false } );
            }



        },
        verifyAmount(){
            this.amount =  Number(this.amount) + 0
        },
      actionProvider(type = ""){
        switch (type) {
          case "type_income":
            this.currentBudgetElementRole = "income"
            this.currentBudgetElementRoleFriendly = "дохода"
            break;
          case "type_expense":
            this.currentBudgetElementRole = "expense"
            this.currentBudgetElementRoleFriendly = "расхода"
            break;
        
          default:
            break;
        }
      },
    }
  })
  </script>
  