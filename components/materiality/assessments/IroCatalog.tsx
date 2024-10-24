"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AddCatalogIro } from "@/lib/assessments/action";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";

export default function IROCatalog({
  data,
  assesmentId,
}: {
  data: any;
  assesmentId: string;
}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedCodes, setExpandedCodes] = useState<string[]>([]);

  const groupedData = data.reduce((acc: any, item: any) => {
    acc[item.esrs_code] = acc[item.esrs_code] || [];
    acc[item.esrs_code].push(item);
    return acc;
  }, {});

  const toggleCodeSection = (esrsCode: string) => {
    setExpandedCodes((prevCodes) =>
      prevCodes.includes(esrsCode)
        ? prevCodes.filter((code) => code !== esrsCode)
        : [...prevCodes, esrsCode],
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id],
    );
  };

  const handleSave = async () => {
    const selectedData = data.filter((item: any) =>
      selectedItems.includes(item.id),
    );

    await Promise.all(
      selectedData.map((item: any) =>
        AddCatalogIro({
          code: item.esrs_code,
          topic: item.topic,
          sub_topic: item.sub_topic,
          sub_sub_topic: item.sub_sub_topic,
          esrs_id: item.esrs_id,
          assessment_id: assesmentId,
        }),
      ),
    );

    setSelectedItems([]);
  };

  return (
    <div className="grid w-full items-center gap-4 bg-white rounded-lg relative">
      {Object.keys(groupedData).map((esrsCode: string) => (
        <div
          key={esrsCode}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div
            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
            onClick={() => toggleCodeSection(esrsCode)}
          >
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold">{esrsCode}</h3>
              {expandedCodes.includes(esrsCode) ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </div>
            <div className="flex space-x-4">
              <Badge variant="outline" className="bg-yellow-50">
                Entries: {groupedData[esrsCode].length}
              </Badge>
            </div>
          </div>

          {expandedCodes.includes(esrsCode) && (
            <div className="p-4">
              {groupedData[esrsCode].map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => handleCheckboxChange(item.id)}
                    />
                    <div className="flex flex-col">
                      <h3 className="text-md text-gray-600">{item.topic}</h3>
                      {item.sub_topic && (
                        <p className="text-sm text-gray-500">
                          {item.sub_topic}
                        </p>
                      )}
                      {item.sub_sub_topic && (
                        <p className="text-xs text-gray-400">
                          {item.sub_sub_topic}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Badge variant="outline" className="bg-blue-50">
                      {item.esrs_id}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="bg-white sticky bottom-0">
        <DialogClose asChild>
          <Button
            className="w-full px-6 py-2 bg-green-600 text-white font-medium rounded-lg"
            onClick={handleSave}
            type="submit"
          >
            Save
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
