import { useEffect, useState } from "react";
import { X } from "lucide-react";

const DisclaimerModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Always show the modal on every page load
    console.log('DisclaimerModal: Showing modal');
    setIsVisible(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    // Restore scrolling
    document.body.style.overflow = 'unset';
  };

  const handleDecline = () => {
    // Close the browser tab
    window.close();
    // Fallback if window.close() doesn't work (modern browsers block it)
    window.location.href = 'about:blank';
  };

  const handleClose = () => {
    // Treat close as decline
    handleDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Disclaimer</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close disclaimer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              The rules of the Bar Council of India prohibit law firms from advertising and soliciting work through communication in the public domain. This website is meant solely for the purpose of information and not for the purpose of advertising. KPJ Advocates does not intend to solicit clients through this website. We do not take responsibility for decisions taken by the reader based solely on the information provided in the website.
            </p>
            
            <p>
              By clicking on 'ACCEPT', the visitor acknowledges that the information provided in the website (a) does not amount to advertising or solicitation and (b) is meant only for his/her understanding about our activities and who we are.
            </p>
            
            <p>
              By continuing to use this site you consent to the use of cookies on your device as described in our Cookie Policy.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-t border-gray-200">
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded border border-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
