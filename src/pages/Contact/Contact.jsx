import React from "react";

const Contact = () => {
  return (
    <section className="bg-slate-500 py-24 lg:py-16">
      <div className="container mx-auto lg:px-0">
        <h3 className="h3 text-[45px] text-white text-center py-12">
          Contact Us
        </h3>
        <p className="text-center text-lg text-white mb-8">
          We're here to help! If you have any questions or need assistance, feel
          free to reach out to us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-4">Get in Touch</h4>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Message</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-accent text-white py-2 px-4 rounded hover:bg-opacity-80"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
            <p className="mb-2">
              <strong>Address:</strong> 123 Hotel St, City, Country
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p className="mb-2">
              <strong>Email:</strong> info@yourhotel.com
            </p>
            <p className="mb-2">
              <strong>Website:</strong> www.yourhotel.com
            </p>
            <p className="mt-4 text-gray-600">
              Follow us on social media for updates!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
