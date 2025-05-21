
import React, {useState , useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactPlayer from 'react-player';

const HomePage = () => {
    const navigate = useNavigate();
     const [isPlaying, setIsPlaying] = useState(false);
  const videoUrl = 'https://www.youtube.com/watch?v=aNVuUqUcrL0';
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
        });
    }, []);

    return (
        <>
        <div className="home">
            <div
                className="relative h-[100vh] bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://media.istockphoto.com/id/172974164/photo/cat-and-dog-buddies-with-orange-background.jpg?s=612x612&w=0&k=20&c=k95AzlFdaP7L8Oy9zkGK3QGWA1DrGctObqjh6cLY7UQ=')",
                }}
            >
                {/* Overlay to darken the background */}
                <div className="absolute inset-0 bg-black opacity-30"></div>

                {/* Content Section */}
                <div className="relative z-10 flex items-center justify-center w-full h-full text-center text-white px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        {/* Title */}
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate__animated animate__fadeIn animate__delay-1s">
                            Welcome to PetCare
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg md:text-xl mb-6 animate__animated animate__fadeIn animate__delay-2s">
                            Your pet's best care starts here. Join our loving community of pet lovers and take your furry friend to the next level.
                        </p>

                        {/* Shiny Text Effect */}
                        <span className="shiny-text text-lg sm:text-2xl md:text-3xl font-bold">
                            Caring for pets, one paw at a time.
                        </span>

                        {/* Get Started Button */}
                        <div className="mt-8">
                            <button
                                className="text-black text-base sm:text-lg md:text-xl bg-white hover:from-green-500 hover:to-blue-600 px-4 sm:px-6 py-2 sm:py-3 w-auto rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
                                onClick={() => navigate("/products")}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
                </div>
              {/* How It Works Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">How It Works</h2>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center mb-8 md:mb-0" data-aos="fade-right" data-aos-delay="100">
                            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">1</div>
                            <h3 className="text-xl font-bold mb-2">Book a Service</h3>
                            <p className="text-gray-600 text-center max-w-xs">Choose the service that fits your pet's needs and book an appointment.</p>
                        </div>
                        
                        {/* Arrow for desktop */}
                        <div className="hidden md:block">
                            <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        
                        {/* Step 2 */}
                        <div className="flex flex-col items-center mb-8 md:mb-0" data-aos="fade-up" data-aos-delay="200">
                            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">2</div>
                            <h3 className="text-xl font-bold mb-2">Meet Your Caregiver</h3>
                            <p className="text-gray-600 text-center max-w-xs">We'll match you with an experienced pet care professional who fits your needs.</p>
                        </div>
                        
                        {/* Arrow for desktop */}
                        <div className="hidden md:block">
                            <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        
                        {/* Step 3 */}
                        <div className="flex flex-col items-center" data-aos="fade-left" data-aos-delay="300">
                            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">3</div>
                            <h3 className="text-xl font-bold mb-2">Enjoy Peace of Mind</h3>
                            <p className="text-gray-600 text-center max-w-xs">Relax knowing your pet is receiving the best care possible.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
           <section className="py-16 bg-orange-50 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
            <h2 className="text-4xl text-orange-400 font-bold mb-4">See Our Pet Care in Action</h2>
            <p className="text-orange-300 mb-6">
              Watch how we provide exceptional care for pets just like yours. Our team of professionals is dedicated to ensuring your furry friends receive the love and attention they deserve.
            </p>
            <button onClick={(e)=>navigate("/appointments")} className="z-2 px-6 py-3 bg-green-400 text-white rounded-full hover:bg-green-200 transition duration-300">
              Schedule a Consultation
            </button>
          </div>

          <div className="w-full md:w-1/2" data-aos="fade-left">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
              {isPlaying ? (
                <ReactPlayer
                  url={videoUrl}
                  playing
                  controls
                  width="100%"
                  height="100%"
                  className="rounded-lg"
                />
              ) : (
                <div
                  className="w-full h-64 bg-[url('/pic/petvideo.png')] bg-cover flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                   
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl text-orange-500 font-bold text-center mb-12" data-aos="fade-up">Frequently Asked Questions</h2>
                    
                    <div className="max-w-3xl mx-auto">
                        {/* FAQ Item 1 */}
                        <div className="mb-6 bg-orange-50 rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                            <div className="p-6">
                                <h3 className="text-xl text-black font-bold mb-2">What services do you offer?</h3>
                                <p className="text-gray-600">We offer a wide range of pet care services including in-home pet sitting, dog walking, grooming, training, and specialized care for pets with special needs.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 2 */}
                        <div className="mb-6 bg-orange-50 rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                            <div className="p-6">
                                <h3 className="text-xl text-black font-bold mb-2">Are your pet care professionals certified?</h3>
                                <p className="text-gray-600">Yes, all our pet care professionals are certified, insured, and have undergone extensive training. Many have specialized certifications in pet first aid and specific animal behaviors.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 3 */}
                        <div className="mb-6 bg-orange-50 rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="300">
                            <div className="p-6">
                                <h3 className="text-xl text-black font-bold mb-2">How do I schedule a service?</h3>
                                <p className="text-gray-600">You can schedule a service through our website by clicking the "Get Started" button, or by calling our customer service line. We'll match you with the right professional for your pet's needs.</p>
                            </div>
                        </div>
                        
                        {/* FAQ Item 4 */}
                        <div className="mb-6 bg-orange-50 rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="400">
                            <div className="p-6">
                                <h3 className="text-xl text-black font-bold mb-2">Do you offer emergency services?</h3>
                                <p className="text-gray-600">Yes, we have emergency pet care services available 24/7. Our team is prepared to help with unexpected situations and provide immediate care when needed.</p>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </section>

            {/* Services Section */}
            {/* <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">Our Pet Care Services</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/400/200')" }}></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">In-Home Pet Care</h3>
                                <p className="text-gray-600">We provide professional pet care services in the comfort of your own home, ensuring your pet feels safe and secure.</p>
                                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">Learn More</button>
                            </div>
                        </div>
                        
                       
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/400/200')" }}></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Grooming Services</h3>
                                <p className="text-gray-600">Professional grooming for all breeds. Our expert groomers will have your pet looking and feeling their absolute best.</p>
                                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">Book Now</button>
                            </div>
                        </div>
                        
                       
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="300">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/400/200')" }}></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">Pet Training</h3>
                                <p className="text-gray-600">Behavioral training for pets of all ages. Our certified trainers use positive reinforcement techniques.</p>
                                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">Schedule Training</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="400">
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">View All Testimonials</button>
                    </div>
                </div>
            </section> */}

            {/* Call to Action Section */}
            <section className="py-16 bg-orange-50  text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl text-orange-400 font-bold mb-6" data-aos="fade-up">Ready to Give Your Pet the Best Care?</h2>
                    <p className="text-xl mb-8 text-orange-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Join thousands of happy pet parents who trust PetCare with their furry family members.</p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-up" data-aos-delay="200">
                        <button className="px-8 py-3 text-orange-400 bg-white text-gray-600  font-bold rounded-full hover:bg-gray-200 transition duration-300">Get Started Today</button>
                        <button onClick={(e)=>{navigate("/appointments")}} className="px-8 py-3 bg-orange-100 text-green-400 border-2 border-orange-400  font-bold rounded-full hover:bg-orange-100 transition duration-300">Contact Us</button>
                    </div>
                </div>
            </section>

        

            {/* Blog Preview Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl text-orange-500 font-bold text-center mb-12" data-aos="fade-up">Latest Pet Care Tips</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Blog Post 1 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/885571364/photo/young-french-bulldog-on-the-visit-to-the-vet.jpg?s=612x612&w=0&k=20&c=VqeEbRjrDxb6mCBaIJfWooSDQAjkPS8aNTBJ8HQyZeA=')" }}></div>
                            <div className="p-6">
                                <div className="text-blue-500 text-sm font-semibold mb-2">Health & Wellness</div>
                                <h3 className="text-xl font-bold mb-2">5 Essential Tips for Summer Pet Care</h3>
                                <p className="text-gray-600 mb-4">Learn how to keep your pets cool, hydrated, and safe during the hot summer months.</p>
                                
                            </div>
                        </div>
                        
                        {/* Blog Post 2 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1142921672/photo/embarassed-dog-on-bed.jpg?s=612x612&w=0&k=20&c=panjW8t_RklqMHuHg6OmamHU5ilkiHiLcJ4PE2B3Bc8=')" }}></div>
                            <div className="p-6">
                                <div className="text-blue-500 text-sm font-semibold mb-2">Training</div>
                                <h3 className="text-xl font-bold mb-2">How to Train Your Dog to Walk Off-Leash</h3>
                                <p className="text-gray-600 mb-4">Step-by-step guide to safely training your dog for off-leash walking in appropriate areas.</p>
                               
                            </div>
                        </div>
                        
                        {/* Blog Post 3 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="300">
                            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1280869072/photo/two-dogs-eating-together-from-their-food-bowls.jpg?s=612x612&w=0&k=20&c=ppJOb-rpAnbMSw2oeOwUxG8C5bwLKBpWymc3G3aj9GU=')" }}></div>
                            <div className="p-6">
                                <div className="text-blue-500 text-sm font-semibold mb-2">Nutrition</div>
                                <h3 className="text-xl font-bold mb-2">The Complete Guide to Cat Nutrition</h3>
                                <p className="text-gray-600 mb-4">Understanding your cat's nutritional needs at different life stages for optimal health.</p>
                               
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </section>
      

         

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl  text-orange-500 font-bold text-center mb-12" data-aos="fade-up">What Pet Parents Say</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                                <div>
                                    <h4 className="font-bold">Sarah Thompson</h4>
                                    <p className="text-gray-500 text-sm">Dog Owner</p>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "PetCare has been a lifesaver for me and my two dogs. Their in-home care service gives me peace of mind when I'm away on business trips."
                            </p>
                            <div className="flex text-yellow-400 mt-3">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            </div>
                        </div>
                        
                        {/* Testimonial 2 */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                                <div>
                                    <h4 className="font-bold">Mike Johnson</h4>
                                    <p className="text-gray-500 text-sm">Cat Owner</p>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "My cat is extremely particular, but she took to her PetCare groomer immediately. The transformation was amazing and she seemed happier afterward!"
                            </p>
                            <div className="flex text-yellow-400 mt-3">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            </div>
                        </div>
                        
                        {/* Testimonial 3 */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="300">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                                <div>
                                    <h4 className="font-bold">Emily Davis</h4>
                                    <p className="text-gray-500 text-sm">Pet Owner</p>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "I love the convenience of PetCare's app. I can book services, track my pet's care, and communicate with my caregiver all in one place."
                            </p>
                            <div className="flex text-yellow-400 mt-3">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                {/* Newsletter Section */}
            {/* <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">Stay Updated with Pet Care Tips</h2>
                        <p className="text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">Subscribe to our newsletter and receive weekly tips, guides, and exclusive offers for your pet.</p>
                        
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4" data-aos="fade-up" data-aos-delay="200">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                                Subscribe Now
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm mt-4" data-aos="fade-up" data-aos-delay="300">By subscribing, you agree to our privacy policy and consent to receive updates from PetCare.</p>
                    </div>
                </div>
            </section> */}

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {/* Stat 1 */}
                        <div data-aos="fade-up" data-aos-delay="100">
                            <div className="text-4xl font-bold text-orange-500 mb-2">5000+</div>
                            <div className="text-orange-600">Happy Pets</div>
                        </div>
                        
                        {/* Stat 2 */}
                        <div data-aos="fade-up" data-aos-delay="200">
                            <div className="text-4xl font-bold text-orange-500 mb-2">200+</div>
                            <div className="text-orange-600">Pet Care Experts</div>
                        </div>
                        
                        {/* Stat 3 */}
                        <div data-aos="fade-up" data-aos-delay="300">
                            <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
                            <div className="text-orange-600">Cities Covered</div>
                        </div>
                        
                        {/* Stat 4 */}
                        <div data-aos="fade-up" data-aos-delay="400">
                            <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
                            <div className="text-orange-600">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </section>
           
   </div>
  </>
    )
};

export default HomePage;
