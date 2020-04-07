class Crowller {
  private secret = "secretKey";
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

  constructor() {}

  get getUrl() {
    return this.url
  }
}

const crowller = new Crowller();
console.log(crowller.getUrl)
