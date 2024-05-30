import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function Example() {
  return (
    <div className="mt-8 rounded-lg max-w-max mx-auto flex justify-center relative">
      <Image
        src="/assets/images/recap-1024x576.png"
        alt="App screenshot"
        width={1024}
        height={576}
        className="border rounded-lg shadow"
      />
    </div>
  );
}
