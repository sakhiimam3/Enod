// GSAP sequence for hero cards
(function(){
  if (typeof gsap === 'undefined') return;

  function animateCounters(targetEl, targetValue, duration){
    var obj = { val: 0 };
    gsap.to(obj, {
      val: Number(targetValue),
      duration: duration || 2.2,  // Increased from 1.4 to be slower
      ease: 'power2.out',
      onUpdate: function(){
        targetEl.textContent = Math.floor(obj.val).toLocaleString();
      }
    });
  }

  function animateBars(svg){
    if (!svg) return;
    var bars = svg.querySelectorAll('rect');
    var heights = [24, 40, 18, 46, 34, 50, 28, 38, 24, 40, 18];
    
    // Keep original bar positions but animate nicely
    bars.forEach(function(bar, i){
      var h = heights[i] || 24;
      var originalX = 20 + (i * 16); // Better spacing: start at 20, then 16px apart
      var barWidth = 8; // Slightly wider bars
      
      // Set bar position with better spacing
      bar.setAttribute('x', originalX);
      bar.setAttribute('width', barWidth);
      
      // Animate from bottom up with wave effect
      gsap.fromTo(bar, 
        { y: 60, height: 0, opacity: 0 }, 
        { 
          y: 60 - h, 
          height: h, 
          opacity: 1,
          duration: 0.8, 
          delay: i * 0.1, 
          ease: 'back.out(1.7)'  // Bouncy effect
        }
      );
    });
  }

  function animateProgress(progressEl, percentTextEl, percent){
    gsap.fromTo(progressEl, { width: '0%' }, { width: percent + '%', duration: 1.8, ease: 'power2.out' });  // Slower progress bar
    animateCounters(percentTextEl, percent, 1.8);
  }

  function animateWave(path){
    if (!path) return;
    var length = path.getTotalLength();
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    
    // Simple wave animation without excessive effects
    gsap.to(path, { 
      strokeDashoffset: 0, 
      duration: 1.5, 
      ease: 'power2.out'
    });
  }
  
  function animateWave2(path){
    if (!path) return;
    var length = path.getTotalLength();
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    
    // Simple secondary wave with slight delay
    gsap.to(path, { 
      strokeDashoffset: 0, 
      duration: 1, 
      ease: 'power2.out', 
      delay: 0.1
    });
  }

  function typewriterAnimation(element) {
    if (!element) return gsap.timeline();
    
    var fullText = 'OENOD – Next-Generation Business Software';
    var tl = gsap.timeline();
    
    // Clear the text initially - no cursor
    tl.set(element, { 
      textContent: ''
    });
    
    // Type each character - no cursor visible during typing
    var chars = fullText.split('');
    chars.forEach(function(char) {
      tl.to({}, {
        duration: 0.12,  // Same typing speed
        onComplete: function() {
          element.textContent += char;
        }
      });
    });
    
    // No cursor effects - just finish typing
    
    return tl;
  }

  function quadCircleOpen(container){
    if (!container) return;
    var q1 = container.querySelector('.q1');
    var q2 = container.querySelector('.q2');
    var q3 = container.querySelector('.q3');
    var q4 = container.querySelector('.q4');
    
    // Reset to initial state - all tags start from center with scale 0
    gsap.set([q1, q2, q3, q4], { scale: 0, opacity: 0, y: 0 });
    
    var tl = gsap.timeline();
    
    // Helper to compute Y so the row sits at the top of hero cards
    function computeRowTopY(){
      var quadRect = document.getElementById('quadReveal').getBoundingClientRect();
      var cardsRect = document.getElementById('heroCards')?.getBoundingClientRect();
      if (!cardsRect) return -120; // fallback
      var quadCenterY = quadRect.top + (quadRect.height / 2);
      var isSmall = (window.matchMedia && window.matchMedia('(max-width: 640px)').matches);
      var margin = isSmall ? 8 : 16; // tighter on small screens
      var desiredY = (cardsRect.top - quadCenterY) - margin;
      return desiredY;
    }

    // Initial entrance - scale up from center
    tl.to([q1, q2, q3, q4], {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: 0.1
    })
    // Move up while performing a subtle horizontal wiggle
    .addLabel('ascend')
    .to([q1, q2, q3, q4], {
      y: computeRowTopY,
      duration: 0.34,
      ease: 'power2.inOut'
    }, 'ascend')
    .to([q1, q2, q3, q4], {
      x: "+=15",
      duration: 0.15,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 1
    }, 'ascend');
    return tl;
  }

  // After full width animation, bring the row back down (reverse)
  function quadRowReverse(container){
    if (!container) return gsap.timeline();
    var q1 = container.querySelector('.q1');
    var q2 = container.querySelector('.q2');
    var q3 = container.querySelector('.q3');
    var q4 = container.querySelector('.q4');
    var tl = gsap.timeline();
    tl.to([q1, q2, q3, q4], {
      y: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      stagger: 0.04
    })
    .to([q1, q2, q3, q4], {
      x: "-=15",
      duration: 0.2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 1,
      stagger: 0.06
    }, '>-0.1');
    return tl;
  }

  document.addEventListener('DOMContentLoaded', function(){
    // safe set helper to avoid null errors
    function gsagSafeSet(target, props){ if (target) gsap.set(target, props); }
    var earningsValue = document.getElementById('earningsValue');
    var earningsBars = document.getElementById('earningsBars');
    var payrollValue  = document.getElementById('payrollValue');
    var goalUnits     = document.getElementById('goalUnits');
    var goalProgress  = document.getElementById('goalProgress');
    var goalPercentText = document.getElementById('goalPercentText');
    var monthlyValue  = document.getElementById('monthlyValue');
    var wavePath      = document.getElementById('wavePath');
    var wavePath2     = document.getElementById('wavePath2');
    var quad          = document.getElementById('quadReveal');
    var heroCards     = document.getElementById('heroCards');
    var heroTitle     = document.getElementById('heroTitle'); // Main hero title

    function resetCycle(){
      if (earningsValue) earningsValue.textContent = '0';
      if (payrollValue) payrollValue.textContent = '0';
      if (goalUnits) goalUnits.textContent = '0';
      if (goalPercentText) goalPercentText.textContent = '0';
      if (monthlyValue) monthlyValue.textContent = '0';
      if (goalProgress) goalProgress.style.width = '0%';
      if (earningsBars){
        var bars = earningsBars.querySelectorAll('rect');
        var defaultHeights = [24, 40, 18, 46, 34, 50, 28, 38, 24, 40, 18];
        bars.forEach(function(bar, i){ 
          var h = defaultHeights[i] || 24;
          bar.setAttribute('y', 60 - h); 
          bar.setAttribute('height', h); 
        });
      }
      if (wavePath){
        var length = wavePath.getTotalLength();
        wavePath.style.strokeDasharray = length + ' ' + length;
        wavePath.style.strokeDashoffset = length;
      }
      if (wavePath2){
        var length2 = wavePath2.getTotalLength();
        wavePath2.style.strokeDasharray = length2 + ' ' + length2;
        wavePath2.style.strokeDashoffset = length2;
      }
      if (quad){
        gsagSafeSet(quad, { opacity: 1, rotate: 0 });
        // Reset tags to initial state for flex layout
        gsagSafeSet(quad.querySelector('.q1'), { scale: 0, opacity: 0, x: 0, y: 0 });
        gsagSafeSet(quad.querySelector('.q2'), { scale: 0, opacity: 0, x: 0, y: 0 });
        gsagSafeSet(quad.querySelector('.q3'), { scale: 0, opacity: 0, x: 0, y: 0 });
        gsagSafeSet(quad.querySelector('.q4'), { scale: 0, opacity: 0, x: 0, y: 0 });
      }
      // hide cards to re-intro niely and reset z-index
      gsap.set(['#cardEarnings','#cardPayroll','#cardGoal','#cardMonthly'], { 
        opacity: 0, 
        scale: 0.98, 
        zIndex: 1 
      });
      // reset grid to original (let CSS classes control default two columns)
      if (heroCards) heroCards.style.gridTemplateColumns = '';
      // reset hero title - noy cursor styling needed
      if (heroTitle) {
        heroTitle.style.borderRight = 'none';
        heroTitle.textContent = ''; // Clear text for next cycle
      }
    }

    // Function to animate cards to full width ribbon style
    function animateCardsToFullWidth() {
      if (!heroCards) return gsap.timeline();
      var tl = gsap.timeline();
      
      // Animate to full width grid y(single column) - slower transition
      tl.to(heroCards, {
        duration: 1.4,  // Increased from 0.8
        ease: 'power2.inOut',
        onUpdate: function() {
          heroCards.style.gridTemplateColumns = '1fr';
        }
      })
      // Add subtle wave effect across all cards during width change - slower waves
      .to(['#cardEarnings', '#cardPayroll', '#cardGoal', '#cardMonthly'], {
        scale: 1.02,
        duration: 0.6,  // Increased from 0.4
        ease: 'power1.inOut',
        stagger: 0.08   // Increased stagger for more noticeable wave
      }, '-=1.0')
      .to(['#cardEarnings', '#cardPayroll', '#cardGoal', '#cardMonthly'], {
        scale: 1.0,
        duration: 0.6,  // Increased from 0.4
        ease: 'power1.inOut',
        stagger: 0.08
      }, '-=0.3');
      
      return tl;
    }

    // Function to scale up cards one by one with subtle effects
    function scaleUpCardsSequentially() {
      var tl = gsap.timeline();
      var cardData = [
        { selector: '#cardEarnings', counter: earningsValue, bars: earningsBars, target: earningsValue?.dataset.target || 0 },
        { selector: '#cardPayroll', counter: payrollValue, target: payrollValue?.dataset.target || 0 },
        { selector: '#cardGoal', counter: goalUnits, progress: goalProgress, progressText: goalPercentText, target: goalUnits?.dataset.target || 0 },
        { selector: '#cardMonthly', counter: monthlyValue, target: monthlyValue?.dataset.target || 0, wave1: wavePath, wave2: wavePath2 }
      ];

      cardData.forEach(function(card, index) {
        // Slower card scale up
        tl.to(card.selector, {
          scale: 1.05,
          zIndex: 10 + index,
          duration: 0.5,  // Increased from 0.3
          ease: 'power2.out'
        }, index * 0.35)  // Increased from 0.2 for more spacing
        .add(function() {
          // Animate counters and content for current card
          if (card.counter) {
            animateCounters(card.counter, card.target, 1.4);  // Slower counters
          }
          if (card.bars) {
            animateBars(card.bars);
          }
          if (card.progress && card.progressText) {
            animateProgress(card.progress, card.progressText, 65);
          }
          if (card.wave1) {
            animateWave(card.wave1);
            animateWave2(card.wave2);
          }
        }, index * 0.35 + 0.15)  // Adjusted timing
        .to(card.selector, {
          scale: 1.0,
          zIndex: 1,
          duration: 0.6,  // Increased from 0.4
          ease: 'power2.inOut'
        }, index * 0.35 + 0.9);  // Adjusted timing
      });

      return tl;
    }

    // Build repeating master timeline with longer pauses
    var master = gsap.timeline({ repeat: -1, repeatDelay: 1 });  // Increased delay between cycles

    master.add(function(){ resetCycle(); });
    // Start both typewriter and row animation at the same time with slight delay
    master.add(typewriterAnimation(heroTitle), '+=0.05');
    master.add(quadCircleOpen(quad), '<');
    // After row reaches top, start cards immediately - show full width in one increment
    var cardSelectors = ['#cardEarnings', '#cardPayroll', '#cardGoal', '#cardMonthly'];
    master.from(cardSelectors, { 
      scale: 1.0, 
      opacity: 0, 
      duration: 0.4,
      ease: 'power2.out', 
      stagger: 0.08
    }, '>')
      // Animate cards to full width ribbon style immediately without delay
      .add(animateCardsToFullWidth(), '<')
      .add(scaleUpCardsSequentially(), '<')
      // Bring the row back (reverse) and then fade it out to avoid overlap
      .add(quadRowReverse(quad), '+=0.05')
      .to(['#quadReveal .q1','#quadReveal .q2','#quadReveal .q3','#quadReveal .q4'], {
        opacity: 0,
        duration: 0.2,
        ease: 'power1.out'
      }, '>-0.05');
     
  });
})();


