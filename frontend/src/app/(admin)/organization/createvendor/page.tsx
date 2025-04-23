'use client'
 
import { vendorInput, vendorScema } from '@/schemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

const CreateVendor = () => {
    const form = useForm<vendorInput>({
        resolver : zodResolver(vendorScema),
        values : {
            email : '',
            phone : '',
            description : '',
            location : '',
            mapLat : '',
            mapLng : '',
            imageUrl : '',
            name : ''
        }
    })

    return(
        <FormProvider {...form}>
            <form></form>
        </FormProvider>
    )
}
export default CreateVendor