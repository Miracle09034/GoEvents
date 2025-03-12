import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 sm:py-10 mt-8" style={{paddingTop: '5rem'}}>
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h2 className="h1-bold">About GoEvents</h2>
            <p className="p-regular-20 md:p-regular-24" style={{fontSize: '1rem'}}>
              GoEvents is your go-to platform for creating and booking unforgettable events in Nigeria. 
              Our mission is to make event planning seamless, enjoyable, and accessible to everyone.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#mission">
                Learn More
              </Link>
            </Button>
          </div>
          <Image
            src="/assets/images/about.jpg"
            alt="about"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h4 className="h2-bold">Our Mission</h4>
        <p className="p-regular-20" style={{fontSize: '1rem'}}>
          At GoEvents, we believe every moment is worth celebrating. Whether it's a wedding, birthday, 
          or corporate event, we provide the tools and resources to make your event unforgettable.
        </p>
      </section>

      {/* Vision Section */}
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 sm:py-10">
        <div className="wrapper">
          <h4 className="h2-bold">Our Vision</h4>
          <p className="p-regular-20" style={{fontSize: '1rem'}}>
            To become the leading event booking platform in Nigeria, empowering individuals and businesses 
            to create memorable experiences with ease.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h3 className="h2-bold">Our Values</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h5 className="h3-bold">Innovation</h5>
            <p className="p-regular-16" style={{fontSize: '1rem'}}>
              We constantly innovate to provide cutting-edge solutions for event booking.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h5 className="h3-bold">Customer Focus</h5>
            <p className="p-regular-16" style={{fontSize: '1rem'}}>
              Our customers are at the heart of everything we do. We strive to exceed their expectations.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h5 className="h3-bold">Integrity</h5>
            <p className="p-regular-16" style={{fontSize: '1rem'}}>
              We operate with honesty, transparency, and accountability in all our dealings.
            </p>
          </div>
        </div>
      </section>


     

      {/* Call-to-Action Section */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h3 className="h2-bold">Ready to Plan Your Next Event?</h3>
        <p className="p-regular-20" style={{fontSize: '1rem'}}>
          Join thousands of satisfied customers who have made their events unforgettable with GoEvents.
        </p>
        <Button size="lg" asChild className="button w-full sm:w-fit">
          <Link href="/events/create">
            Get Started
          </Link>
        </Button>
      </section>
    </>
  );
}
