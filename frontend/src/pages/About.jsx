import React, { useEffect } from 'react';
import { Heart, Shield, Clock, Users, Award, PawPrint } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
// AOS-like animation utility
const useAOSEffect = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.aos-animate');
    elements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'all 0.8s ease-out';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

const AboutPage = () => {
  const navigate=useNavigate()
  useAOSEffect();

  const galleryImages = [
    { id: 1, src: 'https://media.istockphoto.com/id/1308850683/photo/girl-playing-with-her-pet-dog.jpg?s=612x612&w=0&k=20&c=PixIiGt55Qe-g0NnSWOE_0Wzfkn3TNPhF5E3ikHisQY=', alt: 'Happy dog playing', category: 'Dogs' },
    { id: 2, src: 'https://media.istockphoto.com/id/1359570561/photo/cat-dries-after-bathing.jpg?s=612x612&w=0&k=20&c=_-J5OMWIG3QD2b8mZOl48Uun3ROLnb2KUHOvDfv7c1k=', alt: 'Cat grooming', category: 'Cats' },
    { id: 3, src: 'https://media.istockphoto.com/id/2206336516/photo/beautiful-young-woman-sitting-on-sand-petting-her-dog-near-the-river-enjoying-their-connection.jpg?s=612x612&w=0&k=20&c=9XC_yJNKRxnkYz_e7A0grT-5O8nJq73NFsypxOgOOPk=', alt: 'Pet daycare', category: 'Daycare' },
    { id: 4, src: 'https://media.istockphoto.com/id/1353103116/photo/veterinarian-examining-cute-pug-dog-and-cat-in-clinic-closeup-vaccination-day.jpg?s=612x612&w=0&k=20&c=rVYhuc25uTbejkXgkfgfOwGLpTmNJ_zGafejYKgqer0=', alt: 'Veterinary care', category: 'Health' },
    { id: 5, src: 'https://media.istockphoto.com/id/1315408680/photo/three-female-trainers-giving-their-puppies-treats.jpg?s=612x612&w=0&k=20&c=XT4vzL1EBvqe5NxTRg-WdYHxBdHybPJL-HXrAKdH05g=', alt: 'Pet training', category: 'Training' },
    { id: 6, src: 'https://media.istockphoto.com/id/2201889186/photo/adopt-me.jpg?s=612x612&w=0&k=20&c=Kz2Lg5FYn-zYG4Nw_jponw2zgPne5RPhyupirldpqyw=', alt: 'Pet boarding', category: 'Boarding' }
  ];

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Loving Care",
      description: "Every pet receives personalized attention and care from our experienced team who genuinely love animals."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety First",
      description: "State-of-the-art facilities with 24/7 monitoring ensure your pet's safety and security at all times."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Hours",
      description: "Extended hours and emergency services available to accommodate your busy schedule and urgent needs."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Expert Team",
      description: "Licensed veterinarians and certified pet care specialists with years of experience in animal care."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Lead Veterinarian",
      image: 'https://media.istockphoto.com/id/598550702/photo/mature-doctor-meeting-with-injured-solider-in-veterans-hospital.jpg?s=612x612&w=0&k=20&c=hngiFqbIvkj-Gr5jOiQ2oNeqd0jG1IndOsmX0OAYs9s=',
      description: "15+ years of veterinary experience specializing in small animal care and emergency medicine."
    },
    {
      name: "Mike Chen",
      role: "Pet Care Manager",
      image: 'https://media.istockphoto.com/id/1148939704/photo/young-person-with-dog-at-home-leisure.jpg?s=612x612&w=0&k=20&c=TTSFJsWkIiM1YLd8bQ_5kumZaHKw1N6kvmNZ3Qy0NlQ=',
      description: "Certified animal behaviorist with expertise in training and pet psychology."
    },
    {
      name: "Emily Rodriguez",
      role: "Grooming Specialist",
      image: 'https://media.istockphoto.com/id/1816401471/photo/take-care-of-your-heart-and-love-your-body.jpg?s=612x612&w=0&k=20&c=UKYs24l0ccV-RCZMalqm5PT-4doeklCucZU78cIVLtM=',
      description: "Professional groomer with 10 years of experience in breed-specific styling and care."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white">
            <div className="aos-animate">
              <PawPrint className="w-16 h-16 mx-auto mb-6 animate-bounce" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6">About PawCare</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Where every tail wags with joy and every purr speaks of comfort. 
                We're more than just pet care - we're your pet's second family.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-orange-50" fill="currentColor" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,0 C500,100 500,100 1000,0 L1000,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aos-animate">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="text-lg text-gray-600 space-y-4">
                <p>
                  Founded in 2010 by a group of passionate animal lovers, PawCare began as a small 
                  neighborhood pet sitting service. What started with caring for just five furry friends 
                  has grown into a comprehensive pet care facility serving thousands of happy pets and families.
                </p>
                <p>
                  Our journey has been driven by one simple belief: every pet deserves to be treated 
                  with the same love and attention we give our own beloved companions. This philosophy 
                  has shaped everything we do, from our daily care routines to our state-of-the-art facilities.
                </p>
                <p>
                  Today, we're proud to be the most trusted pet care provider in the community, 
                  offering everything from daycare and boarding to grooming and veterinary services. 
                  Our team of dedicated professionals continues to grow, but our core values remain unchanged.
                </p>
              </div>
            </div>
            <div className="aos-animate">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://media.istockphoto.com/id/1429681335/photo/confident-mid-adult-male-professor-explaining-mature-adult-students-in-the-classroom.jpg?s=612x612&w=0&k=20&c=FKJd4x094idxjylZWHx6Pr2NdA0k7MstyRQu_Vzhf9I=" alt="Our facility" className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" />
                <img src="https://media.istockphoto.com/id/1276788283/photo/young-woman-with-laughing-corgi-puppy-nature-background.jpg?s=612x612&w=0&k=20&c=nOiBnVA13BupVn0t7o5fCytV5ZROgNgSWkQas3IuHIw=" alt="Happy pets" className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mt-8" />
                <img src="https://media.istockphoto.com/id/1555515663/photo/happy-portrait-group-and-doctors-for-healthcare-service-leadership-and-teamwork-in-hospital.jpg?s=612x612&w=0&k=20&c=TLjQ_2QSgCkG2GdfggIe9mMHuz28eD_zgjuwI9gw5KM=" alt="Care team" className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 -mt-8" />
                <img src="https://media.istockphoto.com/id/956544268/photo/funny-dog-in-jumping-motion-catching-ring-toss-toy.jpg?s=612x612&w=0&k=20&c=-WvigOLLe7pOPxZJaDgMMNEkZ67cfQIcYTWQG-NPjkA=" alt="Pet play area" className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 aos-animate">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in creating a world where every pet lives their happiest, healthiest life possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 aos-animate">
                <div className="text-orange-500 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 aos-animate">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Passionate professionals dedicated to your pet's wellbeing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center aos-animate">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-400 to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-teal-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 aos-animate">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Happy Moments</h2>
            <p className="text-xl text-gray-600">
              A glimpse into the joy and care we provide every single day
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 aos-animate">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-orange-500 px-3 py-1 rounded-full text-sm font-medium">
                    {image.category}
                  </span>
                  <p className="mt-2 text-sm">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center aos-animate">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Join Our Family?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Give your beloved pet the care they deserve. Contact us today to schedule a tour 
            of our facilities and meet our amazing team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={(e)=>navigate("/appointments")} className="bg-gradient-to-r from-orange-400 to-amber-400 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-500 hover:to-amber-500 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Schedule a Visit
            </button>
            <button onClick={(e)=>navigate("/services")} className="border-2 border-orange-400 text-orange-400 px-8 py-3 rounded-full font-semibold hover:bg-orange-400 hover:text-white transition-all duration-300">
              Learn About Our Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;