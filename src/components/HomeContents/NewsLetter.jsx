import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

const NewsLetter = () => {
  return (
    <div className="bg-base-100">
        <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
        {/* Designer Profile */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img 
              src="/images/designer.jpg" 
              alt="Designer" 
              className="w-full h-full object-cover border-2 border-primary rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-secondary font-medium">Mr.onsequat</span>
              <span className="text-neutral">- designer</span>
            </div>
            <p className="text-neutral max-w-md">
              best designer in the world
            </p>
          </div>
        </div>

        {/* Newsletter and Social Links */}
        <div className="w-full md:w-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Sign up for newsletter</h3>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your mail.." 
                className="px-4 py-2 border rounded-lg flex-grow focus:outline-none focus:border-primary"
              />
              <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <span className="text-secondary font-medium">Follow us :</span>
              <div className="flex gap-4">
                <a href="#" className="text-neutral hover:text-primary transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-neutral hover:text-primary transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-neutral hover:text-primary transition-colors">
                  <Youtube size={24} />
                </a>
                <a href="#" className="text-neutral hover:text-primary transition-colors">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NewsLetter;
