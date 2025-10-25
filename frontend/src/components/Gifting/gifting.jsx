import React, { useState, useEffect } from 'react';
import giftbanner from '../../assets/gifting.jpeg';

const GiftingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What makes jewelry the perfect gift?",
      answer: "Jewelry is timeless, personal, and carries emotional value. Each piece becomes a cherished memory that lasts forever, making it the ideal gift for celebrating life's special moments."
    },
    {
      question: "Do you offer gift wrapping services?",
      answer: "Yes! Every piece comes in elegant packaging. We also offer premium gift boxes with personalized message cards at no additional cost."
    },
    {
      question: "Can I get the jewelry engraved?",
      answer: "Absolutely! We offer complimentary engraving on select pieces. You can add names, dates, or short messages to make your gift truly personal."
    },
    {
      question: "What if the recipient wants to exchange the gift?",
      answer: "We offer hassle-free exchanges within 30 days. Gift recipients can exchange for a different size, style, or design without any questions asked."
    }
  ];

  const giftOccasions = [
    {
      title: "Birthdays",
      description: "Celebrate another year with timeless elegance",
      icon: "🎂",
      color: "from-pink-100 to-rose-100"
    },
    {
      title: "Anniversaries",
      description: "Mark your journey with precious memories",
      icon: "💝",
      color: "from-red-100 to-pink-100"
    },
    {
      title: "Weddings",
      description: "Perfect tokens for the big day",
      icon: "💍",
      color: "from-purple-100 to-pink-100"
    },
    {
      title: "Festive Season",
      description: "Spread joy with sparkling gifts",
      icon: "✨",
      color: "from-amber-100 to-yellow-100"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Banner with Overlay Text */}
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <img 
          src={giftbanner}
          alt="Gift Jewelry Hero"
          className="w-full h-full object-cover"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Hero Content */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block animate-bounce mb-4">
          </div>
          {/* <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-wide">
            Gift Your Loved Ones
          </h1> */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl font-medium">
            Express your love with timeless jewelry
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button className="px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl">
              EXPLORE GIFT COLLECTION
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium transform hover:scale-105">
              GIFT GUIDE
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-sm text-gray-500">Home / Gifting</p>
      </div>

      {/* Why Gift Jewelry Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-yellow-500 text-sm font-semibold tracking-wider">WHY JEWELRY?</span>
            </div>
            <h2 className="text-4xl font-normal text-gray-900">
              The Art of Meaningful Gifting
            </h2>
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>
                Jewelry is more than an accessory—it's a symbol of love, appreciation, and cherished memories. When you gift jewelry, you're giving something that will be treasured for a lifetime, passed down through generations, and remembered long after the moment has passed.
              </p>
              <p>
                Our carefully curated gifting collection features pieces perfect for every occasion and every loved one. From delicate earrings that catch the light to statement necklaces that turn heads, each piece is crafted with the same attention to detail and quality that defines our brand.
              </p>
              <p>
                Whether you're celebrating a milestone, expressing gratitude, or simply saying "I love you," our handcrafted jewelry pieces are designed to make every moment unforgettable.
              </p>
            </div>

            {/* Animated Benefits */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: "🎀", text: "Elegant Packaging" },
                { icon: "✍️", text: "Free Engraving" },
                { icon: "📦", text: "Gift Ready" },
                { icon: "🔄", text: "Easy Exchange" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-800">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Animated Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 animate-fade-in-up">
                <div className="relative overflow-hidden rounded-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=400&fit=crop"
                    alt="Gift Jewelry 1"
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="relative overflow-hidden rounded-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop"
                    alt="Gift Jewelry 2"
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="pt-8 animate-fade-in-up delay-200">
                <div className="relative overflow-hidden rounded-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=500&fit=crop"
                    alt="Gift Jewelry 3"
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>

      {/* Gift Occasions Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal text-gray-900 mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Celebrate life's beautiful moments with jewelry that tells a story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftOccasions.map((occasion, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${occasion.color} p-8 rounded-2xl transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-4 animate-bounce">{occasion.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{occasion.title}</h3>
                <p className="text-sm text-gray-700">{occasion.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Gift Collection */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-normal text-gray-900 mb-4">
            Curated Gift Sets
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thoughtfully paired pieces that make gifting effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Elegance Set",
              price: 450,
              image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
              items: "Necklace + Earrings"
            },
            {
              name: "Radiance Set",
              price: 550,
              image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
              items: "Ring + Bracelet + Earrings"
            },
            {
              name: "Sparkle Set",
              price: 380,
              image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
              items: "Pendant + Chain"
            }
          ].map((set, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={set.image}
                  alt={set.name}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Gift Set
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{set.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{set.items}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold text-gray-900">${set.price}</span>
                  <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personalization Section */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
                alt="Personalized Jewelry"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Free Service</p>
                    <p className="text-lg font-semibold text-gray-900">Engraving</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-normal text-gray-900 mb-6">
                Make It Personal
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                Add a personal touch to your gift with our complimentary engraving service. Inscribe names, dates, or meaningful messages that will make your gift truly one-of-a-kind.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Names & Initials", desc: "Personalize with loved ones' names" },
                  { title: "Special Dates", desc: "Remember important moments forever" },
                  { title: "Short Messages", desc: "Express your feelings in words" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow duration-300">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-normal text-gray-900 text-center mb-12">
          Stories from Happy Gifters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah M.",
              text: "The perfect anniversary gift! The packaging was beautiful and my wife absolutely loved it.",
              rating: 5
            },
            {
              name: "Rajesh K.",
              text: "Bought a set for my daughter's birthday. The quality is exceptional and she wears it every day!",
              rating: 5
            },
            {
              name: "Emma L.",
              text: "The engraving service made it so special. Highly recommend for any occasion!",
              rating: 5
            }
          ].map((review, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
              <p className="font-semibold text-gray-900">- {review.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-normal text-gray-900 mb-4">
                Gifting Questions?
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                Everything you need to know about choosing and giving the perfect jewelry gift. Our team is here to make your gifting experience seamless.
              </p>
              <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-yellow-500 transition-colors duration-300 font-medium flex items-center gap-2 group">
                Contact Gift Experts
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow duration-300">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <span className="text-gray-900 font-medium">{faq.question}</span>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none"
                      className={`text-yellow-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 animate-fade-in">
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&h=600&fit=crop"
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-normal text-white mb-4">
            Ready to Make Someone Smile?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Browse our complete gifting collection and find the perfect piece
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg">
              SHOP GIFT COLLECTION
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium transform hover:scale-105">
              NEED HELP CHOOSING?
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .animate-fade-in {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GiftingPage;