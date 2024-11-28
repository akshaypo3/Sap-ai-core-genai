import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddQuestionColumnButton } from "./Buttons";

export default function AddQuestionColumns({
  columnData,
}: {
  columnData: any;
}) {
  const columns = columnData?.qu_columns || [];
  const questionName = columnData?.question_text;
  
  return (
    <div className="p-4 items-center bg-white dark:bg-neutral-950 rounded-md border">
      <h3 className="text-xl font-semibold mb-10">
        Table Editor for Questions
      </h3>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-t-md">
        <h3 className="text-lg">
          Q. Number of locations where offices of the entity are situated
          {/* {`Q. ${questionName}`} */}
        </h3>
        <AddQuestionColumnButton />
      </div>
      <div className="mb-8 p-3 items-center bg-white dark:bg-neutral-950 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns && columns.length > 0 ? (
                columns.map((col: string, index: number) => (
                  <TableHead key={index}>
                    <div className="flex items-center space-x-1">
                      <span>{col}</span>
                    </div>
                  </TableHead>
                ))
              ) : (
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>No Columns</span>
                  </div>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
