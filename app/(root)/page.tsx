import Image from "next/image";
import {Button} from '@/components/ui/button'
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10 mt-20">
        <div className="wrapper grid grid-col-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Celebrate Life's Precious Moments With Us!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and create unforgettable events in Nigeria on GoEvents</p>
            <Button size={'lg'} asChild className="w-full sm:w-fit">
              <Link href={'#events'}>Explore Now</Link>
            </Button>
          </div>

          <Image src={'/assets/images/hero.png'} alt="hero"
          width={1000}
          height={1000}
          className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Let's Get <br/>The Party Started</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          Category
        </div>
      </section>
    </>
  );
}
