function generatePlaygroundGrid() {
    this.setBlockWidth();
    console.log('generating playground blocks');
    const playground = document.getElementById('playground');
    const root = document.querySelector('html');
    root.style.setProperty('--columns', init.columns);
    root.style.setProperty('--rows', init.rows);
    root.style.setProperty('--block-width', init.blockSize + 'px');
    const numberOfBlocks = init.rows * init.columns;
    for (let i = 0; i < numberOfBlocks; i++) {
      let div = document.createElement('div');
      div.className = 'playgroundBlock';
      init.devMode ? (div.innerHTML = i) : null;
      playground.appendChild(div);
    }
    for (let i = 0; i < init.columns; i++) {
      let div = document.createElement('div');
      div.className = 'playgroundBottom taken';
      playground.appendChild(div);
    }
    this.blocks = Array.from(document.querySelectorAll('.grid div'));
    console.log(`${numberOfBlocks} blocks have been generated`);
  }