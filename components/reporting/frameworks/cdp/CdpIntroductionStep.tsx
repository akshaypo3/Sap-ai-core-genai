import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { getCompanyDetails } from "@/lib/company/data";
import { saveCompanyDetailsFromAssessment } from "@/lib/company/action";

export default async function CdpIntroductionStep(id: any) {
  const supabase = await createClient();
  const companyDetails = await getCompanyDetails();
  const assessmentId = id.id;

  const topCountries = ["United States", "China", "Japan", "Germany", "India"];
  const uniqueIdentifiers = [
    { label: "ISIN Code - Bond", name: "isin-bond" },
    { label: "ISIN Code - Equity", name: "isin-equity" },
    { label: "CUSIP Number", name: "cusip-number" },
    { label: "Ticker Symbol", name: "ticker-symbol" },
    { label: "SEDOL Code", name: "sedol-code" },
    { label: "LEI Number", name: "lei-number" },
    { label: "D-U-N-S Number", name: "duns-number" },
    { label: "Other Unique Identifier", name: "other-identifier" },
  ];

  const reportingFields = [
    {
      label: "End date of reporting year",
      name: "end-date",
      type: "date",
      placeholder: "DDMMYYYY",
    },
    {
      label:
        "Alignment of this reporting period with your financial reporting period",
      name: "alignment",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      label: "Providing emissions data for past reporting years",
      name: "past-emissions-data",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      label: "Number of past reporting years for Scope 1 emissions data",
      name: "scope1-years",
      type: "select",
      options: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "Not providing past emissions data for Scope 1",
      ],
    },
    {
      label: "Number of past reporting years for Scope 2 emissions data",
      name: "scope2-years",
      type: "select",
      options: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "Not providing past emissions data for Scope 2",
      ],
    },
    {
      label: "Number of past reporting years for Scope 3 emissions data",
      name: "scope3-years",
      type: "select",
      options: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "Not providing past emissions data for Scope 3",
      ],
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-xl font-bold mb-3">Module Overview</h4>
        <p className="text-sm">
          This module requests information about an organization's disclosure to
          CDP, assisting data users in interpreting responses within the context
          of business operations, timeframe, and reporting boundaries.
          Information provided should be consistent, complete, and accurate, as
          it influences response options in later modules.All questions in this
          module must be answered, and responses should be saved before
          proceeding to the rest of the questionnaire.{" "}
        </p>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.1</h4>
        <div className="w-full">
          <Label>In which language are you submitting your response?</Label>
          <Select name="language">
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Latin">Latin</SelectItem>
              <SelectItem value="American">American</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="Brazilian">Brazilian</SelectItem>
              <SelectItem value="Portuguese">Portuguese</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.2</h4>
        <div className="w-full mb-3">
          <Label>
            Select the currency used for all financial information disclosed
            throughout your response
          </Label>
          <Select name="currency">
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">US Dollar</SelectItem>
              <SelectItem value="EUR">Euro</SelectItem>
              <SelectItem value="JPY">Japanese Yen</SelectItem>
              <SelectItem value="GBP">British Pound</SelectItem>
              <SelectItem value="CHF">Swiss Franc</SelectItem>
              <SelectItem value="CAD">Canadian Dollar</SelectItem>
              <SelectItem value="AUD">Australian Dollar</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Label htmlFor="other_Currency">
          If Other! Please write down below
        </Label>
        <Input
          type="text"
          name="other_Currency"
          placeholder="Type currency here"
        />
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.3</h4>
        <div className="w-full mb-3">
          <Label>
            Provide an overview and introduction to your organization
          </Label>
          <Select name="overview">
            <SelectTrigger>
              <SelectValue placeholder="Select Organization Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Publicly traded organization">
                Publicly traded organization
              </SelectItem>
              <SelectItem value="Privately owned organization">
                Privately owned organization
              </SelectItem>
              <SelectItem value="State owned organization">
                State owned organization
              </SelectItem>
              <SelectItem value="Partially privately owned">
                Partially privately owned
              </SelectItem>
              <SelectItem value="partially state owned organization">
                partially state owned organization
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" placeholder="Oraganization Description" />
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.4</h4>
        <Label>State the end date of the year for which you are reporting data. For emissions data, indicate whether you will be providing emissions data for past reporting years</Label>
        <div className="w-full mb-3 mt-3">
          {reportingFields.map((field) => (
            <div className="mb-3" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "date" ? (
                <Input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                />
              ) : (
                <Select name={field.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
        <h4 className="text-base font-bold mb-3">1.4.1</h4>
        <Label htmlFor="revenue">
          What is your organizations annual revenue for the reporting period?
        </Label>
        <Input type="text" name="revenue" placeholder="Revenue" />
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.5</h4>
        <div className="w-full mb-3">
          <Label htmlFor="">Provide details on your reporting boundary</Label>
          <Select name="reporting_boundary">
            <SelectTrigger>
              <SelectValue placeholder="Select Reporting Boundary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Not applicable">
                Not applicable – we do not publicly disclose financial
                statements
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Label htmlFor="financial_statement">
          How does your reporting boundary differ to that used in your financial
          statement?
        </Label>
        <Input
          type="text"
          name="financial_statement"
          placeholder="Financial Statement"
        />
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.6</h4>
        <Label htmlFor="identifier">
          Does your organization have an ISIN code or another unique identifier
          (e.g., Ticker, CUSIP, etc.)?
        </Label>
        <div className="w-full mt-3">
          {uniqueIdentifiers.map((identifier) => (
            <div className="mb-3" key={identifier.name}>
              <Label htmlFor={identifier.name}>{identifier.label}</Label>
              <div className="flex items-center">
                <Select name={identifier.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Yes or No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.7</h4>
        <Label htmlFor="operate">
          Select the countries/areas in which you operate
        </Label>
        <div className="flex flex-col space-y-2 mt-1 mb-3">
          {topCountries.map((country) => (
            <div key={country} className="flex items-center space-x-2">
              <Checkbox id={country.toLowerCase().replace(" ", "-")} />
              <Label
                htmlFor={country.toLowerCase().replace(" ", "-")}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {country}
              </Label>
            </div>
          ))}
        </div>
        <Label htmlFor="country">If Other! Please write down below</Label>
        <Input type="text" name="country" placeholder="Type country here" />
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.8</h4>
        <div className="w-full mb-3">
          <Label htmlFor="geolocation">
            Are you able to provide geolocation data for your facilities?
          </Label>
          <Select name="geolocation">
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Yes, for all facilities</SelectItem>
              <SelectItem value="some">Yes, for some facilities</SelectItem>
              <SelectItem value="intent">
                No, not currently but we intend to provide it within the next
                two years
              </SelectItem>
              <SelectItem value="no-plans">
                No, we do not have this data and have no plans to collect it
              </SelectItem>
              <SelectItem value="confidential">
                No, this is confidential data
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Label htmlFor="comments">Comments</Label>
        <Input
          type="text"
          name="comments"
          placeholder="Comments"
        />
        <h4 className="text-base font-bold mb-3 mt-3">1.8.1</h4>
        <Label htmlFor="identifier">Identifier</Label>
        <Input
          className="mb-3"
          type="text"
          name="identifier"
          placeholder="Write answer"
        />
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          className="mb-3"
          type="number"
          name="latitude"
          placeholder="1234.999999"
          step="0.000001"
        />
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          className="mb-3"
          type="number"
          name="longitude"
          placeholder="1234.99999"
          step="0.00001"
        />
        <Label htmlFor="comment">Comment</Label>
        <Input type="text" name="comment" placeholder="Write Comment" />
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.9</h4>
        <Label htmlFor="project">
          Provide details on the mining projects covered by this disclosure, by
          specifying your project(s) type, location and mining method(s) used
        </Label>
        <div className="mt-3">
          <Label htmlFor="project-id">Project ID</Label>
          <Input
            className="mb-3"
            type="text"
            name="project-id"
            placeholder="Enter Project ID"
          />
          <Label htmlFor="name">Name</Label>
          <Input
            className="mb-3"
            type="text"
            name="name"
            placeholder="Write answer here"
          />
          <Label htmlFor="share">Share</Label>
          <Input
            className="mb-3"
            type="text"
            name="share"
            id="share"
            placeholder="Enter share"
          />
          <div className="w-full mb-3">
            <Label htmlFor="country-area">Country/Area</Label>
            <Select name="country-area">
              <SelectTrigger>
                <SelectValue placeholder="Select Country/Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            className="mb-3"
            type="number"
            name="latitude"
            placeholder="Enter Latitude"
            step="0.000001"
          />
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            className="mb-3"
            type="number"
            name="longitude"
            placeholder="Enter Longitude"
            step="0.000001"
          />
          <div className="w-full mb-3">
            <Label htmlFor="project-stage">Project Stage</Label>
            <Select name="project-stage">
              <SelectTrigger>
                <SelectValue placeholder="Select Project Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exploration">Exploration</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="closure">
                  Closure and/or Legacy Site
                </SelectItem>
                <SelectItem value="other">Other, please specify</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-3">
            <Label htmlFor="mining-method">Mining Method</Label>
            <Select name="mining-method">
              <SelectTrigger>
                <SelectValue placeholder="Select Mining Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open-cut">Open-cut</SelectItem>
                <SelectItem value="underground">Underground</SelectItem>
                <SelectItem value="open-cut-underground">
                  Open-cut and Underground
                </SelectItem>
                <SelectItem value="other">Other, please specify</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full mb-3">
            <Label htmlFor="raw-materials">Raw Material(s)</Label>
            <Select name="raw-materials">
              <SelectTrigger>
                <SelectValue placeholder="Select Raw Materials" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bauxite">Bauxite</SelectItem>
                <SelectItem value="copper">Copper</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum Group Metals</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="iron-ore">Iron Ore</SelectItem>
                <SelectItem value="nickel">Nickel</SelectItem>
                <SelectItem value="zinc">Zinc</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="diamonds">Diamonds</SelectItem>
                <SelectItem value="manganese">Manganese</SelectItem>
                <SelectItem value="thermal-coal">Thermal Coal</SelectItem>
                <SelectItem value="metallurgical-coal">
                  Metallurgical Coal
                </SelectItem>
                <SelectItem value="cobalt">Cobalt</SelectItem>
                <SelectItem value="lithium">Lithium</SelectItem>
                <SelectItem value="other-non-ferrous">
                  Other Non-Ferrous Metal, please specify
                </SelectItem>
                <SelectItem value="other-minerals">
                  Other Minerals, please specify
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Label htmlFor="year-extraction-started">
            Year Extraction Started/Is Planned to Start
          </Label>
          <Input
            className="mb-3"
            type="text"
            name="year-extraction-started"
            placeholder="Enter the year"
          />
          <Label htmlFor="year-closure">Year of Closure</Label>
          <Input
            className="mb-3"
            type="text"
            name="year-closure"
            placeholder="Enter the Year"
          />
          <Label htmlFor="project-description">Description of Project</Label>
          <Textarea
            name="project-description"
            placeholder="Write Description"
          />
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-950 rounded-md border p-3 mb-5">
        <h4 className="text-base font-bold mb-3">1.10</h4>
        <Label htmlFor="commodities">
          Provide details on the commodities that you produce and/or source.
        </Label>
        <div className="mt-3">
          <div className="w-full mb-3">
            <Label htmlFor="commodity">Commodity</Label>
            <Select name="commodity">
              <SelectTrigger>
                <SelectValue placeholder="Select Commodity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timber-products">Timber Products</SelectItem>
                <SelectItem value="palm-oil">Palm Oil</SelectItem>
                <SelectItem value="cattle-products">Cattle Products</SelectItem>
                <SelectItem value="soy">Soy</SelectItem>
                <SelectItem value="rubber">Rubber</SelectItem>
                <SelectItem value="cocoa">Cocoa</SelectItem>
                <SelectItem value="coffee">Coffee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="produced-sourced">Produced and/or Sourced</Label>
            <Select name="produced-sourced">
              <SelectTrigger>
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="produced">Produced</SelectItem>
                <SelectItem value="sourced">Sourced</SelectItem>
                <SelectItem value="produced-sourced">
                  Produced and Sourced
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="commodity-value-chain-stage">
              Commodity Value Chain Stage
            </Label>
            <Select name="commodity-value-chain-stage">
              <SelectTrigger>
                <SelectValue placeholder="Select Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="trading">Trading</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retailing">Retailing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="soy-embedding">
              Indicate if you have direct soy and/or embedded soy
            </Label>
            <Select name="soy-embedding">
              <SelectTrigger>
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="embedded-soy-only">
                  Embedded Soy Only
                </SelectItem>
                <SelectItem value="mixture-embedded-direct">
                  Mixture of Embedded Soy and Direct Soy
                </SelectItem>
                <SelectItem value="direct-soy-only">Direct Soy Only</SelectItem>
                <SelectItem value="unknown">
                  We do not know if we source embedded soy
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="total-commodity-volume">
              Indicate if you are providing the total commodity volume
            </Label>
            <Select name="total-commodity-volume">
              <SelectTrigger>
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes-total-volume">
                  Yes, we are providing the total volume
                </SelectItem>
                <SelectItem value="no-confidential">
                  No, the total volume is confidential
                </SelectItem>
                <SelectItem value="no-unknown">
                  No, the total volume is unknown
                </SelectItem>
                <SelectItem value="no-other-reason">
                  No, other reason, please specify
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Label htmlFor="total-commodity-volume-value">
            Total Commodity Volume (metric tons)
          </Label>
          <Input
            className="mb-3"
            type="number"
            name="total-commodity-volume-value"
            placeholder="Enter value"
          />

          <Label htmlFor="embedded-soy-volume">
            Of the Total Commodity Volume, State How Much is Embedded Soy
            (metric tons)
          </Label>
          <Input
            className="mb-3"
            type="number"
            name="embedded-soy-volume"
            placeholder="Enter value"
          />

          <Label htmlFor="direct-soy-volume">
            Of the Total Commodity Volume, State How Much is Direct Soy (metric
            tons)
          </Label>
          <Input
            className="mb-3"
            type="number"
            name="direct-soy-volume"
            placeholder="Enter value"
          />

          <div className="w-full mb-3">
            <Label htmlFor="converted-volume">
              Did you convert the total commodity volume from another unit to
              metric tons?
            </Label>
            <Select name="converted-volume">
              <SelectTrigger>
                <SelectValue placeholder="Select Yes or No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="original-unit">Original Unit</Label>
            <Select name="original-unit">
              <SelectTrigger>
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cubic-meters">Cubic Meters</SelectItem>
                <SelectItem value="gallons">Gallons</SelectItem>
                <SelectItem value="heads-of-livestock">
                  Heads of Livestock
                </SelectItem>
                <SelectItem value="kilograms">Kilogram</SelectItem>
                <SelectItem value="liters">Liters</SelectItem>
                <SelectItem value="pounds">Pounds</SelectItem>
                <SelectItem value="square-meters">Square Meters</SelectItem>
                <SelectItem value="square-feet">Square Feet</SelectItem>
                <SelectItem value="short-ton">Short Ton</SelectItem>
                <SelectItem value="long-ton">Long Ton</SelectItem>
                <SelectItem value="other">Other, please specify</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Label htmlFor="conversion-details">
            Provide Details of the Methods, Conversion Factors Used
          </Label>
          <Input
            className="mb-3"
            type="text"
            name="conversion-details"
            placeholder="Write Answer"
          />

          <div className="w-full mb-3">
            <Label htmlFor="form-of-commodity">Form of Commodity</Label>
            <Select name="form-of-commodity">
              <SelectTrigger>
                <SelectValue placeholder="Select Form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boards">Boards</SelectItem>
                <SelectItem value="plywood">Plywood</SelectItem>
                <SelectItem value="engineered-wood">Engineered Wood</SelectItem>
                <SelectItem value="cellulose-fiber">
                  Cellulose-based Textile Fiber
                </SelectItem>
                <SelectItem value="gnfr">
                  Goods Not for Resale (GNFR)
                </SelectItem>
                <SelectItem value="hardwood-logs">Hardwood Logs</SelectItem>
                <SelectItem value="paper">Paper</SelectItem>
                <SelectItem value="primary-packaging">
                  Primary Packaging
                </SelectItem>
                <SelectItem value="pulp">Pulp</SelectItem>
                <SelectItem value="sawn-timber">Sawn Timber</SelectItem>
                <SelectItem value="veneer">Veneer</SelectItem>
                <SelectItem value="chips">Chips</SelectItem>
                <SelectItem value="secondary-packaging">
                  Secondary Packaging
                </SelectItem>
                <SelectItem value="softwood-logs">Softwood Logs</SelectItem>
                <SelectItem value="tertiary-packaging">
                  Tertiary Packaging
                </SelectItem>
                <SelectItem value="unprocessed-wood-fiber">
                  Unprocessed Wood Fiber
                </SelectItem>
                <SelectItem value="bioenergy">Wood-based Bioenergy</SelectItem>
                <SelectItem value="cpko">
                  Crude Palm Kernel Oil (CPKO)
                </SelectItem>
                <SelectItem value="cpo">Crude Palm Oil (CPO)</SelectItem>
                <SelectItem value="ffb">Fresh Fruit Bunches (FFB)</SelectItem>
                <SelectItem value="palm-biodiesel">Palm Biodiesel</SelectItem>
                <SelectItem value="palm-kernel-meal">
                  Palm Kernel Meal (PKM)
                </SelectItem>
                <SelectItem value="palm-kernel-oil-derivatives">
                  Palm Kernel Oil Derivatives
                </SelectItem>
                <SelectItem value="palm-oil-derivatives">
                  Palm Oil Derivatives
                </SelectItem>
                <SelectItem value="refined-palm-oil">
                  Refined Palm Oil
                </SelectItem>
                <SelectItem value="beef">Beef</SelectItem>
                <SelectItem value="by-products">
                  By-products (e.g. Glycerin, Gelatin)
                </SelectItem>
                <SelectItem value="cattle">Cattle</SelectItem>
                <SelectItem value="hides-leather">Hides/Leather</SelectItem>
                <SelectItem value="tallow">Tallow</SelectItem>
                <SelectItem value="tallow-biodiesel">
                  Tallow Biodiesel
                </SelectItem>
                <SelectItem value="embedded-soy">
                  Embedded Soy [Soy Row Only]
                </SelectItem>
                <SelectItem value="soybean-meal">Soybean Meal</SelectItem>
                <SelectItem value="soybean-oil">Soybean Oil</SelectItem>
                <SelectItem value="soy-biodiesel">Soy Biodiesel</SelectItem>
                <SelectItem value="soy-derivatives">Soy Derivatives</SelectItem>
                <SelectItem value="whole-soybeans">Whole Soybeans</SelectItem>
                <SelectItem value="other">Other, please specify</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="procurement-spend">% of Procurement Spend</Label>
            <Select name="procurement-spend">
              <SelectTrigger>
                <SelectValue placeholder="Select Percentage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-1">Less than 1%</SelectItem>
                <SelectItem value="1-5">1-5%</SelectItem>
                <SelectItem value="6-10">6-10%</SelectItem>
                <SelectItem value="11-20">11-20%</SelectItem>
                <SelectItem value="21-30">21-30%</SelectItem>
                <SelectItem value="31-40">31-40%</SelectItem>
                <SelectItem value="41-50">41-50%</SelectItem>
                <SelectItem value="51-60">51-60%</SelectItem>
                <SelectItem value="61-70">61-70%</SelectItem>
                <SelectItem value="71-80">71-80%</SelectItem>
                <SelectItem value="81-90">81-90%</SelectItem>
                <SelectItem value="91-99">91-99%</SelectItem>
                <SelectItem value="100">100%</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
                <SelectItem value="not-applicable">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="revenue-dependence">
              % of Revenue Dependent on Commodity
            </Label>
            <Select name="revenue-dependence">
              <SelectTrigger>
                <SelectValue placeholder="Select Percentage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-1">Less than 1%</SelectItem>
                <SelectItem value="1-5">1-5%</SelectItem>
                <SelectItem value="6-10">6-10%</SelectItem>
                <SelectItem value="11-20">11-20%</SelectItem>
                <SelectItem value="21-30">21-30%</SelectItem>
                <SelectItem value="31-40">31-40%</SelectItem>
                <SelectItem value="41-50">41-50%</SelectItem>
                <SelectItem value="51-60">51-60%</SelectItem>
                <SelectItem value="61-70">61-70%</SelectItem>
                <SelectItem value="71-80">71-80%</SelectItem>
                <SelectItem value="81-90">81-90%</SelectItem>
                <SelectItem value="91-99">91-99%</SelectItem>
                <SelectItem value="100">100%</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="disclosing-commodity">
              In the questionnaire setup, did you indicate that you are
              disclosing on this commodity?
            </Label>
            <Select name="disclosing-commodity">
              <SelectTrigger>
                <SelectValue placeholder="Select Yes or No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes, disclosing</SelectItem>
                <SelectItem value="no">No, not disclosing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full mb-3">
            <Label htmlFor="commodity-significance">
              Is this commodity considered significant to your business in terms
              of revenue?
            </Label>
            <Select name="commodity-significance">
              <SelectTrigger>
                <SelectValue placeholder="Select Yes or No" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Label htmlFor="acquisition-date">
            Completion Date of Acquisition or Merger (MMDDYYYY)
          </Label>
          <Input
            className="mb-3"
            type="text"
            name="acquisition-date"
            placeholder="Enter Date"
          />

          <Label htmlFor="explanation">Please Explain</Label>
          <Input
            className="mb-3"
            type="text"
            name="explanation"
            placeholder="Write Explanation"
          />
        </div>
        <div className="flex">
          <Button className="mt-5 justify-end">
            Update Details
          </Button>
        </div>
      </div>
    </>
  );
}
