export default class PhysicsManager{

    constructor(scene){

        this.scene=scene;

    }

    keepInside(token,cx,cy,radius){

        const dx=token.x-cx;
        const dy=token.y-cy;

        const d=Math.sqrt(dx*dx+dy*dy);

        if(d>radius){

            const nx=dx/d;
            const ny=dy/d;

            token.setPosition(

                cx+nx*radius,

                cy+ny*radius

            );

            token.setVelocity(

                -token.body.velocity.x,

                -token.body.velocity.y

            );

        }

    }

}