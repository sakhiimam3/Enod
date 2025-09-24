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
      duration: 1.6, 
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
    // Only tag buttons, no ring/core. Position row-wise around center with larger initial scale.
    gsap.set(q1, { scale: 1.2, opacity: 1, x: -40, y: 28 });
    gsap.set(q2, { scale: 1.2, opacity: 1, x:  40, y: 28 });
    gsap.set(q3, { scale: 1.2, opacity: 1, x: -40, y:  28 });
    gsap.set(q4, { scale: 1.2, opacity: 1, x:  40, y:  28 });
    var tl = gsap.timeline();
    // Show tags immediately (no intro animation), pause briefly before motion
    tl.to({}, { duration: 0.6 });

    // Create a single train path that all buttons will follow
    function createTrainPath() {
      var containerRect = document.getElementById('quadReveal').getBoundingClientRect();
      var heroCardsRect = document.getElementById('heroCards').getBoundingClientRect();
      
      // Single curved train track path that goes through all card positions
      return [
        { x: -60, y: -100 },    // Start point (top left)
        { x: -120, y: -60 },    // Curve left
        { x: -140, y: 0 },      // Mid left
        { x: -120, y: 60 },     // Bottom left curve
        { x: -60, y: 100 },     // Bottom center-left
        { x: 0, y: 120 },       // Bottom center
        { x: 60, y: 100 },      // Bottom center-right
        { x: 120, y: 60 },      // Bottom right curve
        { x: 140, y: 0 },       // Mid right
        { x: 120, y: -60 },     // Top right curve
        { x: 60, y: -100 },     // Top right
        { x: 0, y: -120 },      // Top center
        { x: -30, y: -110 },    // Loop back
        { x: 0, y: 80 }         // Final destination (center)
      ];
    }

    function moveTagToCard(tagEl, cardSelector, snakePosition){
      var card = document.querySelector(cardSelector);
      if (!card) { return gsap.timeline(); }
      
      var snakePath = createTrainPath();
      var t = gsap.timeline();
      
      // Slower total duration for the snake journey
      var totalDuration = 3.8;
      
      // Create spacing between buttons like a snake/train
      var spaceDelay = snakePosition * 0.35;
      
      // Track when tag reaches center for special effect
      var centerReached = false;
      
      // First phase: Move along snake path to center
      snakePath.forEach(function(point, index) {
        var segmentDuration = totalDuration / snakePath.length;
        var currentScale = 1.2 + (index * 0.02);
        var currentEase = 'power1.inOut';
        
        // Add smooth snake-like rotation following the path
        var rotation = Math.sin(index * 0.3) * 4;
        
        if (index === 0) {
          t.to(tagEl, { 
            x: point.x, 
            y: point.y, 
            scale: currentScale,
            rotation: rotation,
            duration: segmentDuration * 1.5,
            ease: 'power2.out',
            delay: spaceDelay
          });
        } else {
          t.to(tagEl, { 
            x: point.x, 
            y: point.y, 
            scale: currentScale,
            rotation: rotation,
            duration: segmentDuration * 1.1,
            ease: currentEase
          }, '-=0.08');
        }
      });
      
      // Second phase: ALL TAGS CONVERGE TO EXACT CENTER (0, 0)
      t.to(tagEl, {
        x: 0,  // Exact center X
        y: 0,  // Exact center Y
        scale: 1.8,  // Bigger scale at center
        rotation: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onStart: function() {
          // Create center convergence effect - only trigger once per tag
          if (!centerReached) {
            centerReached = true;
            
            // Pulsing effect at center
            gsap.to(tagEl, {
              scale: 2.2,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: 'power2.inOut'
            });
            
            // No box shadow effects - removed the glow
          }
        }
      });
      
      // Third phase: Move to individual card positions
      var cardRect = card.getBoundingClientRect();
      var containerRect = document.getElementById('quadReveal').getBoundingClientRect();
      var finalX = (cardRect.left + cardRect.width/4) - (containerRect.left + containerRect.width/2);
      var finalY = (cardRect.top + cardRect.height/4) - (containerRect.top + containerRect.height/2);
      
      t.to(tagEl, {
        x: finalX,
        y: finalY,
        scale: 1.6,
        rotation: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });
      
      // Final phase: Fade out
      t.to(tagEl, { opacity: 0, duration: 0.25, ease: 'power1.out' }, '-=0.1');
      
      return t;
    }

    // Move buttons like snake/train - with proper spacing between them
    tl.add(moveTagToCard(q1, '#cardEarnings', 0), ">")   // First button (head of snake)
      .add(moveTagToCard(q2, '#cardPayroll', 1), "<")    // Second button (follows with spacing)
      .add(moveTagToCard(q3, '#cardGoal', 2), "<")       // Third button (follows with spacing)
      .add(moveTagToCard(q4, '#cardMonthly', 3), "<");   // Fourth button (tail of snake)
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
        // Ensure tags appear row-wise above cards with larger initial scale
        gsagSafeSet(quad.querySelector('.q1'), { scale: 1.2, opacity: 1, x: -40, y: -28 });
        gsagSafeSet(quad.querySelector('.q2'), { scale: 1.2, opacity: 1, x:  40, y: -28 });
        gsagSafeSet(quad.querySelector('.q3'), { scale: 1.2, opacity: 1, x: -40, y:  28 });
        gsagSafeSet(quad.querySelector('.q4'), { scale: 1.2, opacity: 1, x:  40, y:  28 });
      }
      // hide cards to re-intro nicely and reset z-index
      gsap.set(['#cardEarnings','#cardPayroll','#cardGoal','#cardMonthly'], { 
        opacity: 0, 
        scale: 0.98, 
        zIndex: 1 
      });
      // reset grid to original (let CSS classes control default two columns)
      if (heroCards) heroCards.style.gridTemplateColumns = '';
      // reset hero title - no cursor styling needed
      if (heroTitle) {
        heroTitle.style.borderRight = 'none';
        heroTitle.textContent = ''; // Clear text for next cycle
      }
    }

    // Function to animate cards to full width ribbon style
    function animateCardsToFullWidth() {
      if (!heroCards) return gsap.timeline();
      var tl = gsap.timeline();
      
      // Animate to full width grid (single column) - slower transition
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
    var master = gsap.timeline({ repeat: -1, repeatDelay: 4.5 });  // Increased delay between cycles

    master.add(function(){ resetCycle(); });
    // Start both typewriter and card animations at the same time with slight delay
    master.add(typewriterAnimation(heroTitle), '+=0.2');  // Slightly more delay
    master.add(quadCircleOpen(quad), '<'); // Start at same time as typewriter
    // After tags land, reveal cards in a sweeping wave - slower reveal
    var cardSelectors = ['#cardEarnings', '#cardPayroll', '#cardGoal', '#cardMonthly'];
    master.from(cardSelectors, { 
      scale: 1.0, 
      opacity: 0, 
      duration: 0.5,   // Increased from 0.35 for slower card reveal
      ease: 'power2.out', 
      stagger: 0.12    // Increased stagger for more noticeable wave effect
    }, '+=0.1')
      // Animate cards to full width ribbon style and scale up simultaneously - with more spacing
      .add(animateCardsToFullWidth(), '<+=0.4')  // More delay
      .add(scaleUpCardsSequentially(), '<+=0.3'); // More delay between phases
     
  });
})();


