import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CldImage } from "next-cloudinary";

import Image from "next/image";
import { Button } from "./ui/button";

export function DialogImg({
  imgURL,
  className,
}: {
  imgURL: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div style={{ cursor: "pointer" }}>
          <Button variant={"outline"}>Click to view</Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto">
        <CldImage width={800} height={800} src={imgURL} alt="Uploaded image" />
      </DialogContent>
    </Dialog>
  );
}
