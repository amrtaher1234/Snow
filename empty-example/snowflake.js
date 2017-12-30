
function getRandomSize()
{
    let r = pow(random(0 , 1) , 2.5); 

    return constrain((r*32) , 2 , 32); 
//     while(true)
//     {
// // let r1 = random(1); 
// // let r2 = random(1); 

// // if (r2>r1)
// // return r1*36; 
//     }

}


class Snowflake{

    constructor(n , m , design)
    {
        let x= n || random(width); 
        this.img = design;
        let y = m  || random(-100 , -10); 
        this.pos = createVector(x, y); 
        this.vel = createVector(0,0); 
        this.acc = createVector(); 
        this.r = getRandomSize(); 
        this.angle = random(TWO_PI); 
        this.dir = (random(1) >0.5) ? 1 :-1; 
        this.xOff=0; 


    }
    render()
    {
        // stroke(255); 
        // strokeWeight(this.r); 
        // point(this.pos.x,this.pos.y); 
        push(); 
        translate(this.pos.x +this.xOff , this.pos.y); 
        rotate(this.angle); 
        imageMode(CENTER); 
        image(this.img , 0 ,0,  this.r , this.r); 
        pop(); 
    }
    applyForce(force)
    {

        // parallax effect hack 
        let f = force.copy(); 
        f.mult(this.r); 
        this.acc.add(f); 
    }

    randomize()
    {
        let x= random(width); 
        let y = random(-100 , -10); 
        this.pos = createVector(x,y); 
        this.vel = createVector(0,0); 
        this.acc = createVector(); 
        this.r = getRandomSize(); 
    }
    update()
    {
        this.xOff = sin(this.angle)*this.r; 
        this.vel.limit(this.r *0.1); 
        this.vel.add(this.acc); 

      if (this.vel.mag() <1)
      {
          this.vel.normalize(); 
      }

        this.pos.add(this.vel); 
        this.acc.mult(0); 

        if (this.pos.y> height+this.r)
        {
            this.randomize(); 
        }

        //wrapper boy!
        if (this.pos.x <-this.r)
        {
            this.pos.x = width+this.r ; 
        }
        if (this.pos.x >width+ this.r )
        {
            this.pos.x = -this.r; 
        }
        this.angle+=this.dir*this.vel.mag() /200; 
        
    }
    offScreen()
    {
        return this.pos.y > height+this.r;
    }
}