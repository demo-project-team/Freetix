"use client";
import { useOrganization } from "@/provider/OrganizationPrider";
import TableCont from "./_components/TableCont";
import { useState } from "react";
import { postCategory } from "@/utils/request/categoryRequest";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addCity, addDistrict } from "@/utils/request/addresReq";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getCity } from "@/utils/request/vendor";

export default function Home() {
  const { organization } = useOrganization();
  const [category, setCategory] = useState("");
  const [city, setCity] = useState('')
  const [cityId, setCityId] = useState('')
  const [district, setDistrict] = useState('')
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCategory(value);
  };
  const {data :cities= []} = useQuery({
    queryKey : ['selectCity'],
    queryFn : getCity
  })
  const handlePostClick = async () => {
    if (category) {
      await postCategory({ name: category });
    } else {
      alert("Please enter a category.");
    }
  };
  if (!organization) return;
  return (
    <div className="flex gap-8 flex-wrap">
      {organization.map((org, i) => (
        <TableCont key={i} org={org} />
      ))}
      <div className="mb-4">
        <input
          type="text"
          value={category}
          onChange={handleInputChange}
          placeholder="Enter category"
          className="w-full px-4 py-2 border text-black rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 text-white"
        />
        <button
          onClick={handlePostClick}
          className="mt-2 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gr focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Post
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <Input onChange={(e)=>setCity(e.target.value)} placeholder="enter new city address"/>
        <Button onClick={()=>addCity(city)}>add city</Button>
      </div>
      <div className="flex flex-col gap-4">
        <Input onChange={(e)=>setDistrict(e.target.value)} placeholder="enter new district address"/>
        <Select value={cityId} onValueChange={setCityId}>
          <SelectTrigger>
            <SelectValue placeholder="enter city"/>
          </SelectTrigger>
          <SelectContent>
            {cities.map((city)=>(
              <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={()=>addDistrict(district, cityId)}>add district</Button>
      </div>
    </div>
  );
}
