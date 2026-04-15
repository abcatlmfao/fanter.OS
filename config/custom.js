// Initialize the homepage
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('title').textContent = 'fanter beta';
  document.getElementById('subtitle').textContent = 'v0.25, some settings complete, more games added, bugfixes and more coming soon! :3';
  
  // Load your games
  loadGames();
  
  // Setup search functionality
  setupSearch();
});

async function loadGames() {
  // You can replace this with your actual games data
  const games = [
    { name: 'Game 1', url: 'game1' },
    { name: 'Game 2', url: 'game2' },
    // Add more games here
  ];
  
  const container = document.getElementById('gamesContainer');
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `<h3>${game.name}</h3>`;
    card.onclick = () => {
      window.location.href = `/play.html?gameurl=${game.url}`;
    };
    container.appendChild(card);
  });
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const gameCards = document.querySelectorAll('.game-card');
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    gameCards.forEach(card => {
      const gameName = card.textContent.toLowerCase();
      card.style.display = gameName.includes(query) ? 'block' : 'none';
    });
  });
}

// ===== LOADING SCREEN SYSTEM  ====
(function() {
  
  // Add loading class to body
  document.body.classList.add('loading');
  
  const loadingScreen = document.getElementById('loadingScreen');
  const progressBar = document.querySelector('.loading-progress-bar');
  const statusEl = document.getElementById('loadingStatus');
  const whiteFlash = document.getElementById('whiteFlash');
  const revealOverlay = document.getElementById('revealOverlay');
  const brokenWallContainer = document.getElementById('brokenWallContainer');
  
  // ===== MATRIX RAIN =====
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  let width, height, drops = [];
  const fontSize = 16;
  const chars = "01";
  
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const columns = Math.floor(width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops.push(Math.random() * -height);
    }
  }
  
  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);
      if (y > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  
  resizeCanvas();
  const matrixInterval = setInterval(drawMatrix, 50);
  window.addEventListener('resize', resizeCanvas);
  
  // ===== FALLING MATRIX CODE =====
  function createFallingCode() {
    const el = document.createElement('div');
    el.className = 'falling-matrix';
    const length = Math.floor(Math.random() * 20) + 10;
    let code = '';
    for (let i = 0; i < length; i++) {
      code += Math.random() > 0.5 ? '1' : '0';
    }
    el.textContent = code;
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (Math.random() * 10 + 10) + 'px';
    el.style.animationDuration = (Math.random() * 2 + 1) + 's';
    el.style.opacity = Math.random() * 0.5 + 0.3;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
  
  // ===== BROKEN WALL =====
  function createBrokenWall() {
    const wall = document.createElement('div');
    wall.className = 'broken-wall';
    wall.style.left = Math.random() * 100 + '%';
    wall.style.top = Math.random() * 100 + '%';
    wall.style.width = (Math.random() * 200 + 80) + 'px';
    wall.style.height = (Math.random() * 120 + 60) + 'px';
    if (Math.random() > 0.7) wall.classList.add('cracked');
    brokenWallContainer.appendChild(wall);
    setTimeout(() => wall.remove(), 800);
  }
  
  // ===== PROGRESS SIMULATION (SLOWER) =====
  let progress = 0;
  const messages = [
    "Initializing fanter.OS...",
    "Loading core modules...",
    "Bypassing firewalls...",
    "Decrypting database...",
    "Loading games library...",
    "Applying themes...",
    "Hacking mainframe...",
    "Optimizing performance...",
    "Loading user preferences...",
    "Almost there...",
    "Starting fanter.OS..."
  ];
  let msgIndex = 0;
  
  // Start random effects
  const effectsInterval = setInterval(() => {
    if (progress < 100) {
      if (Math.random() > 0.7) createBrokenWall();
      if (Math.random() > 0.8) createFallingCode();
    }
  }, 500);
  
  // SLOWER PROGRESS UPDATE - Change these values to control speed
  const progressInterval = setInterval(() => {
    progress += Math.random() * 3 + 1;  // Slower: 1-4% per update (was 2-10%)
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      clearInterval(effectsInterval);
      clearInterval(matrixInterval);
      progressBar.style.width = '100%';
      statusEl.textContent = "Complete! Starting fanter.OS...";
      
      // Wait for games to actually load AND render
      waitForGamesToLoadAndRender();
    } else {
      progressBar.style.width = progress + '%';
      const newIndex = Math.floor(progress / 9);  // More messages = slower perceived loading
      if (newIndex > msgIndex && newIndex < messages.length) {
        msgIndex = newIndex;
        statusEl.textContent = messages[msgIndex];
      }
    }
  }, 300);  // Update every 300ms (was 200ms)
  
  // ===== WAIT FOR GAMES TO ACTUALLY LOAD AND RENDER =====
  function waitForGamesToLoadAndRender() {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      // Check if games are in the DOM
      const gamesContainer = document.getElementById('gamesContainer');
      const hasGames = gamesContainer && gamesContainer.children.length > 0;
      
      if (hasGames) {
        clearInterval(checkInterval);
        // Extra delay to ensure everything is ready
        setTimeout(() => {
          startTransition();
        }, 500);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        startTransition(); // Force transition after timeout
      }
    }, 100);
  }
  
  // ===== TRANSITION EFFECT =====
  function startTransition() {
    // White flash
    whiteFlash.style.opacity = '1';
    
    setTimeout(() => {
      // Hide loading screen
      loadingScreen.style.opacity = '0';
      
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        
        // Show reveal overlay
        revealOverlay.style.transform = 'scaleX(1)';
        
        setTimeout(() => {
          // Remove white flash
          whiteFlash.style.opacity = '0';
          
          // Show content
          document.body.classList.remove('loading');
          
          // Animate games (with longer delay to ensure visibility)
          setTimeout(() => {
            animateGamesRandomly();
            animateUIElements();
          }, 100);
          
          setTimeout(() => {
            revealOverlay.style.transform = 'scaleX(0)';
            setTimeout(() => {
              if (revealOverlay.parentNode) revealOverlay.remove();
              if (whiteFlash.parentNode) whiteFlash.remove();
            }, 1200);
          }, 500);
          
        }, 300);
      }, 400);
    }, 300);
  }
  
  // ===== RANDOM GAME APPEARANCE =====
  function animateGamesRandomly() {
    const games = document.querySelectorAll('.game');
    const gameArray = Array.from(games);
    
    // First, make sure all games are visible but hidden
    gameArray.forEach(game => {
      game.style.opacity = '0';
      game.style.transform = 'scale(0)';
      game.style.display = 'inline-block'; // Ensure they're visible
    });
    
    // Shuffle array for random appearance
    for (let i = gameArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameArray[i], gameArray[j]] = [gameArray[j], gameArray[i]];
    }
    
    gameArray.forEach((game, index) => {
      setTimeout(() => {
        game.style.opacity = '1';
        game.style.transform = 'scale(1)';
        game.style.animation = 'gamePop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
          game.style.animation = '';
        }, 400);
      }, index * 50); // 50ms between each game (smooth appearance)
    });
  }
  
  // ===== SLIDE IN UI ELEMENTS =====
  function animateUIElements() {
    const elements = [
      { el: document.getElementById('searchInput'), dir: 'left', delay: 100 },
      { el: document.querySelector('.center .settings-btn'), dir: 'right', delay: 200 },
      { el: document.querySelector('.center h1'), dir: 'up', delay: 150 },
      { el: document.querySelector('.center p'), dir: 'up', delay: 250 },
      { el: document.querySelector('.fav-sidebar-btn'), dir: 'left', delay: 300 }
    ];
    
    elements.forEach(item => {
      if (!item.el) return;
      item.el.style.opacity = '0';
      if (item.dir === 'left') item.el.style.transform = 'translateX(-100px)';
      if (item.dir === 'right') item.el.style.transform = 'translateX(100px)';
      if (item.dir === 'up') item.el.style.transform = 'translateY(-30px)';
      item.el.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      
      setTimeout(() => {
        item.el.style.opacity = '1';
        item.el.style.transform = 'translateX(0) translateY(0)';
      }, item.delay);
    });
  }
  
  // Also ensure search bar and settings button are hidden initially
  const searchInput = document.getElementById('searchInput');
  const settingsBtn = document.querySelector('.center .settings-btn');
  if (searchInput) {
    searchInput.style.opacity = '0';
    searchInput.style.transform = 'translateX(-100px)';
  }
  if (settingsBtn) {
    settingsBtn.style.opacity = '0';
    settingsBtn.style.transform = 'translateX(100px)';
  }
  
  // Block clicks on loading screen
  loadingScreen.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  console.log('Loading screen active - waiting for games to render...');
})();
