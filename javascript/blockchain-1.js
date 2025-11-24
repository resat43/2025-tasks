// Bu dosyada bir blockchain yapısı oluşturacağız.
// Boşlukları doldurun ve kodu çalışır hale getirin

const crypto = require("crypto");

// 1. Block sınıfını tanımla
class Block {
  // Obje yaratılırken çalışan fonksiyon
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index; // Blok numarası
    this.timestamp = timestamp; // Blok oluşturulma zamanı
    this.data = data; // Blok verileri
    this.previousHash = previousHash; // Önceki bloğun hash'i
    this.hash = this.calculateHash(); // Blok hash'i
  }

  // calculateHash() metodunu tamamlayın.
  // crypto modülünü ve SHA256 kullanarak hash oluşturun.
  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
        this.timestamp +
        JSON.stringify(this.data) +
        this.previousHash
      )
      .digest("hex");
  }
}

// 2. Blockchain sınıfını tanımla
class Blockchain {
  constructor() {
    // Blok zincirini başlatırken ilk blok oluşturulur
    this.chain = [this.createGenesisBlock()];
  }

  // İlk blok (Genesis Block)
  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  // Son bloğu döndür
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // 3. Yeni blok ekleme fonksiyonu
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();

    this.chain.push(newBlock);
    console.log(`Blok ${newBlock.index} eklendi!`);
  }

  // Zinciri doğrulama fonksiyonu
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Hash doğru mu?
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // previousHash doğru mu?
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}


// Blockchain'i test edelim
let myChain = new Blockchain();

// İki yeni blok ekleyin. Örn:
myChain.addBlock(
  new Block(1, Date.now(), { amount: 10, from: "Ali", to: "Veli" })
);
myChain.addBlock(
  new Block(2, Date.now(), { amount: 20, from: "Ayşe", to: "Mehmet" })
);

// Zinciri ekrana yazdır
console.log("\nBlockchain:", JSON.stringify(myChain, null, 2));

// Zinciri kontrol et
console.log("\nChain geçerli mi?", myChain.isChainValid());


