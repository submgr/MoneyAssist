<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>Аналитика</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Аналитика</ion-title>
            </ion-toolbar>
        </ion-header>

        <div id="chart">
            <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
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

import VueApexCharts from "vue3-apexcharts";

import {
    defineComponent
} from 'vue';

export default defineComponent({
    // eslint-disable-next-line
    components: {
        IonPage,
        apexchart: VueApexCharts
    },

    setup() {
        return {}
    },
    mounted() {
        const oneHourOffset = 24 * 60 * 60 * 1000
        const days = []
        // eslint-disable-next-line
        const parent_this = this;
        let allDocs = [];
        parent_this.$database_actions.allDocs({
            include_docs: true,
            attachments: true,
            sort: ['date']
        }, function (err, response) {
            if (err) {
                return console.log(err);
            } else {
                allDocs = response.rows
                console.log("allDocs", allDocs)

                for (let i = 0; i <= 30; i++) {
                    parent_this.income_counted[i] = 0
                    parent_this.expenses_counted[i] = 0
                    console.log("i_itr")
                    const newdate = new Date();
                    newdate.setDate(newdate.getDate() - i); // minus the date
                    const nd = new Date(newdate);
                    days.push(nd.getDate())
                    const today = new Date(nd);
                    const dd = String(today.getDate()).padStart(2, '0');
                    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                    const yyyy = today.getFullYear();

                    const today_final = mm + '/' + dd + '/' + yyyy + " " + today.getHours() + ":" + today.getMinutes();
                    const subr = today_final.substring(0, 10)
                    console.log(subr)
                    for (let j = 0; j < allDocs.length; j++) {
                        console.log("j_itr")
                        let thisdate = allDocs[j].doc.date
                        thisdate = thisdate.substring(0, 10)
                        if(thisdate == subr){
                            console.log("thisdate == subr", allDocs[j].doc.amount)
                            if(allDocs[j].doc.type == "income"){
                                parent_this.income_counted[i] += allDocs[j].doc.amount;
                            }else{
                                parent_this.expenses_counted[i] += allDocs[j].doc.amount;
                            }
                            
                        }
                    }

                }
                days.reverse()
                parent_this.chartOptions.xaxis.categories = days
                
                console.log(days)
                console.log(parent_this.income_counted)
                const dataArrayIncome = [];
                for(const o in parent_this.income_counted) {
                    dataArrayIncome.push(parent_this.income_counted[o]);
                }
                const dataArrayExpenses = [];
                for(const o in parent_this.expenses_counted) {
                    dataArrayExpenses.push(parent_this.expenses_counted[o]);
                }
                dataArrayIncome.reverse()
                dataArrayExpenses.reverse()
                parent_this.series[0].data = dataArrayIncome
                parent_this.series[1].data = dataArrayExpenses
            }
        });

    },
    data() {
        return {
            income_counted: {},
            expenses_counted: {},

            series: [{
                name: 'доходы',
                data: [1]
            }, {
                name: 'расходы',
                data: [1]
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'day',
                    categories: []
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
            },
        }
    },
})
</script>
