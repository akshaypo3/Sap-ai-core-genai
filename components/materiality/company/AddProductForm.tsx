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
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addProductService } from '@/lib/company/action';
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
import { productServiceFormSchema } from '@/schemas/productServiceFormSchema';
const wait = () => new Promise((resolve) => setTimeout(resolve, 20));

interface AddProductFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddProductForm({open,setOpen }: AddProductFormProps) {
    const company_id = 'cc3de9de-f00b-49b7-ad4e-1db31a49ef11'//added static company id
    const [loading, setLoading] = useState(false);


    function closeDialoge(){
        wait().then(() => setOpen(false));
      }
  
      const form = useForm<z.infer<typeof productServiceFormSchema>>({
        resolver: zodResolver(productServiceFormSchema),
        defaultValues: {
            type: "",
            name:"",
            description:"",
            turnover_percentage:"",  
        },
      });
      const { handleSubmit, control, formState: { errors } } = form;

    //   async function onSubmit(data) {
    //     const response = await addProductService(data);
    //   }
      async function onSubmit(data) {
        try {
          setLoading(true); // Set loading state to true when submitting
          const formData = new FormData();
          formData.append("type", data.type);
          formData.append("name", data.name);
          formData.append("description", data.description);
          formData.append("turnover_percentage", data.turnover_percentage);
          formData.append("companyid", company_id);
          
    
          const response = await addProductService(formData);
          closeDialoge();
        } catch (error) {
          console.error("Error creating task:", error);
        } finally {
          setLoading(false); 
        }
      }
    return (

        <Form {...form}>
       <form onSubmit={handleSubmit(onSubmit)}className="max-h-[500px] overflow-y-auto p-2">
            <div className="grid w-full items-center gap-1.5 mb-2">

                <FormField control={control} name="type" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product or Service</FormLabel>
                          <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                              </SelectTrigger>
                                <SelectContent>
                            <SelectItem value="Product">Product</SelectItem>
                            <SelectItem value="Service">Service</SelectItem>
                        </SelectContent>            
                            </Select>
                          </FormControl>
                          <FormMessage>{errors.type?.message}</FormMessage>
                        </FormItem>
                      )} />
                
                <FormField control={control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product/Service name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product/Service name" {...field} />
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

                <FormField control={control} name="turnover_percentage" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Percentage of turnover (%)</FormLabel>
                            <FormControl>
                            <Input
                                type="number"
                                placeholder="Enter turnover percentage"
                                {...field}
                                value={field.value || ""}  // Ensure that an empty string is displayed when there is no value
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} // Manually convert input value to a number
                                min={0}
                                max={100}
                                step="0.01"
                            />
                            </FormControl>
                            <FormMessage>{errors.turnover_percentage?.message}</FormMessage>
                        </FormItem>
                        )} />

                <div className="flex mt-5">
                    <div className="flex-auto">
                            <Button className="w-full" type="submit">
                {loading ? "Adding..." : "Add Product/Service"}
                </Button>
                    </div>
                </div>
            </div>
        </form>
        </Form>
    )
}