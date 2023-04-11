const fs = require('fs');

class BookIndex {
  constructor() {
    this.index = {};
  }


  createIndex(files, excludeWords) {
    files.forEach(file => {
      const data = fs.readFileSync(file, 'utf8');
      const words = data.split(/\s+/);

      for (let i = 0; i < words.length; i++) {
        let word = words[i].replace(/[^\w\s]/gi, '').toLowerCase();

        if (excludeWords.includes(word)) {
          continue;
        }

        if (!this.index[word]) {
          this.index[word] = new Set();
        }

        this.index[word].add(file);
      }
    });

    for (let word in this.index) {
      this.index[word] = Array.from(this.index[word]).join(',');
    }

    const sortedIndex = Object.keys(this.index).sort();
    const output = [];

    for (let i = 0; i < sortedIndex.length; i++) {
      const word = sortedIndex[i];
      output.push(`${word} : ${this.index[word]}`);
    }

    fs.writeFileSync('index.txt', output.join('\n'));
  }
}

const index = new BookIndex();
const files = ['Page1.txt', 'Page2.txt', 'Page3.txt'];
const excludeWords = fs.readFileSync('exclude-words.txt', 'utf8').split(/\s+/);



index.createIndex(files, excludeWords);









