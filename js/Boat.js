class Boat {
    constructor(x, y, w, h) {
      var options = {
        isStatic: true,
        density: 1
      };
      this.body = Bodies.rectangle(x, y, w, h, options);
      this.p = w
      this.h = h
      this.image = loadImage("./assets/boat.png");
      World.add(world, this.body);
    }

    display() 
    {
      var pos = this.body.position;
      push();
      imageMode(CENTER);
      image(this.image, pos.x, pos.y, this.p, this.h);
      pop();
      pos.x = pos.x - 1
    }
  
  }
  
    