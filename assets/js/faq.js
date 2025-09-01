/**
 * FAQ Accordion Functionality
 * Handles FAQ accordion creation, interactions, and styling
 */

// FAQ Mock Data
const faqData = [
  {
    question: "What is the purpose of a visa?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
  },
  {
    question: "How long does it take to process a visa application?",
    answer: "Processing times vary depending on the type of visa and country. Generally, it can take anywhere from a few days to several weeks. We recommend applying well in advance of your travel dates."
  },
  {
    question: "What documents are required for a visa application?",
    answer: "Required documents typically include a valid passport, application form, passport photos, proof of travel arrangements, and financial documentation. Specific requirements vary by visa type and destination."
  },
  {
    question: "Is there an age limit for applying for a visa?",
    answer: "There is no general age limit for visa applications. However, minors may require additional documentation such as parental consent and birth certificates."
  },
  {
    question: "Can I apply for a visa if I have a criminal record?",
    answer: "Having a criminal record doesn't automatically disqualify you, but it may affect your application. Each case is reviewed individually, and you should disclose any criminal history as required."
  },
  {
    question: "How much does it cost to work with your agency?",
    answer: "Our fees vary depending on the type of visa and services required. We provide transparent pricing and will give you a detailed quote before beginning any work."
  },
  {
    question: "What happens if my visa application is denied?",
    answer: "If your application is denied, we can help you understand the reasons and explore options for appeal or reapplication. We'll work with you to address any issues and improve your chances of success."
  },
  {
    question: "How long does it take for you to complete a project?",
    answer: "Project completion times depend on the complexity and scope of work. Simple applications may be completed within days, while complex cases may take several weeks."
  },
  {
    question: "Do I need a visa if I'm just transiting through a country?",
    answer: "Transit visa requirements vary by country and your nationality. Some countries require transit visas even for short layovers, while others allow visa-free transit."
  },
  {
    question: "What happens if my visa application is denied?",
    answer: "If your application is denied, we can help you understand the reasons and explore options for appeal or reapplication. We'll work with you to address any issues and improve your chances of success."
  },
  {
    question: "How long does it take for you to complete a project?",
    answer: "Project completion times depend on the complexity and scope of work. Simple applications may be completed within days, while complex cases may take several weeks."
  },
  {
    question: "Do I need a visa if I'm just transiting through a country?",
    answer: "Transit visa requirements vary by country and your nationality. Some countries require transit visas even for short layovers, while others allow visa-free transit."
  },
  {
    question: "Do I need a visa if I'm just transiting through a country?",
    answer: "Transit visa requirements vary by country and your nationality. Some countries require transit visas even for short layovers, while others allow visa-free transit."
  }

];

/**
 * Creates and initializes the FAQ accordion
 */
function createFAQAccordion() {
  const firstContainer = document.getElementById('faq-accordion-first');
  const secondContainer = document.getElementById('faq-accordion-second');
  
  if (!firstContainer || !secondContainer) {
    console.warn('FAQ accordion containers not found');
    return;
  }
  
  faqData.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'bg-white rounded-lg border border-gray-200 overflow-hidden';
    
    faqItem.innerHTML = ` 
      <button class="faq-toggle font-mulish font-bold w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200" data-index="${index}" data-open="false">
        <span class="text-lg font-bold text-[#000000] pr-4">${item.question}</span>
        <div class="faq-icon-wrapper bg-[#ebf6fc] rounded-full p-2 flex items-center justify-center">
          <svg class="faq-icon w-4 h-4 text-primary transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </button>
      <div class="faq-content faq-gradient overflow-hidden transition-all duration-300 ease-in-out max-h-0">
        <div class="px-6 pb-4 pt-2">
          <p class="text-white text-sm leading-relaxed">${item.answer}</p>
        </div>
      </div>
    `;
    
    // First 6 items go to first container, remaining go to second container
    if (index < 6) {
      firstContainer.appendChild(faqItem);
    } else {
      secondContainer.appendChild(faqItem);
    }
  });

  // Add click event listeners
  addFAQEventListeners();
  
  // Open first accordion by default
  openFirstAccordionByDefault();
}

/**
 * Adds event listeners to FAQ accordion toggles
 */
function addFAQEventListeners() {
  // Clear any existing listeners by cloning and replacing nodes
  document.querySelectorAll('.faq-toggle').forEach((toggle) => {
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
  });
  
  // Now add fresh listeners to the new nodes
  document.querySelectorAll('.faq-toggle').forEach((toggle) => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const clickedIndex = parseInt(this.getAttribute('data-index'));
      const content = this.nextElementSibling;
      const icon = this.querySelector('.faq-icon');
      
      // Better way to check if currently open - use data attribute for reliable state tracking
      const isCurrentlyOpen = this.getAttribute('data-open') === 'true';

      // Close ALL accordions first
      document.querySelectorAll('.faq-toggle').forEach((otherToggle, otherIndex) => {
        const otherContent = otherToggle.nextElementSibling;
        const otherIcon = otherToggle.querySelector('.faq-icon');
        
        // Mark as closed
        otherToggle.setAttribute('data-open', 'false');
        
        // Close the content
        otherContent.style.maxHeight = '0px';
        
        // Reset icon rotation
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        
        // Reset toggle button styling
        otherToggle.classList.remove('faq-gradient');
        otherToggle.classList.add('bg-white');
        
        // Reset icon wrapper background
        const otherIconWrapper = otherToggle.querySelector('.faq-icon-wrapper');
        if (otherIconWrapper) {
          otherIconWrapper.classList.remove('bg-white');
          otherIconWrapper.classList.add('bg-[#ebf6fc]');
        }
        
        // Reset text color
        const otherQuestionSpan = otherToggle.querySelector('span');
        if (otherQuestionSpan) {
          otherQuestionSpan.classList.remove('text-white');
          otherQuestionSpan.classList.add('text-[#000000]');
        }
      });

      // Open the clicked accordion ONLY if it wasn't already open
      if (!isCurrentlyOpen) {
        // Mark as open
        this.setAttribute('data-open', 'true');
        
        // Use a small delay to ensure layout is settled before calculating scrollHeight
        setTimeout(() => {
          content.style.maxHeight = content.scrollHeight + 'px';
        }, 10);
        
        icon.style.transform = 'rotate(180deg)';
        this.classList.remove('bg-white');
        this.classList.add('faq-gradient');
        
        const iconWrapper = this.querySelector('.faq-icon-wrapper');
        if (iconWrapper) {
          iconWrapper.classList.remove('bg-[#ebf6fc]');
          iconWrapper.classList.add('bg-white');
        }
        
        const questionSpan = this.querySelector('span');
        if (questionSpan) {
          questionSpan.classList.remove('text-[#000000]');
          questionSpan.classList.add('text-white');
        }
      }
    });
  });
}



/**
 * Opens the first accordion item by default
 */
function openFirstAccordionByDefault() {
  setTimeout(() => {
    // Get all FAQ elements
    const allContents = document.querySelectorAll('.faq-content');

    const allToggles = document.querySelectorAll('.faq-toggle');
    const allIcons = document.querySelectorAll('.faq-icon');
    
    // Close ALL accordions first - be very explicit
    allContents.forEach((content, index) => {
      content.style.maxHeight = '0px';
      
      if (allIcons[index]) {
        allIcons[index].style.transform = 'rotate(0deg)';
      }
      
      if (allToggles[index]) {
        const toggle = allToggles[index];
        toggle.setAttribute('data-open', 'false');
        toggle.classList.remove('faq-gradient');
        toggle.classList.add('bg-white');
        
        // Reset icon wrapper background
        const iconWrapper = toggle.querySelector('.faq-icon-wrapper');
        if (iconWrapper) {
          iconWrapper.classList.remove('bg-white');
          iconWrapper.classList.add('bg-[#ebf6fc]');
        }
        
        // Reset text color
        const questionSpan = toggle.querySelector('span');
        if (questionSpan) {
          questionSpan.classList.remove('text-white');
          questionSpan.classList.add('text-[#000000]');
        }
      }
    });
    
    // Now open ONLY the first accordion (index 0)
    if (allContents[0] && allToggles[0] && allIcons[0]) {
      const firstContent = allContents[0];
      const firstToggle = allToggles[0];
      const firstIcon = allIcons[0];
      
      firstToggle.setAttribute('data-open', 'true');
      
      // Use a small delay to ensure layout is settled
      setTimeout(() => {
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
      }, 20);
      
      firstIcon.style.transform = 'rotate(180deg)';
      firstToggle.classList.remove('bg-white');
      firstToggle.classList.add('faq-gradient');
      
      // Set first icon wrapper background to white
      const firstIconWrapper = firstToggle.querySelector('.faq-icon-wrapper');
      if (firstIconWrapper) {
        firstIconWrapper.classList.remove('bg-[#ebf6fc]');
        firstIconWrapper.classList.add('bg-white');
      }
      
      // Set first question text to white
      const firstQuestionSpan = firstToggle.querySelector('span');
      if (firstQuestionSpan) {
        firstQuestionSpan.classList.remove('text-[#000000]');
        firstQuestionSpan.classList.add('text-white');
      }
    }
  }, 100);
}

// Prevent multiple initializations
let faqInitialized = false;

/**
 * Initialize FAQ accordion when DOM is loaded
 */
function initializeFAQ() {
  if (faqInitialized) return;
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!faqInitialized) {
        createFAQAccordion();
        faqInitialized = true;
      }
    });
  } else {
    createFAQAccordion();
    faqInitialized = true;
  }
}

// Auto-initialize when script loads
initializeFAQ();
