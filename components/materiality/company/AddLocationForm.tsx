'use client';
 
import React, { useState, useRef, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Autocomplete, Data, useLoadScript } from '@react-google-maps/api';
import { addLocation } from '@/lib/company/action';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { locationFormSchema } from '@/schemas/locationFormSchema';

const wait = () => new Promise((resolve) => setTimeout(resolve, 20));
 
interface AddLocationFormProps {
    type: string[];  
    api: string;    
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
 
const libraries: ("places")[] = ['places'];
 
export default function AddLocationForm({ type, api, open,setOpen }: AddLocationFormProps) {
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
 
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
 
    const googleMapsApiKey = api;
    const locationTypes = type;
    const company_id = "cc3de9de-f00b-49b7-ad4e-1db31a49ef11";
    const [loading, setLoading] = useState(false);

    function closeDialoge(){
      wait().then(() => setOpen(false));
    }

    const form = useForm<z.infer<typeof locationFormSchema>>({
      resolver: zodResolver(locationFormSchema),
      defaultValues: {
        name: "",
        description:"",
        autocomplete:"",
        location_type:"",
        employee_count:""        
      },
    });
 
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey,
        libraries,
    });
 
    useEffect(() => {
        setTimeout(() => {
            document.body.style.pointerEvents = "";
        }, 0);
    }, []);
 
    const handlePlaceSelect = () => {
        const place = autocompleteRef.current?.getPlace();
        //console.log(place);
 
        if (place?.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setLatitude(lat);
            setLongitude(lng);
            setAddress(place.formatted_address || '');
 
            let streetName = '';
            let postal = '';
            let cityName = '';
            let countryName = '';
            let streetNumber = '';
 
            place.address_components?.forEach((component) => {
                const types = component.types;
                if (types.includes('route')) {
                    streetName = component.long_name;
                }
                if (types.includes('street_number')) {
                    streetNumber = component.long_name;
                }
                if (types.includes('postal_code')) {
                    postal = component.long_name;
                }
                if (types.includes('locality')) {
                    cityName = component.long_name;
                }
                if (types.includes('country')) {
                    countryName = component.long_name;
                }
            });
 
            const fullStreetAddress = streetNumber ? `${streetName} ${streetNumber}` : streetName;
            setStreet(fullStreetAddress);
            setPostalCode(postal);
            setCity(cityName);
            setCountry(countryName);
        }
    };
    
 
    if (loadError) {
        return <div>Error loading maps</div>;
    }
 
    if (!isLoaded) {
        return <div>Loading maps</div>;
    }
    const { handleSubmit, control, formState: { errors } } = form;
    
    async function onSubmit(data) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("location_type", data.location_type);
      formData.append("autocomplete", address);
      formData.append("employee_count", data.employee_count);
      formData.append("street", street);
      formData.append("postalcode", postalCode);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("companyid", company_id);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
  
        const response = await addLocation(formData);
        closeDialoge();
      } catch (error) {
        console.error("Error creating location:", error);
      } finally {
        setLoading(false); 
      }
    }

    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}className="max-h-[500px] overflow-y-auto p-2">
            <div className="grid w-full items-center gap-1.5 mb-2">
                <FormField control={control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Location name" {...field} />
                    </FormControl>
                    <FormMessage>{errors.name?.message}</FormMessage>
                  </FormItem>
                )} />

                <FormField control={control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage>{errors.description?.message}</FormMessage>
                  </FormItem>
                )} />

                  <FormField control={control} name="autocomplete" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search Location</FormLabel>
                    <FormControl>
                    <Autocomplete
                    onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                    onPlaceChanged={handlePlaceSelect}
                    fields={['formatted_address', 'geometry', 'address_components']}
                >
                    <Input
                        type="text"
                        id="autocomplete"
                        name="autocomplete"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);  // Manually update local state
                          field.onChange(e.target.value);  // Update react-hook-form value
                        }}
                        placeholder="Enter a location"
                        style={{
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            width: '100%',
                            fontSize: '14px',
                            cursor: 'pointer',
                            boxSizing: 'border-box',
                            position: 'relative',
                            zIndex: '9999',
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#4B9FFF';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#ccc';
                        }}
                    />
                </Autocomplete>
                </FormControl>
                    <FormMessage>{errors.autocomplete?.message}</FormMessage>
                  </FormItem>
                )} />
 

              <FormField control={control} name="location_type" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location Type</FormLabel>
                          <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select location type" />
                              </SelectTrigger>
                              <SelectContent>
                            {locationTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage>{errors.location_type?.message}</FormMessage>
                        </FormItem>
                      )} />

                  <FormField control={control} name="employee_count" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee Count</FormLabel>
                          <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a size" />
                              </SelectTrigger>
                              <SelectContent>
                            <SelectItem value="0-10">0-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-100">51-100</SelectItem>
                            <SelectItem value="100-500">100-500</SelectItem>
                            <SelectItem value="500-1000">500-1000</SelectItem>
                            <SelectItem value="1000-5000">1000-5000</SelectItem>
                            <SelectItem value="5000-10000">5000-10000</SelectItem>
                            <SelectItem value=">10000">more than 10000</SelectItem>
                        </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage>{errors.location_type?.message}</FormMessage>
                        </FormItem>
                      )} />

 
                <div className="flex mt-5">
                    <div className="flex-auto">
                    <Button className="w-full" type="submit">
                {loading ? "Adding..." : "Add Location"}
                </Button>
                    </div>
                </div>
            </div>
        </form>
        </Form>
    );
}