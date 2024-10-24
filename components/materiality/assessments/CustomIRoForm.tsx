import { Label } from "@/components/ui/label";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateCustomIRo } from "@/lib/assessments/action";

export default function CustomIRoForm({assesmentId}:{assesmentId:string}) {
  return (

    <form
      action={CreateCustomIRo}
      className={`p-4`}
    >

      <div className="grid w-full items-center gap-1.5 mb-2">
        <Input type="hidden" name="assesmentId" value={assesmentId}/>
        <Label htmlFor="topic">Topic</Label>
        <Input
          type="text"
          name="topic"
          placeholder="Klimawandel"
          required
        />

        <Label htmlFor="sub_topic">Sub Topic</Label>
        <Input
          type="text"
          name="sub_topic"
          placeholder="Anpassung an den Klimawandel"
          required
        />

        <Label htmlFor="sub_sub_topic">Sub Sub Topic</Label>
        <Input
          type="text"
          name="sub_sub_topic"
          placeholder="Wuestenbildung"
          required
        />

        <div className="flex mt-5">
          <div className="flex-auto">
            <DialogClose asChild>
              <Button className="w-full" type="submit">
               Add Custom IRo
              </Button>
            </DialogClose>
          </div>
        </div>
      </div>
    </form>
  );
}
