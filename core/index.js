import Positions from './../lib/positions/index.js'
import Mapping from './../lib/mapping/index.js';
import Detectors from './../lib/detectors/index.js';
import fileSystem from "./../lib/fileSystem/index.js"

const config_file = './config/config.json'

class Core {
  constructor(io) {
    this.io = io

    this.init()
  }

  async init() {
    // Init config
    await this.getConfig()

    // Initialize
    this.detectors = new Detectors({io: this.io, config: this.config})
    this.positions = new Positions({io: this.io, config: this.config, detectors: this.detectors})
    this.map = new Mapping({io: this.io, config: this.config, detectors: this.detectors})

    this.startLoop()

    this.io.on("connection", (socket) => {
      console.log("New client connected");
    });
  }

  async getConfig() {
    this.config = JSON.parse(await fileSystem.readFile(config_file))
  }

  // Update function of the loop
  update(progress) {
    // Defined function
    var timestamp = new Date().getTime();
    
    //console.log(progress)

  }

  // Loop function
  loop(timestamp = new Date().getTime()) {
    var progress = (timestamp - this.lastRender);

    this.update(progress);
    
    this.lastRender = timestamp;
    
    setTimeout(() => {
      if (this.loopFlag) this.loop();
    }, 100)
  }

  // Start the loop
  startLoop() { this.loopFlag = true; this.loop(); }

  // Stop the loop
  stopLoop() {  this.loopFlag = false }
}

export default Core