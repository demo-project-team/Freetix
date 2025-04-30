"use client";

import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const mapLat = 47.91596453089441;
  const mapLng = 106.9163596630096;

  const getData = async () => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${mapLat}&lon=${mapLng}&format=json`
    );
    console.log(response);
  };
  useEffect(() => {
    getData();
  }, []);
}
