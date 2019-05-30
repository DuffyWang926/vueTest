<template>
    <div class='amapPage'>
        
       
        <el-button @click="regionDataGet">
click
            </el-button>
            <div >
                {{markersCenterData}}
                
            </div>

    </div>
    

</template>

<script>
import VueAMap from 'vue-amap';
import InputSearch from '@/components/InputSearch';
import locationIcon from '@/assets/images/locationBlue.png';
let  amapManager = new VueAMap.AMapManager();
// import AMap from 'vue-amap';
import {objectCompare} from '@/utils/objectCompare.js'
 export default  {
        name: "SearchMap",
        components: { InputSearch },
        data(){
            const self = this;
            return {
                mapKey:'72cc083a39134dad4acf0d47f499a463',
                temp:{},
                updateFlag:false

            }
        },
        created() {
            //table

            this.$store.dispatch("conditionMonitoring/getRegionMapData")
        },
        updated:function(){
            console.log(this)
            // console.log(this.markersCenter)
            // console.log(objectCompare(this.markersCenter,this.temp),'compare')
            let flag = false
            if(this.markersCenter){
                flag = objectCompare(this.markersCenter,this.temp)

            }
            if(flag){

                return
            }else{
            this.temp = this.markersCenter;
                
            }

        },
        methods:{
          
            //获得城市坐标
            fetchUrl(Url){
                let that = this
                fetch(Url)
                .then(response => response.json())
                .then(function (response) {
                    console.log(response.districts)
                    // response.districts.map((v,i) =>{
                    //     if(v.name === this.regionName){
                    //         this.center = v.center
                    //     }
                    // })
                    that.responseData = response

                })
                .catch(function (error) {
                    console.log(error);
                })

            },
            //获得城市 url
            req_post(data){
                let keywords = data || '北京'
                const registerUrl=`https://restapi.amap.com/v3/config/district?key=${this.mapKey}&keywords=${keywords}`;
                this.fetchUrl(registerUrl);
                
            },
            // search input data
            regionDataGet(data){
                
                let ywqybh = 120000
                if(ywqybh){
                    this.$store.dispatch("conditionMonitoring/changeSearchMapQuery",{ywqybh})
                }
                     this.req_post("天津");
                this.regionName = data;


            },
            
        },
        computed:{
            regionData(){
                return this.$store.state.searchListAll.searchList.regionList;
            },
            markersCenterData(){
                let data = this.$store.state.conditionMonitoring.searchMap.regionMapData;
                let res = Array.isArray(data) && data.map((v,i) =>{
                    v.label={
                            content:v.labelName,
                            offset:[10,25]
                    }
                    

                    let dataRes ={
                        label: v.label,
                        position: v.position
                    }
                    return dataRes;

                })
                // console.log(objectCompare(res,this.temp),'compare')
            
                this.temp = res;
               
                return res;
            },
            
        },
        watch:{
            
            responseData(data){
                if(data){
                    this.center = data.districts ? data.districts[0].center.split(',') : "116.405285,39.904989"

                }

            },
            
        }
       
    }
   

</script>

<style lang="less" scoped>
.amapPage{
    position: relative;
    .father{
        .amap-demo{
            height:600px;
        }
    }
     .search{
         position:absolute;
         left:0;
         top:0;
         z-index:100;
         width:100%;
            
    }
}
    
</style>
