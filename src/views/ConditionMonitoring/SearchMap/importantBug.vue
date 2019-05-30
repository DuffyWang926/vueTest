<template>
    <div class='amapPage'>
        <div :style="{width:'100%',height:'100%'}" class="father">
            <el-amap vid='amap' :plugin='plugin' class='amap-demo' :center='center' :amap-manager="amapManager" :zoom='zoom'>
                      
                       
                                
                        
                        <!-- <el-amap-marker
                        
                        :position="center" 
                        :label="label"
                        icon="icon-zuobiaofill"
                        vid="marker">
                        </el-amap-marker> -->
                        <el-amap-marker
                        v-for="(marker, index) in markersCenterData" :key="index"
                        :position="marker.position" 
                        :icon="locationIcon"
                        :label="marker.label"
                        :vid="index">
                        </el-amap-marker>

            </el-amap>

        </div>
        <el-row class="search">
            <el-col :span="4">
                <InputSearch :content='regionCon' :list='regionData' @inputDataSend='regionDataGet' ref='regionChild'></InputSearch>
            </el-col>
            <el-col :span="4">
                
                <InputSearch :content='companyCon' :list='companyData' @inputDataSend='companyDataGet' ref='companyChild'></InputSearch>
            </el-col>
            <el-col :span="4">
                <el-select v-model="parkValue" placeholder="请选择停车场类型">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
            </el-col>
            

        </el-row>
            <div :mydata='markersCenterData'>
                <img :src="locationIcon" alt="" style="width:100px;height:50px">
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
                regionCon:'请选择所属区域',
                companyCon:'请选择运营公司',
                options: [{
                    value: '1',
                    label: '路内'
                    }, {
                    value: '2',
                    label: '路外'
                    }, {
                    value: '0',
                    label: '全部'
                    }],
                parkValue: '',
                mapKey:'72cc083a39134dad4acf0d47f499a463',
                responseData:{},
                zoom: 12,
                markers: [
                    {
                    position: [116.405285,39.904989],
                    label:{
                            content:'123',
                            offset:[10,25]
                        },
                    icon:'@/assets/images/locationBlue.png'

                    },
                    {
                    position: [116.310316,39.956074],
                    label:{
                            content:'123',
                            offset:[10,25]
                        }
                    }
                ],
                center:[121.472644,31.231706],
                lng:0,
                lat:0,
                loaded:false,
                amapManager,
                plugin:[
                    {
                        enableHighAccuracy:true,
                        timeout:100,
                        maximumAge:0,
                        convert:true,
                        showButton:true,
                        buttonPosition:'RB',
                        showMarker:true,
                        showCircle:true,
                        panToLocation:true,
                        zoomToAccuracy:true,
                        extensions:'all',
                        pName:'Geolocation',
                        // events:{
                        //     init(o){
                        //         o.getCurrentPosition((status,result) =>{
                        //             console.log(result,'123')
                        //             if(result && result.position){
                        //                 self.lng = result.position.lng;
                        //                 self.lat = result.position.lat;
                        //                 self.center = [selt.lng,self.lat];
                        //                 self.loaded = true;
                        //                 self.$nextTick();
                        //             }
                        //         });
                        //     },
                            


                        // }
                    }
                ],
                regionName:'',
                locationIcon:"",
                temp:{}
                

            }
        },
        created() {
            //搜索框列表
            this.$store.dispatch("searchListAll/findSsqySelectList")
            this.$store.dispatch("searchListAll/findSysOrgSelectList")
            
            //table
            this.$store.dispatch("conditionMonitoring/getRegionMapData")
            this.req_post();
        },
        updated(){
            console.log(this)
            // console.log(this.markersCenter)
            // console.log(objectCompare(this.markersCenter,this.temp),'compare')
            
            // this.temp = this.markersCenter;

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
                let res 
                this.regionData.map((v,i) =>{
                    if(v.value == data){
                        res = v.key
                    }
                })
                let ywqybh = res
                if(ywqybh){
                    this.$store.dispatch("conditionMonitoring/changeSearchMapQuery",{ywqybh})
                }
                if(data !== this.regionName){
                     this.req_post(data);
                }
                this.regionName = data;


            },
            companyDataGet(data){
                let res 
                this.companyData.map((v,i) =>{
                    if(v.value == data){
                        res = v.key
                    }
                })
                let yygsid = res
                if(yygsid){
                    this.$store.dispatch("conditionMonitoring/changeSearchMapQuery",{yygsid})
                    
                }

            },
            
        },
        computed:{
            regionData(){
                return this.$store.state.searchListAll.searchList.regionList;
            },
            companyData(){
                return this.$store.state.searchListAll.searchList.companyList;
            },
            markersCenterData(){
                let data = this.$store.state.conditionMonitoring.searchMap.regionMapData;
                let res = Array.isArray(data) && data.map((v,i) =>{
                    v.label={
                            content:v.labelName,
                            offset:[10,25]
                    }
                    // v.icon =  new AMap.Icon({            
                    //     size: new AMap.Size(40, 50),  //图标大小
                    //     image: "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png",
                    //     imageOffset: new AMap.Pixel(0, -60)
                    // })  

                    let data ={
                        label: v.label,
                        position: v.position
                    }
                    return data;

                })
                console.log(objectCompare(res,this.temp),'compare')
            
                this.temp = res;
               
                return res;
            },
            
        },
        watch:{
            parkValue(data){
                let cclx = +data;
                if(cclx == 2){
                    this.locationIcon = locationIcon
                }

                 this.$store.dispatch("conditionMonitoring/changeSearchMapQuery",{cclx})

            },
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
