import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {


  return (
  <>
    <div className="flex flex-col gap-7 items-center lg:max-w-[35%] mx-auto mt-9 max-w-[90%]">
      <h1 className="text-5xl lg:text-6xl font-mono font-bold text-center">Easy <span className="text-[#5046e5]">shopping</span>, quick delivery </h1>
      <p className="text-center text-base text-[#605a57]">Variety, quality, and trust. Find what you need with just one click.</p>
      <Button className="bg-[#5046e5]"><Link href='/products'>See all products</Link></Button>
    </div>
  </>
  );
}
