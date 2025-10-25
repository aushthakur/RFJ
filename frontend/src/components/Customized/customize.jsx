import React, { useState } from 'react';
import Hero from '../../assets/img/image.png';
const CustomJewelryPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How long does it take to create a customized piece?",
      answer: "Our artisans typically take 2-4 weeks to craft your bespoke jewelry piece, depending on the complexity of the design. Rush orders can be accommodated for an additional fee."
    },
    {
      question: "Can I provide my own design or gemstones?",
      answer: "Absolutely! We welcome your creative input. You can bring your own design sketches, inspiration images, or even family gemstones that you'd like incorporated into a new piece."
    },
    {
      question: "What materials do you work with for custom pieces?",
      answer: "We specialize in 925 sterling silver, brass with 18-karat gold plating (3-5 microns), and we can source various precious and semi-precious gemstones according to your preferences and budget."
    },
    {
      question: "Is there a minimum order value for customization?",
      answer: "Custom jewelry orders start at $300. This ensures we can dedicate the time and craftsmanship needed to create a piece that truly reflects your vision and meets our quality standards."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner - Single Image */}
      <div className="relative w-full h-screen">
        <img 
          src={Hero}
          alt="Custom Jewelry Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-sm text-gray-500">Home / Customized</p>
      </div>

      {/* About Customization Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div>
            <h2 className="text-3xl font-normal text-gray-900 mb-6">
              We Make it from our heart for your loved ones
            </h2>
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>
                Every piece of jewelry tells a story, and we believe yours should be uniquely personal. Our custom jewelry service allows you to transform your vision into a stunning reality, crafted with the same dedication and precision that defines all our collections.
              </p>
              <p>
                Whether you're creating an engagement ring that captures your love story, designing a family heirloom to pass down through generations, or simply want something that's unmistakably you, our master artisans work closely with you throughout the entire process. From initial concept to final polish, we ensure every detail reflects your personal style and sentiment.
              </p>
              <p>
                Using premium 925 sterling silver, brass with luxurious 18-karat gold plating, and handpicked natural gemstones, we bring your dreams to life with exceptional craftsmanship and attention to detail.
              </p>
            </div>
            <button className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center gap-2">
              Get Your Customized Jewel Today
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Right - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=400&fit=crop"
                alt="Custom Earrings"
                className="w-full h-64 object-cover rounded-2xl"
              />
              <img 
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop"
                alt="Custom Jewelry Detail"
                className="w-full h-48 object-cover rounded-2xl"
              />
            </div>
            <div className="pt-8">
              <img 
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=500&fit=crop"
                alt="Custom Necklace"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Image */}
      <div className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-red-400 rounded-full opacity-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
                alt="Artisan Craftsmanship"
                className="w-full h-96 object-cover rounded-2xl relative z-10"
              />
              <div className="absolute -bottom-4 -right-4 bg-white px-6 py-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Custom Pieces</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content with Stats */}
            <div>
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                Our customization process combines traditional handcrafting techniques with modern design sensibilities. Each piece is meticulously created by skilled artisans who have honed their craft over decades, ensuring that your jewelry is not just beautiful, but also durable and timeless. We take pride in our attention to detail, from the precision of the settings to the brilliance of each gemstone.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-4xl font-semibold text-gray-900 mb-2">99%</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Customer satisfaction rate with our custom jewelry creations. We work until you're completely delighted.
                  </p>
                </div>
                <div>
                  <h3 className="text-4xl font-semibold text-gray-900 mb-2">100%</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Ethically sourced materials and sustainable practices in every piece we create for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Process Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-normal text-gray-900 text-center mb-4">
          Your Journey to Bespoke Jewelry
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          From initial consultation to final delivery, we guide you through every step of creating your perfect piece
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Consultation",
              description: "Share your vision, inspirations, and preferences with our design experts",
              icon: "💬"
            },
            {
              step: "02",
              title: "Design & Sketch",
              description: "Our artisans create detailed sketches and 3D renderings for your approval",
              icon: "✏️"
            },
            {
              step: "03",
              title: "Crafting",
              description: "Master craftsmen bring your design to life with precision and care",
              icon: "🔨"
            },
            {
              step: "04",
              title: "Delivery",
              description: "Receive your one-of-a-kind piece in elegant packaging",
              icon: "🎁"
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                {item.icon}
              </div>
              <div className="text-sm font-semibold text-amber-500 mb-2">STEP {item.step}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-normal text-gray-900 text-center mb-12">
            Recent Custom Creations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=500&fit=crop",
              "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=500&fit=crop"
            ].map((img, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <img 
                  src={img}
                  alt={`Custom Jewelry ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">Custom Design #{index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - FAQ Title and Description */}
          <div>
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              Have questions about our customization service? Find answers to the most common inquiries below. If you need more information, our team is always here to help.
            </p>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center gap-2">
              Ask A Question
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Right - FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-gray-900 font-medium">{faq.question}</span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                    className={`text-gray-600 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-normal text-gray-900 mb-4">
            Customized Jewellery for Your Custom needs!
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. Start your custom jewelry journey today.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 font-medium">
              EXPLORE DESIGNS
            </button>
            <button className="px-8 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-medium">
              TALK TO US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomJewelryPage;