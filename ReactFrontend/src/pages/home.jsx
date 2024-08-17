import ApplianceRepaire from "../Components/Home Components/applianceRepaire";
import ElectricitanCarpenterPlumber from "../Components/Home Components/carpenterPlumberElectritian";
// import MyFooter from "../Components/Utils/footer";
import HomeCleaning from "../Components/Home Components/homeCleaning";
import HomeServices from "../Components/Home Components/homeServices";
// import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { useState } from 'react'

function Home(){
    return(
        <div>
            <HomeCleaning />
            <HomeServices />
            <ApplianceRepaire />
            <ElectricitanCarpenterPlumber />

        </div>
    )
}

export default Home