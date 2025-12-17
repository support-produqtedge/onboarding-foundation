import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-8 max-w-[10.847rem]">
      <Image
        src={"/logo1.png"}
        fill
        className="w-full h-full"
        alt="Produqtedge logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
