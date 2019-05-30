<template>
    <div class='amapPage'>
        <div :style="{width:'100%',height:'100%'}" class="father">
            <el-amap vid='amap' :plugin='plugin' class='amap-demo' :center='centerData' :amap-manager="amapManager" :zoom='zoom'>
                        <!-- <el-amap-marker
                        
                        :position="center" 
                        :label="label"
                        icon="icon-zuobiaofill"
                        vid="marker">
                        </el-amap-marker> -->
                        <div v-if='markersCenterData'>
                            <el-amap-marker
                            v-for="(marker, index) in markersCenterData" :key="index"
                            :position="marker.position" 
                            :icon="marker.icon"
                            :label="marker.label"
                            :vid="index">
                            </el-amap-marker>

                        </div>
                        

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
            <div :mydata='undateMarkers' v-if="markersCenterData">
                <!-- <img :src="locationIcon" alt="" style="width:100px;height:50px"> -->
            </div>
        <!-- <div>
            <button @click="getYourIP">2356</button>
        </div> -->

    </div>
    

</template>

<script>
import VueAMap from 'vue-amap';
import InputSearch from '@/components/InputSearch';
import locationIcon from '@/assets/images/locationOrange.png';
import locationIconBlue from '@/assets/images/locationBlue.png';
import locationIconOrange from '@/assets/images/locationOrange.png';
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
                options: [
                     {
                    value: '0',
                    label: '全部'
                    },{
                    value: '1',
                    label: '路内'
                    }, {
                    value: '2',
                    label: '路外'
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
                markersCenterData:{},
                accountIp:'',
                accountLocation:''
                

            }
        },
        created() {
            //搜索框列表
            this.$store.dispatch("searchListAll/findSsqySelectList")
            this.$store.dispatch("searchListAll/findSysOrgSelectList")
            
            //table
            this.$store.dispatch("conditionMonitoring/getRegionMapData")
            //获得中心
            this.$store.dispatch("conditionMonitoring/getParkingGarageCoordinate") 
            this.getYourIP();
        },
        updated(){

        },
        methods:{
          
            //获得城市坐标
            fetchUrl(Url){
                let that = this
                fetch(Url)
                .then(response => response.json())
                .then(function (response) {
                    console.log(response.districts,'555')
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
            getMarkersCenterData(){
                this.markersCenterData = this.$store.state.conditionMonitoring.searchMap.regionMapData;
                 
               
            },
            //获得ip
            getYourIP() {
                let that = this;
                var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
                if (RTCPeerConnection)(function () {
                var rtc = new RTCPeerConnection({
                    iceServers: []
                });
                if (1 || window.mozRTCPeerConnection) {
                    rtc.createDataChannel('', {
                    reliable: false
                    });
                };
            
                rtc.onicecandidate = function (evt) {
                    if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
                };
                rtc.createOffer(function (offerDesc) {
                    grepSDP(offerDesc.sdp);
                    rtc.setLocalDescription(offerDesc);
                }, function (e) {
                    console.warn("offer failed", e);
                });
            
            
                var addrs = Object.create(null);
                addrs["0.0.0.0"] = false;
            
                function updateDisplay(newAddr) {
                    if (newAddr in addrs) return;
                    else addrs[newAddr] = true;
                    var displayAddrs = Object.keys(addrs).filter(function (k) {
                    return addrs[k];
                    });
                    for (var i = 0; i < displayAddrs.length; i++) {
                    if (displayAddrs[i].length > 16) {
                        displayAddrs.splice(i, 1);
                        i--;
                    }
                    }
                    
                    that.accountIp = displayAddrs[0];
                    
                    that.accountIp && that.getAccountLocation(that.accountIp)
                    // document.getElementById('app').textContent = displayAddrs[0];
                }
            
                function grepSDP(sdp) {
                    var hosts = [];
                    sdp.split('\r\n').forEach(function (line, index, arr) {
                    if (~line.indexOf("a=candidate")) {
                        var parts = line.split(' '),
                        addr = parts[4],
                        type = parts[7];
                        if (type === 'host') updateDisplay(addr);
                    } else if (~line.indexOf("c=")) {
                        var parts = line.split(' '),
                        addr = parts[2];
                        updateDisplay(addr);
                    }
                    });
                }
                })();
                else {
                 this.$message.error("请使用主流浏览器：chrome,firefox,opera,safari")
                }
                
            },
            //通过ip获得位置
            getAccountLocation(ip){
                let url = "https://restapi.amap.com/v3/ip?" + ip +"&key=" + this.mapKey;
                
                let that = this
                fetch(url)
                .then(response => response.json())
                .then(function (response) {
                    console.log(response.districts,'555')
                    // response.districts.map((v,i) =>{
                    //     if(v.name === this.regionName){
                    //         this.center = v.center
                    //     }
                    // })
                    that.accountLocation = response
                    let city = response && response.city ;
                    that.req_post(city);

                    

                })
                .catch(function (error) {
                    console.log(error);
                })


            }
        },
        computed:{
            regionData(){
                return this.$store.state.searchListAll.searchList.regionList;
            },
            companyData(){
                return this.$store.state.searchListAll.searchList.companyList;
            },
            undateMarkers(){
                this.getMarkersCenterData();
                return this.$store.state.searchListAll.searchList.undateMarkers;
            },
            centerData(){
                let data = this.$store.state.conditionMonitoring.searchMap.centerData || [121.472644,31.231706];
                return data
            }
            
        },
        watch:{
            parkValue(data){
                let cclx = +data;
                if(cclx == 2){
                    this.locationIcon =  this.markersCenterData && this.markersCenterData[0].icon
                }else{
                     this.locationIcon =  this.markersCenterData && this.markersCenterData[0].icon
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
    height:91%;
    .father{
        height:100%;
        .amap-demo{
            height:100%;
        }
    }
     .search{
         position:absolute;
         left:0;
         top:0;
         z-index:100;
         width:100%;
            
    }
    /deep/.amap-logo{
      display: none !important;
    }
    /deep/.amap-copyright{
      display: none !important;
    }
}
    
</style>
