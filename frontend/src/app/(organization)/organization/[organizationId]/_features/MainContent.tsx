import { useVendor } from "@/provider/VendorProvider"

const MainContent = ()=>{
    const {vendor} = useVendor()
    console.log(vendor);
    
    return(
        <div></div>
    )
}
export default MainContent