"use client"

import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTranslations } from 'next-intl';

interface SearchableCountrySelectProps {
    countries: string[];
}

export default function SearchableCountrySelect({ countries }: SearchableCountrySelectProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const t = useTranslations("materiality-com")
    return (
        <div className="w-full">
            <Label htmlFor="country">{t("company.Country")}</Label>
            <Select name="country">
                <SelectTrigger>
                    <SelectValue placeholder={t("company.Select a country")}/>
                </SelectTrigger>
                <SelectContent>
                    <Input
                        placeholder={t("company.Search countries")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-2"
                    />
                    {filteredCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                            {country}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}