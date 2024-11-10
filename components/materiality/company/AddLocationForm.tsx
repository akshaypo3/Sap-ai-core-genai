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
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { addLocation } from '@/lib/company/action';

interface AddLocationFormProps {
    type: string[];  
    api: string;    
    isOpen: boolean; 
}

const libraries: ("places")[] = ['places'];

export default function AddLocationForm({ type, api, isOpen }: AddLocationFormProps) {
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

    return (
        <form action={addLocation} className="max-h-[500px] overflow-y-auto p-2">
            <div className="grid w-full items-center gap-1.5 mb-2">
                <Input type="hidden" name="companyid" value={company_id} />

                <Label htmlFor="name">Location Name</Label>
                <Input type="text" id="name" name="name" required />

                <Label htmlFor="description">Description</Label>
                <Input type="text" id="description" name="description" />

                <Label htmlFor="autocomplete">Search Location</Label>
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
                        onChange={(e) => setAddress(e.target.value)}
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

                <Input
                    className="bg-gray-200"
                    type="hidden"
                    id="street"
                    name="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                    readOnly
                />

                <Input
                    className="bg-gray-200"
                    type="hidden"
                    id="postalcode"
                    name="postalcode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    readOnly
                />

                <Input
                    className="bg-gray-200"
                    type="hidden"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    readOnly
                />

                <Input
                    className="bg-gray-200"
                    type="hidden"
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    readOnly
                />

                <Input
                    className="bg-gray-200"
                    type="hidden"
                    id="latitude"
                    name="latitude"
                    value={latitude ?? ''}
                    readOnly
                />

                <Input
                    className="bg-gray-200"
                    type="hidden"
                    id="longitude"
                    name="longitude"
                    value={longitude ?? ''}
                    readOnly
                />

                <div className="w-full">
                    <Label htmlFor="location_type">Location Type</Label>
                    <Select name="location_type" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            {locationTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full">
                    <Label htmlFor="employee_count">Employee Count</Label>
                    <Select name="employee_count" required>
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
                </div>

                <div className="flex mt-5">
                    <div className="flex-auto">
                        <DialogClose asChild>
                            <Button className="w-full" type="submit">
                                Add Location
                            </Button>
                        </DialogClose>
                    </div>
                </div>
            </div>
        </form>
    );
}